//check to see whether the Contracts Modes work with four different testing contracts

var MarsMonkeRescue = artifacts.require("./MarsMonkeRescue.sol");

/* List of MarsMonke seeds and corresponding MonkeIds for Test Mode

"0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237":"0x00738ea43a"
"0xd6df7744b10f20cf9003b6db4a3f1b5f0c2def6e4a52b2e2933822be2828bb02":"0x00661a3341"

*/

//check to see if Inactive Mode works

contract('MarsMonkeRescue - Inactive Mode', function(accounts) {

	var helpfulFunctions = require("./testFunctions.js")(MarsMonkeRescue, accounts);
	var hfn = Object.keys(helpfulFunctions)
	for(var i = 0; i < hfn.length; i++){
		global[hfn[i]] = helpfulFunctions[hfn[i]];
	}

	//rescueIndex should equal (totalSupply - (remainingMonke + remainingGenesisMonke))
	checkRescueIndex();

	//searchSeed should be set to 0x0
	checkSearchSeed(0x0);

	//contract should be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(0);
	
	//try to call addGenesisMonkeGroup from contract owner account before mode is changed - should fail
	addGenesisMonkeGroupFromAccount(0, "expect to fail");
	
	//try to call addGenesisMonkeGroup from non contract owner account before mode is changed - should fail	
	addGenesisMonkeGroupFromAccount(1, "expect to fail");
	
	//try to rescue MarsMonke from contract owner account before mode is changed - should fail
	rescueMonkeFromAccount(0, "0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237", "expect to fail");
	
	//try to rescue MarsMonke from non contract owner account before mode is changed - should fail
	rescueMonkeFromAccount(1, "0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237", "expect to fail");
	
	//searchSeed should be set to 0x0
	checkSearchSeed(0x0);

	//contract should still be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(0);

	//rescueIndex should equal (totalSupply - (remainingMonke + remainingGenesisMonke))
	checkRescueIndex();
});






//check to see if disableBeforeActivation works

contract('MarsMonkeRescue - Disabled Mode', function(accounts) {

	var helpfulFunctions = require("./testFunctions.js")(MarsMonkeRescue, accounts);
	var hfn = Object.keys(helpfulFunctions)
	for(var i = 0; i < hfn.length; i++){
		global[hfn[i]] = helpfulFunctions[hfn[i]];
	}

	//rescueIndex should equal (totalSupply - (remainingMonke + remainingGenesisMonke))
	checkRescueIndex();

	//searchSeed should be set to 0x0
	checkSearchSeed(0x0);

	//contract should be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(0);

	//try to disableBeforeActivation by non contract owner - should fail
	changeModeToDisabled(1, "expect to fail");	

	//contract should still be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(0);

	//try to disableBeforeActivation by contract owner
	changeModeToDisabled(0);

	//contract should be in Disabled Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(1);

	//try to activateInTestMode after disableBeforeActivation is called as contract owner - should fail
	changeModeToTest(0, "expect to fail");

	//contract should still be in Disabled Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(1);

	//try to activateInTestMode after disableBeforeActivation is called by non contract owner - should fail
	changeModeToTest(1, "expect to fail");

	//contract should still be in Disabled Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(1);

	//try to activateInTestMode after disableBeforeActivation is called as contract owner - should fail
	changeModeToLive(0, "expect to fail");

	//contract should still be in Disabled Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(1);

	//try to activateInTestMode after disableBeforeActivation is called by non contract owner - should fail
	changeModeToLive(1, "expect to fail");

	//contract should still be in Disabled Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(1);

	//try to call addGenesisMonkeGroup from contract owner account after disableBeforeActivation is called - should fail
	addGenesisMonkeGroupFromAccount(0, "expect to fail");
	
	//try to call addGenesisMonkeGroup from non contract owner account after disableBeforeActivation is called - should fail	
	addGenesisMonkeGroupFromAccount(1, "expect to fail");
	
	//try to rescue MarsMonke from contract owner account after disableBeforeActivation is called - should fail
	rescueMonkeFromAccount(0, "0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237", "expect to fail");
	
	//try to rescue MarsMonke from non contract owner account after disableBeforeActivation is called - should fail
	rescueMonkeFromAccount(1, "0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237", "expect to fail");

	//contract should still be in Disabled Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(1);

	//searchSeed should still be set to 0x0
	checkSearchSeed(0x0);

	//rescueIndex should equal (totalSupply - (remainingMonke + remainingGenesisMonke))
	checkRescueIndex();
});






//check to see if activateInTestMode works

