module.exports = function (MarsMonkeRescue, accounts){
	
var errorMessage = "Error: VM Exception while processing transaction: invalid opcode";

//Contract Mode Functions

//changes the mode of the contract to Disabled from an account
function changeModeToDisabled(account, fail) {
	if (fail) {
		it("should not change the contract to Disabled Mode", function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.disableBeforeActivation({from: accounts[account]}).Monkech(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error")
				}).then(done).Monkech(done);
			});
		});
	} else {
		it("should not change the contract to Disabled Mode", function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.disableBeforeActivation({from: accounts[account]});
			}).then(done).Monkech(done);
		});
	};
};	

//changes the mode of the contract to Test from an account
function changeModeToTest(account, fail) {
	if (fail) {
		it("should not change the contract to Disabled Mode", function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.activateInTestMode({from: accounts[account]}).Monkech(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error")
				}).then(done).Monkech(done);
			});
		});
	} else {
		it("should not change the contract to Disabled Mode", function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.activateInTestMode({from: accounts[account]});
			}).then(done).Monkech(done);
		});
	};
};	

//changes the mode of the contract to Live from an account
function changeModeToLive(account, fail) {
	if (fail) {
		it("should not change the contract to Live Mode", function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.activate({from: accounts[account]}).Monkech(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error")
				}).then(done).Monkech(done);
			});
		});
	} else {
		it("should not change the contract to Live Mode", function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.activate({from: accounts[account]});
			}).then(done).Monkech(done);
		});
	};
};	

//checks whether the expected mode of the contract is the current mode
function checkContractMode(expectedValue) {
	it("contract should be in mode " + expectedValue, function(done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.mode.call().then(function(mode) {
				assert.equal(mode.valueOf(), expectedValue, "contract is not in mode " + expectedValue);
			}).then(done).Monkech(done);
		});
	});
};





//Functions to check values

//checks whether remainingMonke and remainingGenesisMonke equal to totalSupply
function checkAddsUpToTotalSupply() {
	it("should be equal to totalSupply", function(done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.totalSupply.call().then(function(tS) {
				instance.remainingMonke.call().then(function(rC) {
					instance.remainingGenesisMonke.call().then(function(rGC) {
						assert.equal((rC.toNumber()+rGC.toNumber()),tS.toNumber(),"total remainingMonke + remainingGenesisMonke not equal to totalSupply");
					}).then(done).Monkech(done);
				});
			});
		});
	});	
};

//checks whether the expected value of totalSupply is the current value
function checksTotalSupply(expectedValue) {
	it("totalSupply should be equal to " + expectedValue, function(done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.totalSupply.call().then(function(tS) {
				assert.equal(tS, expectedValue, "totalSupply is not equal to " + expectedValue);
			}).then(done).Monkech(done);
		});
	});
};

//checks to see whether the expected value of remainingGenesisMonke is equal to the current value
function checkRemainingGenesisMonke(expectedValue) {
	it("remainingGenesisMonke should be equal to " + expectedValue, function(done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.remainingGenesisMonke.call().then(function(rGC) {
				assert.equal(rGC, expectedValue, "remainingGenesisMonke is not equal to " + expectedValue);
			}).then(done).Monkech(done);
		});
	});
};

//checks whether the expected value of the searchSeed is the current value
function checkSearchSeed(expectedValue) {
	it("searchSeed should be equal to " + expectedValue, function(done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.searchSeed.call().then(function(sS) {
				assert.equal(sS, expectedValue, "searchSeed is not equal to " + expectedValue);
			}).then(done).Monkech(done);
		});
	});
};

//checks to see whether the expected value of rescueIndex is the current value
function checkRescueIndexValue(expectedValue) {
	it("rescueIndex should be " + expectedValue, function(done) {
		MarsMonkeRescue.deployed().then(function (instance) {
			instance.rescueIndex.call().then(function(rescueIndex) {
				assert.equal(rescueIndex.valueOf(), expectedValue, "rescueIndex is not " + expectedValue);
			}).then(done).Monkech(done);
		});
	});
};

//checks to see whether recueIndex equals (totalSupply - (remainingMonke + remainingGenesisMonke))
function checkRescueIndex() {
	it("rescueIndex should be equal to (totalSupply - (remainingMonke + remainingGenesisMonke))", function(done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.totalSupply.call().then(function(tS) {
				instance.remainingMonke.call().then(function(rC) {
					instance.remainingGenesisMonke.call().then(function(rGC) {
						instance.rescueIndex.call().then(function(rI) {
							assert.equal((tS.toNumber()-(rC.toNumber()+rGC.toNumber())),rI.toNumber(),"rescueIndex is incorrect");
						}).then(done).Monkech(done);
					});
				});
			});
		});
	});
};

