var MarsMonkeRescue = artifacts.require("./MarsMonkeRescue.sol");

contract('MarsMonkeRescue', function(accounts) {
	it("should be 25000 available Monke", function() {
		MarsMonkeRescue.deployed().then(function(instance) {
			instance.totalSupply().then(function (availableMonke) {
				assert.equal(availableMonke.valueOf(), 25000, "25000 Monke not available");
			});
		});
	});
});

/*
  it("should begin search", function() {
  	MarsMonkeRescue.deployed().then(function(instance) {
  		Mars = instance;
  		Mars.beginSearch({from: accounts[0]});
  		assert.equal(Mars.searchSeed, 0x0, "searchSeed not set")
  	})
  })
});
*/