contract('MarsMonkeRescue - Test Mode', function(accounts) {

	var helpfulFunctions = require("./testFunctions.js")(MarsMonkeRescue, accounts);
	var hfn = Object.keys(helpfulFunctions)
	for(var i = 0; i < hfn.length; i++){
		global[hfn[i]] = helpfulFunctions[hfn[i]];
	}

	//rescueIndex should equal (totalSupply - (remainingMonke + remainingGenesisMonke))
	checkRescueIndex();

	//searchSeed should still be set to 0x0
	checkSearchSeed(0x0);

	//contract should be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(0);

	//try to activateInTestMode by non contract owner - should fail
	changeModeToTest(1, "expect to fail");	

	//contract should still be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(0);

	//try to activateInTestMode by contract owner
	changeModeToTest(0);

	//searchSeed should be set to Test Mode value, "0x5713bdf5d1c3398a8f12f881f0f03b5025b6f9c17a97441a694d5752beb92a3d"
	checkSearchSeed("0x5713bdf5d1c3398a8f12f881f0f03b5025b6f9c17a97441a694d5752beb92a3d");

	//contract should be in test Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(2);

	//try to disableBeforeActivation after activateInTestMode is called, as contract owner - should fail
	changeModeToDisabled(0, "expect to fail");

	//contract should still be in Test Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(2);

	//try to disableBeforeActivation after activateInTestMode is called, as non contract owner - should fail
	changeModeToDisabled(1, "expect to fail");

	//contract should still be in Test Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(2);

	//try to activate after activateInTestMode is called, as contract owner - should fail
	changeModeToLive(0, "expect to fail");

	//contract should still be in Test Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(2);

	//try to activate after activateInTestMode is called, as non contract owner - should fail
	changeModeToLive(1, "expect to fail");

	//contract should still be in Test Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(2);

	//try to call addGenesisMonkeGroup from contract owner account after activateInTestMode is called
	addGenesisMonkeGroupFromAccount(0);
	checkRemainingGenesisMonke(240);

	//try to call addGenesisMonkeGroup from non contract owner account after activateInTestMode is called - should fail
	addGenesisMonkeGroupFromAccount(1, "expect to fail");
	checkRemainingGenesisMonke(240);
	
	//try to rescue MarsMonke from contract owner account after activateInTestMode is called
	rescueMonkeFromAccount(0, "0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237");
	checkMonkeOwner(0, "0x00738ea43a");
	
	//try to rescue MarsMonke from non contract owner account after activateInTestMode is called
	rescueMonkeFromAccount(1, "0xd6df7744b10f20cf9003b6db4a3f1b5f0c2def6e4a52b2e2933822be2828bb02");
	checkMonkeOwner(1, "0x00661a3341");

	//contract should still be in Test Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(2);

	//searchSeed should still be set to Test Mode value, "0x5713bdf5d1c3398a8f12f881f0f03b5025b6f9c17a97441a694d5752beb92a3d"
	checkSearchSeed(0x5713bdf5d1c3398a8f12f881f0f03b5025b6f9c17a97441a694d5752beb92a3d);

	//rescueIndex should equal (totalSupply - (remainingMonke + remainingGenesisMonke))
	checkRescueIndex();
});






//check to see if activate works

contract('MarsMonkeRescue - Live Mode', function(accounts) {

	var helpfulFunctions = require("./testFunctions.js")(MarsMonkeRescue, accounts);
	var hfn = Object.keys(helpfulFunctions)
	for(var i = 0; i < hfn.length; i++){
		global[hfn[i]] = helpfulFunctions[hfn[i]];
	}

	//rescueIndex should equal (totalSupply - (remainingMonke + remainingGenesisMonke))
	checkRescueIndex();

	//searchSeed should still be set to 0x0
	checkSearchSeed(0x0);

	//contract should be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(0);

	//try to activate by non contract owner - should fail
	changeModeToLive(1, "expect to fail");

	//contract should still be in Inactive Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(0);

	//try to activate by contract owner
	changeModeToLive(0);	

	//contract should be in Live Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(3);

	//try to activateInTestMode after activate is called by contract owner - should fail
	changeModeToTest(1, "expect to fail");

	//contract should still be in Live Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(3);

	//try to activateInTestMode after activate is called by non contract owner - should fail
	changeModeToTest(1, "expect to fail");

	//contract should still be in Live Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(3);

	//try to disableBeforeActivation after activate is called by contract owner - should fail
	changeModeToDisabled(0, "expect to fail");

	//contract should still be in Live Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(3);

	//try to disableBeforeActivation after activate is called by non contract owner - should fail
	changeModeToDisabled(1, "expect to fail");

	//contract should still be in Live Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(3);

	//try to call addGenesisMonkeGroup from contract owner account after activate is called
	addGenesisMonkeGroupFromAccount(0);
	checkRemainingGenesisMonke(240);

	//try to call addGenesisMonkeGroup from non contract owner account after activate is called - should fail
	addGenesisMonkeGroupFromAccount(1, "expect to fail");
	checkRemainingGenesisMonke(240);

	//contract should stilll be in Test Mode, (Inactive = 0, Disabled = 1, Test = 2, Live = 3)
	checkContractMode(3);

	//rescueIndex should equal (totalSupply - (remainingMonke + remainingGenesisMonke))
	checkRescueIndex();
});