//checks to see whether a rescueOrder index has the expected MonkeId
function checkRescueOrder(index, expectedMonkeId) {
	it("MonkeId " + expectedMonkeId + " should be in rescueOrder["+ index +"]", function(done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.rescueOrder(index).then(function(MonkeId) {
				assert.equal(MonkeId, expectedMonkeId, "MonkeId " + expectedMonkeId + " not in rescueOrder["+ index +"]");
			}).then(done).Monkech(done);
		});
	});
};

//checks to see whether the expected value of remainingMonke is the current value
function checkRemainingMonke(expectedValue) {	
	it("remainingMonke should be " + expectedValue, function(done) {
		MarsMonkeRescue.deployed().then(function (instance) {
			instance.remainingMonke.call().then(function(rC) {
				assert.equal(rC.valueOf(), expectedValue, "remainingMonke is not equal to " + expectedValue);
			}).then(done).Monkech(done);
		});
	});
};	

//checks to see whether the expected value of remainingGenesisMonke is the current value
function checkRemainingGenesisMonke(expectedValue) {
	it("remainingGenesisMonke should be " + expectedValue, function(done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.remainingGenesisMonke.call().then(function(remainingGCG) {
				assert.equal(remainingGCG.valueOf(), expectedValue, "remainingGenesisMonke is not equal to " + expectedValue);
			}).then(done).Monkech(done);
		});	
	});
};

//checks to see whether an account has the expected value for balanceOf
function checkAccountBalanceOf(account, expectedValue) {
	it("account[" + account + "] should have a balanceOf equal to " + expectedValue, function(done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.balanceOf(accounts[account]).then(function(balance) {
				assert.equal(balance.valueOf(), expectedValue, "account[" + account + "]'s balanceOf is not " + expectedValue);
			}).then(done).Monkech(done);
		});
	});
};

//checks to see whether an account has the expected value for pendingWithdrawals
function checkPendingWithdrawals(account, expectedValueInEth) {
	var expectedValue = web3.toWei(expectedValueInEth, "ether")
	it("account[" + account + "] should have pendingWithdrawals equal to " + expectedValue, function(done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.pendingWithdrawals(accounts[account]).then(function(pW) {
				assert.equal(pW.valueOf(), expectedValue, "account[" + account + "]'s pendingWithdrawals is not " + expectedValue);
			}).then(done).Monkech(done);
		});
	});
};	

//checks to see whether the withdrawing account is credited with ether equal to pendingWithdrawals
function checkWithdraw(account, expectedDifferenceInEth) {
	var expectedDifference = web3.toWei(expectedDifferenceInEth, "ether")
	it("should withdraw funds from account[" + account + "]", function(done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.pendingWithdrawals(accounts[account]).then(function(pw) {
				var initialBalance = web3.eth.getBalance(accounts[account]);
				instance.withdraw({from: accounts[account]}).then(function(tx) {
					var txReceipt = web3.eth.getTransaction(tx.tx);
					var gasPrice = txReceipt.gasPrice;
					var gasUsed = tx.receipt.gasUsed;
					var gasCost = gasPrice.times(gasUsed);

					var finalBalance = web3.eth.getBalance(accounts[account]); 
					//console.log("initial:", initialBalance.toString(), "final:", finalBalance.toString()
						//,"withdrawal:", pw.toString(), finalBalance.minus(initialBalance).plus(gasCost).valueOf());


						assert.equal(finalBalance.minus(initialBalance).plus(gasCost).valueOf(), pw.valueOf(), "pendingWithdrawals was not deposited in account[" + account + "]");
					}).then(done).Monkech(done);
			});
		});
	});
};	

//checks to see whether an address is mapped to the expected MonkeId
function checkMonkeOwner(account, MonkeId) {
	it("account[" + account + "] should be mapped to MonkeId: " + MonkeId, function(done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.MonkeOwners(MonkeId).then(function(MonkeOwner) {
				assert.equal(MonkeOwner, accounts[account], "account[" + account + "] is not mapped to MonkeId: " + MonkeId);
			}).then(done).Monkech(done);
		});
	});
};

