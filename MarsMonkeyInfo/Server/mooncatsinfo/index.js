const fs = require('fs');
const async = require('async');
const zlib = require('zlib');
const Canvas = require('canvas');
const generateMarsMonke = require("marsmonkeparser");
const Web3 = require('web3');
const http = require('http');

// contract ABI
const ABI = require("./abi");

// image sizes
const fullSize = 10;
const thumbSize = 2;

const port = process.env.MARSMONKERESCUE_PORT || 3000;
const contractAddress = process.env.MARSMONKERESCUE_CONTRACT || "0x60cd862c9c687a9de49aecdc3a99b74a4fc54ab6";
const providerURL = process.env.MARSMONKERESCUE_RPC || "http://localhost:8545";
const refreshDelay = 30 * 1000;

if(!contractAddress) throw "Contract Address not found. Set MARSMONKERESCUE_CONTRACT to the address of the contract."

if(!providerURL) throw "Contract Address not found. Set MARSMONKERESCUE_RPC to the url of the rpc provider.";

var web3 = new Web3()
web3.setProvider(new Web3.providers.HttpProvider(providerURL), {timeout: 20000});

function loadMarsMonkeRescueContract(address){
    return new web3.eth.Contract(ABI, address);
}

const mcrContract = loadMarsMonkeRescueContract(contractAddress);

// Data Handling

var monkeData = {order: [],
	       monkes: {}};

var fetchCount = 0;
var remainingMonkes = "?";
var imageCache = {}
var cachedData = JSON.stringify(monkeData);
var compressedData;

function zipCache(){
    zlib.gzip(cachedData, function(err, result){
	if(err) return console.log(err);
	compressedData = result;
    })
}

zipCache();

function drawMonke(monkeId){
    if(imageCache[monkeId]){
	return imageCache[monkeId];
    }

    var data = generateMarsMonke(monkeId);
    var canvasFull = Canvas.createCanvas(fullSize * data.length, fullSize * data[0].length);
    var canvasThumb = Canvas.createCanvas(thumbSize * data.length, thumbSize * data[0].length);

    var ctxFull = canvasFull.getContext('2d');
    var ctxThumb = canvasThumb.getContext('2d');
    for (var i = 0; i < data.length; i++) {
	for (var j = 0; j < data[i].length; j++) {
	    var color = data[i][j];
	    if (color) {
		ctxFull.fillStyle = color;
		ctxThumb.fillStyle = color;
		ctxFull.fillRect(i * fullSize, j * fullSize, fullSize, fullSize);
		ctxThumb.fillRect(i * thumbSize, j * thumbSize, thumbSize, thumbSize);
	    }
	}
    }

    var result = {image: canvasFull.toBuffer(),
		  thumb: canvasThumb.toDataURL()};

    imageCache[monkeId] = result;

    return result;

}

function getMonkeImage(monkeId){
    if(imageCache[monkeId]){
	return imageCache[monkeId].image;
    }

}

function handleMonkeData(err, data){
    fetchCount++;
    if(err) {
	console.log(err);
    } else {
	monkeData = data;
	cachedData = JSON.stringify(monkeData);
	zipCache();
    }
    console.log("fetch #", fetchCount, err ? "failed." : "complete.", monkeData.length, "monkes loaded.");
    setTimeout(function(){
	loadMonkeData(handleMonkeData);
    }, refreshDelay);
}

function getName (hex){
    try {
	return web3.utils.hexToUtf8(hex).trim();
    } catch (e){
	return "?";
    }
}
function loadMonkeData (cb){
    var bar = {
	start: Date.now(),
	ticks: 0
    };
    bar.tick = function tickBar(){
	bar.ticks++;
	var seconds = Math.floor((Date.now() - bar.start) / 100) / 10;
	if(bar.ticks == 1){
	    process.stdout.write("fetching... [1] 0s");
	}else if(bar.ticks == 7){
	    console.log(`   [${bar.ticks}] ${seconds}s    done.`);
	}else{
	    process.stdout.write(`   [${bar.ticks}] ${seconds}s`)
	}
    }

    function tick(cb){
	return function(err, result){
	    bar.tick();
	    cb(err, result);
	}
    }

    bar.tick();

    async.parallel([
	function(cb){
	    mcrContract.methods.getMonkeIds().call(tick(cb));
	},
	function(cb){
	    mcrContract.methods.getMonkeNames().call(tick(cb));
	},
	function(cb){
	    mcrContract.methods.getMonkeOwners().call(tick(cb));
	},
	function(cb){
	    mcrContract.methods.getMonkeOfferPrices().call(tick(cb));
	},
	function(cb){
	    mcrContract.methods.getMonkeRequestPrices().call(tick(cb));
	}], function (err, results){
	    if(err) return cb(err);
	    var assembled = {};
	    for(var i = 0; i < results[0].length; i++){
		var offerPriceWei = results[3][i];
		var requestPriceWei = results[4][i];
		var offerPrice = parseFloat(web3.utils.fromWei(offerPriceWei, "ether"), 10);
		var requestPrice = parseFloat(web3.utils.fromWei(requestPriceWei, "ether"), 10);
		var monkeId = results[0][i];
		var monke = {number: i,
			   id: monkeId,
			   name: getName(results[1][i]),//web3.utils.hexToUtf8(results[1][i]),
			   owner: results[2][i],
			   offered: (offerPrice != 0), //!(offerPriceWei.eq(0)),
			   offerPrice: offerPrice,
			   requested: (requestPrice != 0),//!(requestPriceWei.eq(0)),
			   requestPrice: requestPrice,
			   thumb: drawMonke(monkeId).thumb
			  }
		assembled[monkeId] = monke;
	    }
	    var result = results[0].map(function(id){return assembled[id]});
	    bar.tick();
	    cb(null, result);
	})

}

function loadRemainingMonkeCount(){
    mcrContract.methods.remainingMonkes().call(function(err, result){
	if(result){
	    console.log("remaining monkes:", result.toString());
	    remainingMonkes = result.toString();
	}
	setTimeout(loadRemainingMonkeCount, refreshDelay);
    })
}


// Server

function requestHandler(request, response) {
    var path = request.url.split("/").filter((x)=>{return x})
    var monkeImage = getMonkeImage(path[0]);
    if(path[0] == "remaining"){ // respond with remainingMonkes
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Content-Type', 'applimonkeion/json');
	response.write("" + remainingMonkes, 'utf8')
	response.end()
    } else if(monkeImage){ // respond with fullsize monke image;
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Content-Type', 'image/png');;
	response.write(monkeImage, 'binary');
	response.end();
    }else{ // respond with compressed monke data
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Content-Type', 'applimonkeion/json');
	response.setHeader('Content-Encoding', 'gzip');
	response.write(compressedData, 'binary');

	response.end();
    }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
	return console.log('failed to start server', err)
    }
    console.log(`listening on port: ${port}`)
})


// Start

console.log("contract address:", contractAddress);
console.log("provider url:", providerURL);

setTimeout(function(){
    loadMonkeData(handleMonkeData);
    loadRemainingMonkeCount();
}, 1000)