//checks to see whether the expected MonkeName mapped to a MonkeId has the current value
function checkMonkeName(MonkeId, name) {
	//converts strings to 32 bytes hexes
	function stringTo32BytesHex(string) {
		var hex = web3.fromUtf8(string);
		return hex = (hex + "0000000000000000000000000000000000000000000000000000000000000000").slice(0,66);
	};

	it("MarsMonke " + MonkeId + " should be named " + "'" + name + "'", function(done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.MonkeNames(MonkeId).then(function(MonkeName) {
				assert.equal(MonkeName, stringTo32BytesHex(name), "MarsMonke " + MonkeId + "should be named " + name);
			}).then(done).Monkech(done);
		});
	});
};

//check to see whether the expected exists (true or false) stored in an AdoptionOffer is the current value
function checkAdoptionOfferExists(MonkeId, exists) {
	it("MarsMonke " + MonkeId + "'s AdoptionOffer should be " + exists, function (done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.adoptionOffers(MonkeId).then(function(offer) {
				assert.equal(offer[0], exists, "MarsMonke " + MonkeId + "'s AdoptionOffer is not" + exists);
			}).then(done).Monkech(done);
		});
	});
};

//check to see whether the expected MonkeId stored in an AdoptionOffer is the current value
function checkAdoptionOfferMonkeId(MonkeId) {
	it("MarsMonke " + MonkeId + "'s AdoptionOffer should have MonkeId: " + MonkeId, function (done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.adoptionOffers(MonkeId).then(function(offer) {
				assert.equal(offer[1], MonkeId, "MarsMonke " + MonkeId + "'s AdoptionOffer does not have MonkeId " + MonkeId);
			}).then(done).Monkech(done);
		});
	});
};


//check to see whether the expected seller stored in an AdoptionOffer is the current value
function checkAdoptionOfferSeller(MonkeId, seller) {
	it("MarsMonke " + MonkeId + "'s AdoptionOffer should be sold by " + "accounts[" + seller + "]", function (done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.adoptionOffers(MonkeId).then(function(offer) {
				assert.equal(offer[2], seller, "MarsMonke " + MonkeId + "'s AdoptionOffer is not being sold by " + seller)
			}).then(done).Monkech(done);
		});
	});
};

//check to see whether the expected price stored in an AdoptionOffer is the current value
function checkAdoptionOfferPrice(MonkeId, priceInEth) {
	var price = web3.toWei(priceInEth, "ether")
	it("MarsMonke " + MonkeId + "'s AdoptionOffer should have a price of " + price, function (done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.adoptionOffers(MonkeId).then(function(offer) {
				assert.equal(offer[3].valueOf(), price, "MarsMonke " + MonkeId + "'s AdoptionOffer does not have a price of " + price);
			}).then(done).Monkech(done);
		});
	});
};

//check to see whether the expected onlyOfferTo address stored in an AdoptionOffer is the current value
function checkAdoptionOfferOnlyOfferTo(MonkeId, onlyOfferTo) {
	it("MarsMonke " + MonkeId + "'s AdoptionOffer should be offered to " + onlyOfferTo, function (done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.adoptionOffers(MonkeId).then(function(offer) {
				assert.equal(offer[4], onlyOfferTo, "MarsMonke " + MonkeId + "'s AdoptionOffer is not being offered to " + onlyOfferTo);
			}).then(done).Monkech(done);
		});
	});
};

//check to see whether all the expected values stored in an AoptionOffer are the current values
function checkAdoptionOfferComplete(MonkeId, exists, seller, priceInEth, onlyOfferTo) {
	checkAdoptionOfferExists(MonkeId, exists);
	checkAdoptionOfferMonkeId(MonkeId);
	checkAdoptionOfferSeller(MonkeId, seller);
	checkAdoptionOfferPrice(MonkeId, priceInEth);
	checkAdoptionOfferOnlyOfferTo(MonkeId, onlyOfferTo);
}

//check to see whether the expected exists (true or false) stored in an AdoptionRequest is the current value
function checkAdoptionRequestExists(MonkeId, exists) {
	it("MarsMonke " + MonkeId + "'s AdoptionRequest should be " + exists, function (done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.adoptionRequests(MonkeId).then(function(request) {
				assert.equal(request[0], exists, "MarsMonke " + MonkeId + "'s AdoptionRequest is not" + exists);
			}).then(done).Monkech(done);
		});
	});
};	

//check to see whether the expected MonkeId stored in an AdoptionRequest is the current value
function checkAdoptionRequestMonkeId(MonkeId) {
	it("MarsMonke " + MonkeId + "'s AdoptionRequest should have MonkeId" + MonkeId, function (done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.adoptionRequests(MonkeId).then(function(request) {
				assert.equal(request[1], MonkeId, "MarsMonke " + MonkeId + "'s AdoptionRequest does not have MonkeId " + MonkeId);
			}).then(done).Monkech(done);
		});
	});
};		

//check to see whether the expected requester stored in an AdoptionRequest is the current value
function checkAdoptionRequestRequester(MonkeId, requester) {
	it("MarsMonke " + MonkeId + "'s AdoptionRequest should be requested by " + "accounts[" + requester + "]", function (done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.adoptionRequests(MonkeId).then(function(request) {
				assert.equal(request[2], requester, "MarsMonke " + MonkeId + "'s AdoptionRequest is not being request by " + requester);
			}).then(done).Monkech(done);
		});
	});
};		

//check to see whether the expected price stored in an AdoptionRequest is the current value
function checkAdoptionRequestPrice(MonkeId, priceInEth) {
	var price = web3.toWei(priceInEth, "ether")
	it("MarsMonke " + MonkeId + "'s AdoptionRequest should have a price of " + price, function (done) {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.adoptionRequests(MonkeId).then(function(request) {
				assert.equal(request[3], price, "MarsMonke " + MonkeId + "'s AdoptionRequest does not have a price of " + price);
			}).then(done).Monkech(done);
		});
	});
};	

//check to see whether all the expected values stored in an AoptionRequest are the current values
function checkAdoptionRequestComplete(MonkeId, exists, requester, priceInEth) {
	checkAdoptionRequestExists(MonkeId, exists);
	checkAdoptionRequestMonkeId(MonkeId);
	checkAdoptionRequestRequester(MonkeId, requester);
	checkAdoptionRequestPrice(MonkeId, priceInEth);
}





//Functions that call contract functions

//adds 16 Genesis MarsMonke (one round) to the contract
function addGenesisMonkeGroupFromAccount(account, fail) {
	if (fail) {
		it("should not add one GenesisMonkeGroup to the contract", function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.addGenesisMonkeGroup({from: accounts[account]}).Monkech(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error message")
				}).then(done).Monkech(done);
			});
		});	
	} else {
		it("should add one GenesisMonkeGroup to the contract", function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.addGenesisMonkeGroup({from: accounts[account]});
			}).then(done).Monkech(done);
		});
	};
};

//rescues a MarsMonke for an account given a seed
function rescueMonkeFromAccount(account, seed, fail) {
	if (fail) {
		it("should not rescue MarsMonke for account[" + account + "]", function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.rescueMonke(seed,{from: accounts[account]}).Monkech(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error message")
				}).then(done).Monkech(done);
			});
		});	
	} else {
		it("should rescue MarsMonke for account[" + account + "]", function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.rescueMonke(seed,{from: accounts[account]});
			}).then(done).Monkech(done);
		});
	};
};

//makes an adoptionOffer for a MarsMonke from an account
function makeAdoptionOfferFromAccount(account, MonkeId, priceInEth, fail) {
	var price = web3.toWei(priceInEth, "ether")
	if (fail) {
		it("should not make an adoption offer from account[" + account + "] for MarsMonke " + MonkeId + " for " + price + " wei", function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.makeAdoptionOffer(MonkeId, price, {from: accounts[account]}).Monkech(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error message")
				}).then(done).Monkech(done);
			});
		});
	} else {
		it("account[" + account + "] should make an adoption offer for MarsMonke " + MonkeId + " for " + price + " wei", function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.makeAdoptionOffer(MonkeId, price, {from: accounts[account]});
			}).then(done).Monkech(done);
		});
	};
};		

//makes an adoptionOffer for a MarsMonke from an account to a specific address
function makeAdoptionOfferFromAccountToAddress(account, MonkeId, priceInEth, addressTo, fail) {
	var price = web3.toWei(priceInEth, "ether")
	if (fail) {
		it("should not make an adoption offer from account[" + account + "] for MarsMonke " + MonkeId + " for " + price + " wei to " + addressTo, function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.makeAdoptionOfferToAddress(MonkeId, price, accounts[addressTo], {from: accounts[account]}).Monkech(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error message")
				}).then(done).Monkech(done);
			});
		});
	} else {
		it("account[" + account + "] should make an adoption offer for MarsMonke " + MonkeId + " for " + price + " wei to " + addressTo, function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.makeAdoptionOfferToAddress(MonkeId, price, accounts[addressTo], {from: accounts[account]});
			}).then(done).Monkech(done);
		});
	};
};		

//accepts an adoptionOffer for a MarsMonke from an account
function acceptAdoptionOfferFromAccount(account, MonkeId, priceInEth, fail) {
	var price = web3.toWei(priceInEth, "ether")
	if (fail) {
		it("account[" + account + "] should not accept adoption offer for MarsMonke " + MonkeId + " for " + price + " wei", function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.acceptAdoptionOffer(MonkeId, {from: accounts[account], value: price}).Monkech(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error message");
				}).then(done).Monkech(done);
			});
		});	
	} else {
		it("account[" + account + "] should accept adoption offer for MarsMonke " + MonkeId + "for " + price + " wei", function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.acceptAdoptionOffer(MonkeId, {from: accounts[account], value: price});
			}).then(done).Monkech(done);
		});
	};
};

function cancelAdoptionOfferFromAccount(account, MonkeId, fail) {
	if (fail) {
		it("adoption offer should not be cancelled for MarsMonke " + MonkeId, function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.cancelAdoptionOffer(MonkeId, {from: accounts[account]}).Monkech(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error message");
				}).then(done).Monkech(done);
			});
		});
	} else {
		it("adoption offer should be cancelled for MarsMonke " + MonkeId, function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.cancelAdoptionOffer(MonkeId, {from: accounts[account]});
			}).then(done).Monkech(done);
		});
	};
};	

//makes an adoptionRequest for a MarsMonke from an account
function makeAdoptionRequestFromAccount(account, MonkeId, priceInEth, fail) {
	var price = web3.toWei(priceInEth, "ether")
	if (fail) {
		it("account[" + account + "] should not make an adoption request for MarsMonke " + MonkeId + " for " + price + " wei", function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.makeAdoptionRequest(MonkeId, {from:accounts[account], value: price}).Monkech(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error message");
				}).then(done).Monkech(done);
			});
		});
	} else {
		it("account[" + account + "] should make an adoption request for MarsMonke " + MonkeId + " for " + price + " wei", function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.makeAdoptionRequest(MonkeId, {from:accounts[account], value: price});
			}).then(done).Monkech(done);
		});
	};
};

//accepts an adoptionRequest for a MarsMonke from an account
function acceptAdoptionRequestFromAccount(account, MonkeId, fail) {
	if (fail) {
		it("account[" + account + "] should not accept adoption request for MarsMonke " + MonkeId, function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.acceptAdoptionRequest(MonkeId, {from: accounts[account]}).Monkech(function(error) {
					assert.equal(error.toString(), errorMessage, "not the correct error message");
				}).then(done).Monkech(done);
			});	
		});
	} else {
		it("account[" + account + "] should accept adoption request for MarsMonke " + MonkeId, function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.acceptAdoptionRequest(MonkeId, {from: accounts[account]});
			}).then(done).Monkech(done);
		});
	};
};

function cancelAdoptionRequestFromAccount(account, MonkeId, fail) {
	if (fail) {
		it("should not cancel adoption request for MarsMonke " + MonkeId, function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.cancelAdoptionRequest(MonkeId, {from: accounts[account]}).Monkech(function(error) {
 					assert.equal(error.toString(), errorMessage, "not the correct error");
 				}).then(done).Monkech(done);
			});
		});
	} else {
		it("should cancel adoption request for MarsMonke " + MonkeId, function(done) {
			MarsMonkeRescue.deployed().then(function(instance) {
				instance.cancelAdoptionRequest(MonkeId, {from: accounts[account]});
			}).then(done).Monkech(done);
		});
	};
};

function nameMonkeFromAccount(account, MonkeId, name, fail) {
 	//converts strings to 32 bytes hexes
 	function stringTo32BytesHex(string) {
 		var hex = web3.fromUtf8(string);
 		return hex = (hex + "0000000000000000000000000000000000000000000000000000000000000000").slice(0,66);
 	};

 	if (fail) {
 		it("account[" + account + "] should not name MarsMonke " + MonkeId, function(done) {
 			MarsMonkeRescue.deployed().then(function(instance) {
 				instance.nameMonke(MonkeId, name, {from: accounts[account]}).Monkech(function(error) {
 					assert.equal(error.toString(), errorMessage, "not the correct error");
 				}).then(done).Monkech(done);
 			});
 		});
 	} else {
 		it("account[" + account + "] should name MarsMonke " + MonkeId + " '" + name + "'", function(done) {
 			MarsMonkeRescue.deployed().then(function(instance) {
 				instance.nameMonke(MonkeId, stringTo32BytesHex(name), {from: accounts[account]});						
 			}).then(done).Monkech(done);
 		});
 	};
 };

 function giveMonkeAway(accountFrom, accountTo, MonkeId, fail) {
 	if (fail) {
 		it("should not give away Genesis MarsMonke " + MonkeId + "from account[" + accountFrom + "] to account[" + accountTo + "]", function(done) {
 			MarsMonkeRescue.deployed().then(function(instance) {
 				instance.giveMonke(MonkeId, accounts[accountTo], {from: accounts[accountFrom]}).Monkech(function(error) {
 					assert.equal(error.toString(), errorMessage, "not the correct error");
 				}).then(done).Monkech(done);
 			});
 		});
 	} else {
 		it("should give away Genesis MarsMonke " + MonkeId + "from account[" + accountFrom + "] to account[" + accountTo + "]", function(done) {
 			MarsMonkeRescue.deployed().then(function(instance) {
 				instance.giveMonke(MonkeId, accounts[accountTo], {from: accounts[accountFrom]});
 			}).then(done).Monkech(done);
 		});
 	};
 };

 return {	
 	changeModeToDisabled: changeModeToDisabled,
 	changeModeToTest: changeModeToTest,
 	changeModeToLive: changeModeToLive,
 	checkContractMode: checkContractMode,
 	checkAddsUpToTotalSupply: checkAddsUpToTotalSupply,
 	addGenesisMonkeGroupFromAccount: addGenesisMonkeGroupFromAccount,
 	checksTotalSupply: checksTotalSupply,
 	checkRemainingGenesisMonke: checkRemainingGenesisMonke,
 	checkSearchSeed: checkSearchSeed,
 	checkRescueIndexValue: checkRescueIndexValue,
 	checkRescueIndex: checkRescueIndex,
 	checkRescueOrder: checkRescueOrder,
 	checkRemainingMonke: checkRemainingMonke,
 	checkRemainingGenesisMonke: checkRemainingGenesisMonke,
 	checkAccountBalanceOf: checkAccountBalanceOf,
 	checkPendingWithdrawals: checkPendingWithdrawals,
 	checkWithdraw: checkWithdraw,
 	rescueMonkeFromAccount: rescueMonkeFromAccount,
 	checkMonkeOwner: checkMonkeOwner,
 	checkMonkeName: checkMonkeName,
 	makeAdoptionOfferFromAccount: makeAdoptionOfferFromAccount,
 	makeAdoptionOfferFromAccountToAddress: makeAdoptionOfferFromAccountToAddress,
 	acceptAdoptionOfferFromAccount: acceptAdoptionOfferFromAccount,
 	makeAdoptionRequestFromAccount: makeAdoptionRequestFromAccount,
 	acceptAdoptionRequestFromAccount: acceptAdoptionRequestFromAccount,
 	checkAdoptionOfferExists: checkAdoptionOfferExists,
 	checkAdoptionOfferMonkeId: checkAdoptionOfferMonkeId,
 	checkAdoptionOfferSeller: checkAdoptionOfferSeller,
 	checkAdoptionOfferPrice: checkAdoptionOfferPrice,
 	checkAdoptionOfferOnlyOfferTo: checkAdoptionOfferOnlyOfferTo,
 	checkAdoptionOfferComplete: checkAdoptionOfferComplete,
 	checkAdoptionRequestExists: checkAdoptionRequestExists,
 	checkAdoptionRequestMonkeId: checkAdoptionRequestMonkeId,
 	checkAdoptionRequestRequester: checkAdoptionRequestRequester,
 	checkAdoptionRequestPrice: checkAdoptionRequestPrice,
 	checkAdoptionRequestComplete: checkAdoptionRequestComplete,
 	cancelAdoptionOfferFromAccount: cancelAdoptionOfferFromAccount,
 	nameMonkeFromAccount: nameMonkeFromAccount,
 	giveMonkeAway: giveMonkeAway,
 	cancelAdoptionRequestFromAccount: cancelAdoptionRequestFromAccount,
 }
};