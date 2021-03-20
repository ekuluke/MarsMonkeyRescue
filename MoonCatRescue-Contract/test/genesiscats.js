//check to see if all of the functions work with Genesis MarsMonke

var MarsMonkeRescue = artifacts.require("./MarsMonkeRescue.sol");

contract('MarsMonkeRescue - Test Genesis MarsMonke', function(accounts) {

	var helpfulFunctions = require("./testFunctions.js")(MarsMonkeRescue, accounts);
	var hfn = Object.keys(helpfulFunctions)
	for(var i = 0; i < hfn.length; i++){
		global[hfn[i]] = helpfulFunctions[hfn[i]];
	}

/* List of rescued MarsMonke seeds and corresponding MonkeIds for Test Mode

"0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237":"0x00738ea43a"
"0xd6df7744b10f20cf9003b6db4a3f1b5f0c2def6e4a52b2e2933822be2828bb02":"0x00661a3341"

*/

//check that all starting parameters are correct

	//searchSeed should be set to 0x0 in Inactive Mode
	checkSearchSeed(0x0);


	//remainingMonke and remainingGenesisMonke should equal totalSupply
	checkAddsUpToTotalSupply();


	//should be 25344 remainingMonke (non-genesis Monke)
	checkRemainingMonke(25344);


	//should be 256 remainingGenesisMonke
	checkRemainingGenesisMonke(256);


	//rescueIndex should be 0 before any Monke are rescued or added
	checkRescueIndexValue(0);


	//rescueIndex should equal (totalSupply - (remainingMonke + remainingGenesisMonke))
	checkRescueIndex();


	//account[0] should have a balance of 0
	checkAccountBalanceOf(0, 0);


	//account[0] should have a pendingWithdrawals of 0
	checkPendingWithdrawals(0, 0);


	//account[1] should have a balance of 0
	checkAccountBalanceOf(1, 0);


	//account[1] should have a pendingWithdrawals of 0
	checkPendingWithdrawals(1, 0);





//check to see if only contract owner can add Genesis MarsMonke in Active Mode

	//try to call addGenesisMonkeGroup from a non-contract owner account before Activation - should fail
	addGenesisMonkeGroupFromAccount(1, "expect to fail");


	//try to call addGenesisMonkeGroup from contract owner account before activation - should fail
	addGenesisMonkeGroupFromAccount(0, "expect to fail");


	//try to activateInTestMode to set searchSeed when called as non contract owner - should fail
	changeModeToTest(1, "expect to fail");
	checkSearchSeed(0x0);


	//try to activateInTestMode to set searchSeed when called as contract owner
	changeModeToTest(0);
	checkSearchSeed(0x5713bdf5d1c3398a8f12f881f0f03b5025b6f9c17a97441a694d5752beb92a3d)


	//try to call addGenesisMonkeGroup from non contract owner account after activation
	addGenesisMonkeGroupFromAccount(1, "expect to fail");
	checkRemainingGenesisMonke(256);


	//try to call addGenesisMonkeGroup from contract owner account after activation
	addGenesisMonkeGroupFromAccount(0);
	checkRemainingGenesisMonke(240);





//check to see if Genesis MarsMonke Group was successfully added

	//rescueIndex should be 16 after 1 Genesis MarsMonke Group is added
	checkRescueIndexValue(16);


	//should still be 25344 remainingMonke after 1 Genesis MarsMonke Group is added
	checkRemainingMonke(25344);


	//totalSupply - remainingMonke + remainingGenesisMonke should equal rescueIndex
	checkRescueIndex();


	//should be 240 remainingGenesisMonke
	checkRemainingGenesisMonke(240);





//check to see if addGenesisMonkeGroup and rescueMonke functions work together

	//try to rescueMonke after searchSeed was set by activateInTestMode
	rescueMonkeFromAccount(1, "0x4d806db28c73025eb20c7cf6baf6af4d426c841e2a6e16068d92c9740d3a9237");
	checkMonkeOwner(1, "0x00738ea43a");
	rescueMonkeFromAccount(1,"0x1111111111111111111111111111111111111111111111111111111111111111", "expect to fail");


	//account[1] should have a balance of 1 (MarsMonke: "0x00738ea43a")
	checkAccountBalanceOf(1, 1);


	//rescueIndex should be 17 after 1 Genesis MarsMonke Group is added and 1 MarsMonke is rescued
	checkRescueIndexValue(17);


	//totalSupply - remainingMonke + remainingGenesisMonke should equal rescueIndex
	checkRescueIndex();


	//should be 25343 remaining Monke after 1 Genesis MarsMonke Group is added and 1 MarsMonke is rescued
	checkRemainingMonke(25343);


	//try to call addGenesisMonkeGroup from a non-contract owner account - should still fail
	addGenesisMonkeGroupFromAccount(1, "expect to fail");


	//should still be 240 remainingGenesisMonke
	checkRemainingGenesisMonke(240);





//check to see if all Genesis MarsMonke can be added, but no more than 256

	//try to call addGenesisMonkeGroup second time from contract owner account after activation
	addGenesisMonkeGroupFromAccount(0);


	//try to call addGenesisMonkeGroup third timefrom contract owner account after activation
	addGenesisMonkeGroupFromAccount(0);


	//try to call addGenesisMonkeGroup fourth time from contract owner account after activation
	addGenesisMonkeGroupFromAccount(0);


	//try to call addGenesisMonkeGroup fifth time from contract owner account after activation
	addGenesisMonkeGroupFromAccount(0);


	//try to call addGenesisMonkeGroup sixth time from contract owner account after activation
	addGenesisMonkeGroupFromAccount(0);


	//try to call addGenesisMonkeGroup seventh time from contract owner account after activation
	addGenesisMonkeGroupFromAccount(0);


	//try to call addGenesisMonkeGroup eighth time from contract owner account after activation
	addGenesisMonkeGroupFromAccount(0);


	//try to call addGenesisMonkeGroup ninth time from contract owner account after activation
	addGenesisMonkeGroupFromAccount(0);


	//try to call addGenesisMonkeGroup tenth time from contract owner account after activation
	addGenesisMonkeGroupFromAccount(0);


	//try to call addGenesisMonkeGroup eleventh time from contract owner account after activation
	addGenesisMonkeGroupFromAccount(0);


	//try to call addGenesisMonkeGroup twelth time from contract owner account after activation
	addGenesisMonkeGroupFromAccount(0);


	//try to call addGenesisMonkeGroup thirteenth timefrom contract owner account after activation
	addGenesisMonkeGroupFromAccount(0);


	//try to call addGenesisMonkeGroup fourteenth timefrom contract owner account after activation
	addGenesisMonkeGroupFromAccount(0);


	//try to call addGenesisMonkeGroup fifteenth timefrom contract owner account after activation
	addGenesisMonkeGroupFromAccount(0);


	//try to call addGenesisMonkeGroup sixteenth timefrom contract owner account after activation
	addGenesisMonkeGroupFromAccount(0);


	//try to call addGenesisMonkeGroup seventeenth timefrom contract owner account after activation
	addGenesisMonkeGroupFromAccount(0, "expected to fail");	


	//try to rescue a MarsMonke for account[2]
	rescueMonkeFromAccount(2, "0xd6df7744b10f20cf9003b6db4a3f1b5f0c2def6e4a52b2e2933822be2828bb02");
	checkMonkeOwner(2, "0x00661a3341");


	//account[2] should have a balance of 1 (MarsMonke: "0x00661a3341")
	checkAccountBalanceOf(2, 1);


	//rescueIndex should be 258 after all 16 Genesis MarsMonke Groups are added and 2 MarsMonke are rescued
	checkRescueIndexValue(258);


	//totalSupply - remainingMonke + remainingGenesisMonke should equal rescueIndex
	checkRescueIndex();


	//should now be 25342 remaining Monke after all Genesis MarsMonke Groups are added and 2 MarsMonke is rescued
	checkRemainingMonke(25342);





//check to see if rescueOrder has correct order

	//rescueOrder index 0 should have MonkeId 0xff00000ca7
	checkRescueOrder(0, "0xff00000ca7");
	
	//rescueOrder index 1 should have MonkeId 0xff01000ca7
	checkRescueOrder(1, "0xff01000ca7");
	
	//rescueOrder index 2 should have MonkeId 0xff02000ca7
	checkRescueOrder(2, "0xff02000ca7");
	
	//rescueOrder index 3 should have MonkeId 0xff03000ca7
	checkRescueOrder(3, "0xff03000ca7");
	
	//rescueOrder index 4 should have MonkeId 0xff04000ca7
	checkRescueOrder(4, "0xff04000ca7");
	
	//rescueOrder index 5 should have MonkeId 0xff05000ca7
	checkRescueOrder(5, "0xff05000ca7");
	
	//rescueOrder index 6 should have MonkeId 0xff06000ca7
	checkRescueOrder(6, "0xff06000ca7");
	
	//rescueOrder index 7 should have MonkeId 0xff07000ca7
	checkRescueOrder(7, "0xff07000ca7");
	
	//rescueOrder index 8 should have MonkeId 0xff08000ca7
	checkRescueOrder(8, "0xff08000ca7");
	
	//rescueOrder index 9 should have MonkeId 0xff09000ca7
	checkRescueOrder(9, "0xff09000ca7");
	
	//rescueOrder index 10 should have MonkeId 0xff0a000ca7
	checkRescueOrder(10, "0xff0a000ca7");
	
	//rescueOrder index 11 should have MonkeId 0xff0b000ca7
	checkRescueOrder(11, "0xff0b000ca7");
	
	//rescueOrder index 12 should have MonkeId 0xff0c000ca7
	checkRescueOrder(12, "0xff0c000ca7");
	
	//rescueOrder index 13 should have MonkeId 0xff0d000ca7
	checkRescueOrder(13, "0xff0d000ca7");
	
	//rescueOrder index 14 should have MonkeId 0xff0e000ca7
	checkRescueOrder(14, "0xff0e000ca7");
	
	//rescueOrder index 15 should have MonkeId 0xff0f000ca7
	checkRescueOrder(15, "0xff0f000ca7");
	
	//rescueOrder index 16 should have MonkeId 0x00738ea43a
	checkRescueOrder(16, "0x00738ea43a");
	
	//rescueOrder index 17 should have MonkeId 0xff10000ca7
	checkRescueOrder(17, "0xff10000ca7");
	
	//rescueOrder index 255 should have MonkeId 0xfffe000ca7
	checkRescueOrder(255, "0xfffe000ca7");
	
	//rescueOrder index 256 should have MonkeId 0xffff000ca7
	checkRescueOrder(256, "0xffff000ca7");
	
	//rescueOrder index 257 should have MonkeId 0x00661a3341
	checkRescueOrder(257, "0x00661a3341");
	
	//rescueOrder index 258 should have MonkeId 0x0 - no MarsMonke in index
	checkRescueOrder(258, 0x0);






//check to see if added Genesis MarsMonke are up for adoption


	//the 1st Genesis MarsMonke with MonkeId 0xff00000ca7 should be up for adoption: being sold by contract owner for 0.3 ether to everyone
	checkAdoptionOfferComplete("0xff00000ca7", true, accounts[0], 0.3, 0x0);

	
	//the 6th Genesis MarsMonke with MonkeId 0xff05000ca7 should be up for adoption: being sold by contract owner for 0.3 ether to everyone
	checkAdoptionOfferComplete("0xff05000ca7", true, accounts[0], 0.3, 0x0);
	
	
	//the 256th Genesis MarsMonke with MonkeId 0xffff000ca7 should be up for adoption: being sold by contract owner for 4.8 ether to everyone
	checkAdoptionOfferComplete("0xffff000ca7", true, accounts[0], 4.8, 0x0);






//check to see if Genesis MarsMonke can be adopted for less than their price

	//try to accept the 1st Genesis MarsMonke adoption offer for less than price, contract owner - should fail
	acceptAdoptionOfferFromAccount(0, "0xff00000ca7", 0.29, "expect to fail");


	//try to accept the 6th Genesis MarsMonke adoption offer for less than price, non contract owner - should fail
	acceptAdoptionOfferFromAccount(1, "0xff05000ca7", 0.29, "expect to fail");






//check to see if Genesis MarsMonke can be adopted for correct price

	//try to accept the 1st Genesis MarsMonke adoption offer as contract owner
	acceptAdoptionOfferFromAccount(0, "0xff00000ca7", 0.3);
	checkMonkeOwner(0, "0xff00000ca7");

	//account[0] should have a balance of 1 (MarsMonke: "0xff00000ca7")
	checkAccountBalanceOf(0, 1);



	//try to accept the 6th Genesis MarsMonke adoption offer as non contract owner
	acceptAdoptionOfferFromAccount(1, "0xff05000ca7", 0.3);
	checkMonkeOwner(1, "0xff05000ca7");

	//account[1] should have a balance of 2 (MarsMonke: "0x00738ea43a", "0xff05000ca7")
	checkAccountBalanceOf(1, 2);



	//try to accept the 256th Genesis MarsMonke adoption offer as non contract owner
	acceptAdoptionOfferFromAccount(2, "0xffff000ca7", 4.8);
	checkMonkeOwner(2, "0xffff000ca7");

	//account[2] should have a balance of 2 (MarsMonke: "0x00661a3341", "0xffff000ca7")
	checkAccountBalanceOf(2, 2);






//check to see if accounts that overpay for Genesis MarsMonke have pendingWithdrawals and can withdraw

	//try to accept and overpay for the 17th Genesis MarsMonke adoption offer as non contract owner
	acceptAdoptionOfferFromAccount(3, "0xff10000ca7", 10);
	checkMonkeOwner(3, "0xff10000ca7");

	//account[3] should have a balance of 1 (MarsMonke: "0xff10000ca7")
	checkAccountBalanceOf(3, 1);

	//account[3] should have a pendingWithdrawals of 9.4 (paid 10 eth for a 0.6 eth offer)
	checkPendingWithdrawals(3, 9.4);

	//try to withdraw funds from account[3] which has 9.4 eth in pendingWithdrawals
	checkWithdraw(3, 9.4);




	//try to aceept and overpay for the 18th Genesis MarsMonke adoption offer as non contract owner
	acceptAdoptionOfferFromAccount(4, "0xff11000ca7", 15);
	checkMonkeOwner(4, "0xff11000ca7");

	//account[4] should have a balance of 1 (MarsMonke: "0xff11000ca7")
	checkAccountBalanceOf(4, 1);

	//account[4] should have a pendingWithdrawals of 14.4 (paid 15 eth for a 0.6 eth offer)
	checkPendingWithdrawals(4, 14.4);

	//try to withdraw funds from account[4] which has 14.4 eth in pendingWithdrawals
	checkWithdraw(4, 14.4);




	//try to accept and overpay for the 19th Genesis MarsMonke adoption offer as non contract owner
	acceptAdoptionOfferFromAccount(5, "0xff12000ca7", 6);
	checkMonkeOwner(5, "0xff12000ca7");

	//account[5] should have a balance of 1 (MarsMonke: "0xff12000ca7")
	checkAccountBalanceOf(5, 1);

	//account[5] should have a pendingWithdrawals of 5.4 (paid 6 eth for a 0.6 eth offer)
	checkPendingWithdrawals(5, 5.4);

	//try to withdraw funds from account[5] which has 5.4 eth in pendingWithdrawals
	checkWithdraw(5, 5.4);




	//try to accept and overpay for the 21st Genesis MarsMonke adoption offer as contract owner
	acceptAdoptionOfferFromAccount(0, "0xff14000ca7", 5);
	checkMonkeOwner(0, "0xff14000ca7");

	//account[0] should have a balance of 2 (MarsMonke: "0xff00000ca7","0xff14000ca7")
	checkAccountBalanceOf(0, 2);

	//account[0] should have a pendingWithdrawals of 4.4 (paid 5 eth for a 0.6 eth offer)
	checkPendingWithdrawals(0, 4.4);

	//try to withdraw funds from account[0] which has 4.4 eth in pendingWithdrawals
	checkWithdraw(0, 4.4);






//check to see if Genesis MarsMonke can still be adopted after inital adoption

	//try to adopt already adopted 1st Genesis MarsMonke adoption as contract owner - should fail
	acceptAdoptionOfferFromAccount(0, "0xff10000ca7", 5, "expect to fail");

	//try to adopt already adopted 1st Genesis MarsMonke adoption as non contract owner - should fail
	acceptAdoptionOfferFromAccount(1, "0xff10000ca7", 5, "expect to fail");

	//try to adopt already adopted 1st Genesis MarsMonke adoption as current MonkeOwner - should fail
	acceptAdoptionOfferFromAccount(3, "0xff10000ca7", 5, "expect to fail");







//check to see if Genesis MarsMonke adoption offers can be cancelled

	//try to cancel Genesis MarsMonke adoption offer for not yet adopted 20th Genesis MarsMonke as contract owner - should fail
	cancelAdoptionOfferFromAccount(0, "0xff13000ca7", "expect to fail");


	//try to cancel Genesis MarsMonke adoption offer for not yet adopted 20th Genesis MarsMonke as non contract owner - should fail
	cancelAdoptionOfferFromAccount(1, "0xff13000ca7", "expect to fail");






//check to see if Genesis MarsMonke work with nameMonke function

	//try to name newly adopted Genesis MarsMonke as MonkeOwner, contract owner
	nameMonkeFromAccount(0, "0xff00000ca7", "Kramer");
	checkMonkeName("0xff00000ca7", "Kramer")


	//try to name newly adopted Genesis MarsMonke as MonkeOwner, non contract owner
	nameMonkeFromAccount(1, "0xff05000ca7", "KramerMan");
	checkMonkeName("0xff05000ca7", "KramerMan")


	//try to name adopted Genesis MarsMonke as non MonkeOwner, contract owner - should fail
	nameMonkeFromAccount(0, "0xffff000ca7", "KramerBuddy", "expect to fail");


	//try to name adopted Genesis MarsMonke as non MonkeOwner, non contract owner - should fail
	nameMonkeFromAccount(1, "0xffff000ca7", "KramerBuddy", "expect to fail");


	//try to name unadopted Genesis MarsMonke as non MonkeOwner, contract owner - should fail
	nameMonkeFromAccount(0, "0xff15000ca7", "KramerBuddy", "expect to fail");


	//try to name unadopted Genesis MarsMonke as non MonkeOwner, non contract owner - should fail
	nameMonkeFromAccount(1, "0xff15000ca7", "KramerBuddy", "expect to fail");


	//try to name 6th Genesis MarsMonke while it is being offered for adoption - should fail
	makeAdoptionOfferFromAccount(2, "0xffff000ca7", 1);
	nameMonkeFromAccount(2, "0xffff000ca7", "KramerMan", "expect to fail");


	//try to cancel adoption offer for 6th Genesis MarsMonke and then name it
	cancelAdoptionOfferFromAccount(2, "0xffff000ca7");
	nameMonkeFromAccount(2, "0xffff000ca7", "KramerBuddy");
	checkMonkeName("0xffff000ca7", "KramerBuddy");


	//try to name an already named Genesis MarsMonke - should fail
	nameMonkeFromAccount(2, "0xffff000ca7", "Kramer", "expect to fail");


	//try to give the 17th Genesis MarsMonke a name longer than 32 bytes (will cut name down to 32 bytes)
	nameMonkeFromAccount(3, "0xff10000ca7", "Kramer, Destroyer of String, Creator of Cuteness, and Last Born of the Magnificent Black Monke");
	checkMonkeName("0xff10000ca7", "Kramer, Destroyer of String, Creator of Cuteness, and Last Born of the Magnificent Black Monke");


	//try to name the 18th Genesis MarsMonke despite adoption request
	makeAdoptionRequestFromAccount(5, "0xff11000ca7", 1);
	checkMonkeOwner(4, "0xff11000ca7");
	nameMonkeFromAccount(4, "0xff11000ca7", "Kramer the Monke");
	checkMonkeName("0xff11000ca7", "Kramer the Monke");


	//should name the 19th Genesis MarsMonke an empty string
	nameMonkeFromAccount(5, "0xff12000ca7", "");
	checkMonkeName("0xff12000ca7", "");


	//should name Genesis MarsMonke again after naming it an empty string
	nameMonkeFromAccount(5, "0xff12000ca7", "Kramer Kitty");
	checkMonkeName("0xff12000ca7", "Kramer Kitty");






//check to see if Genesis MarsMonke can be given away

	//try to give non-adopted Genesis MarsMonke away as non-MonkeOwner, contract owner - should fail
	giveMonkeAway(0, 2, "0xff2f000ca7", "expect to fail");


	//try to give adopted Genesis MarsMonke away as non-MonkeOwner, non contract owner - should fail 
	giveMonkeAway(1, 2, "0xff00000ca7", "expect to fail");


	//try to give non-adopted Genesis MarsMonke away as contract owner - should fail 
	giveMonkeAway(0, 2, "0xfff2000ca7", "expect to fail");


	//try to give non-adopted Genesis MarsMonke away as non contract owner - should fail 
	giveMonkeAway(1, 2, "0xfff2000ca7", "expect to fail");


	//try to give adopted Genesis MarsMonke away as MonkeOwner, non contract owner
	giveMonkeAway(4, 0, "0xff11000ca7");


	//account[0] should have a balance of 3 (MarsMonke: "0xff00000ca7", "0xff14000ca7", "0xff11000ca7")
	checkAccountBalanceOf(0, 3);

	//try to give adopted Genesis MarsMonke away as MonkeOwner, contract owner
	giveMonkeAway(0, 6, "0xff00000ca7");


	//account[0] should have a balance of 2 (MarsMonke: "0xff11000ca7","0xff14000ca7")
	checkAccountBalanceOf(0, 2);






//check to see if makeAdoptionRequest works

	//try to makeAdoptionRequest for adopted Genesis MarsMonke as MonkeOwner, contract owner - should fail
	makeAdoptionRequestFromAccount(0, "0xff11000ca7", 5, "expect to fail");


	//try to makeAdoptionRequest for adopted Genesis MarsMonke as MonkeOwner, non contract owner - should fail
	makeAdoptionRequestFromAccount(6, "0xff00000ca7", 5, "expect to fail");


	//try to makeAdoptionRequest for not yet adopted Genesis MarsMonke as non contract owner - should fail
	makeAdoptionRequestFromAccount(1, "0xff33000ca7", 5, "expect to fail");


	//try to makeAdoptionRequest for not yet adopted Genesis MarsMonke as contract owner - should fail
	makeAdoptionRequestFromAccount(0, "0xff44000ca7", 5, "expect to fail");


	//try to makeAdoptionRequest for adopted Genesis MarsMonke as non MonkeOwner, non contract owner
	makeAdoptionRequestFromAccount(1, "0xff11000ca7", 5);


	//MarsMonke with MonkeId 0xff11000ca7 should be requested: as accounts[1] for 5 ether
	checkAdoptionRequestComplete("0xff11000ca7", true, accounts[1], 5);


	//account[5] should have a pendingWithdrawals of 1 eth after the new adoption request by account[1] for a higher price
	checkPendingWithdrawals(5, 1);


	//try to withdraw funds from account[5] which has 1 eth in pendingWithdrawals
	checkWithdraw(5, 1);


	//try to makeAdoptionRequest again for adopted Genesis MarsMonke as non MonkeOwner, contract owner
	makeAdoptionRequestFromAccount(0, "0xffff000ca7", 5);


	//MarsMonke with MonkeId 0xffff000ca7 should be requested by accounts[0] for 5 ether
	checkAdoptionRequestComplete("0xffff000ca7", true, accounts[0], 5);






//check to see if acceptAdoptionRequest works 

	//try to acceptAdoptionRequest as non MonkeOwner, contract owner - should fail
	acceptAdoptionRequestFromAccount(0, "0xffff000ca7", "expect to fail");


	//try to acceptAdoptionRequest as non MonkeOwner, non contract owner - should fail
	acceptAdoptionRequestFromAccount(1, "0xff11000ca7", "expect to fail");

	//try to acceptAdoptionRequest as MonkeOwner, contract owner
	checkMonkeOwner(0, "0xff11000ca7");
	acceptAdoptionRequestFromAccount(0, "0xff11000ca7");
	checkMonkeOwner(1, "0xff11000ca7");


	//account[0] should have a pendingWithdrawals of 5 (was paid 5 eth for MarsMonke "0xff11000ca7")
	checkPendingWithdrawals(0, 5);


	//try to withdraw funds from account[0] which has 5 eth in pendingWithdrawals
	checkWithdraw(0, 5);


	//account[1] should have a balance of 3 (MarsMonke: "0x00738ea43a", "0xff05000ca7","0xff11000ca7")
	checkAccountBalanceOf(1, 3);


	//try to acceptAdoptionRequest as MonkeOwner, non contract owner
	checkMonkeOwner(2,"0xffff000ca7")
	acceptAdoptionRequestFromAccount(2, "0xffff000ca7");
	checkMonkeOwner(0, "0xffff000ca7");


	//account[2] should have a pendingWithdrawals of 5 (was paid 5 eth for MarsMonke "0xffff000ca7")
	checkPendingWithdrawals(2, 5);


	//try to withdraw funds from account[2] which has 5 eth in pendingWithdrawals
	checkWithdraw(2, 5);


	//account[2] should have a balance of 1 (MarsMonke: "0x00661a3341")
	checkAccountBalanceOf(2, 1);


	//account[0] should have a balance of 2 (MarsMonke: "0xff14000ca7", "0xffff000ca7")
	checkAccountBalanceOf(0, 2);






//check to see if later adoption offers work

	//try to make Genesis MarsMonke adoption offer as non MonkeOwner, contract owner - should fail
	makeAdoptionOfferFromAccount(0, "0xff00000ca7", 5, "expect to fail");


	//try to make Genesis MarsMonke adoption offer as non MonkeOwner, non contract owner - should fail
	makeAdoptionOfferFromAccount(1, "0xff13000ca7", 5, "expect to fail");


	//try to make Genesis MarsMonke adoption offer to specific address as non MonkeOwner, contract owner - should fail
	makeAdoptionOfferFromAccountToAddress(0, "0xff00000ca7", 5, 1, "expect to fail");


	//try to make Genesis MarsMonke adoption offer to specific address as non MonkeOwner, contract owner - should fail
	makeAdoptionOfferFromAccountToAddress(1, "0xff13000ca7", 5, 0, "expect to fail");


	//try to make Genesis MarsMonke adoption offer to specific address as MonkeOwner, contract owner
	makeAdoptionOfferFromAccountToAddress(1, "0xff11000ca7", 5, 0);


	//MarsMonke with MonkeId 0xff11000ca7 should be offered by accounts[0] for 5 ether
	checkAdoptionOfferComplete("0xff11000ca7", true, accounts[1], 5, accounts[0]);


	//try to make Genesis MarsMonke adoption offer to specific address as MonkeOwner, non contract owner
	makeAdoptionOfferFromAccountToAddress(3, "0xff10000ca7", 5, 0);


	//MarsMonke with MonkeId 0xff10000ca7 should be offered by accounts[0] for 5 ether
	checkAdoptionOfferComplete("0xff10000ca7", true, accounts[3], 5, accounts[0]);


	//try to make Genesis MarsMonke adoption offer as MonkeOwner, contract owner
	makeAdoptionOfferFromAccount(0, "0xff14000ca7", 5);


	//MarsMonke with MonkeId 0xff11000ca7 should be offered by accounts[1] for 5 ether
	checkAdoptionOfferComplete("0xff14000ca7", true, accounts[0], 5, 0x0);


	//try to make Genesis MarsMonke adoption offer as MonkeOwner, contract owner
	makeAdoptionOfferFromAccount(1, "0xff11000ca7", 5);


	//MarsMonke with MonkeId 0xff11000ca7 should be offered by accounts[1] for 5 ether
	checkAdoptionOfferComplete("0xff11000ca7", true, accounts[1], 5, 0x0);


	//try to make Genesis MarsMonke adoption offer as MonkeOwner, non contract owner
	makeAdoptionOfferFromAccount(3, "0xff10000ca7", 5);


	//MarsMonke with MonkeId 0xff10000ca7 should be offered by accounts[3] for 5 ether
	checkAdoptionOfferComplete("0xff10000ca7", true, accounts[3], 5, 0x0);






//check to see if acceptAdoptionOffer worksm for later adoption offers

	//try to accept Genesis MarsMonke adoption offer for less than price as non MonkeOwner, contract owner - should fail
	acceptAdoptionOfferFromAccount(0, "0xff10000ca7", 4, "expect to fail");


	//try to accept Genesis MarsMonke adoption offer for less than price as non MonkeOwner, non contract owner - should fail
	acceptAdoptionOfferFromAccount(1, "0xff10000ca7", 4, "expect to fail");


	//try to accept Genesis MarsMonke adoption offer for less than price as MonkeOwner, non contract owner - should fail
	acceptAdoptionOfferFromAccount(3, "0xff10000ca7", 4, "expect to fail");


	//try to accept Genesis MarsMonke adoption offer for less than price as MonkeOwner, contract owner - should fail
	acceptAdoptionOfferFromAccount(0, "0xff11000ca7", 4, "expect to fail");


	//try to accept Genesis MarsMonke adoption offer as non MonkeOwner, contract owner
	acceptAdoptionOfferFromAccount(0, "0xff10000ca7", 5);
	checkMonkeOwner(0, "0xff10000ca7");


	//account[3] should have a pendingWithdrawals of 5 (was paid 5 eth for MarsMonke "0xff10000ca7)
	checkPendingWithdrawals(3, 5);


	//try to withdraw funds from account[3] which has 5 eth in pendingWithdrawals
	checkWithdraw(3, 5);


	//account[0] should have a balance of 3 (MarsMonke: "0xff14000ca7", "0xffff000ca7", "0xff10000ca7")
	checkAccountBalanceOf(0, 3);


	//account[3] should have a balance of 0
	checkAccountBalanceOf(3, 0);


	//try to accept Genesis MarsMonke adoption offer as non MonkeOwner, non contract owner
	acceptAdoptionOfferFromAccount(3, "0xff11000ca7", 5);	
	checkMonkeOwner(3, "0xff11000ca7");


	//account[1] should have a pendingWithdrawals of 5 (was paid 5 eth for MarsMonke "0xff11000ca7)
	checkPendingWithdrawals(1, 5);


	//try to withdraw funds from account[1] which has 5 eth in pendingWithdrawals
	checkWithdraw(1, 5);


	//account[3] should have a balance of 1 (MarsMonke: "0xff11000ca7")
	checkAccountBalanceOf(3, 1);


	//account[1] should have a balance of 2 (MarsMonke: "0x00738ea43a", "0xff05000ca7")
	checkAccountBalanceOf(1, 2);





//check to see if final account balances are correct

	//account[0] should have a balance of 3 (MarsMonke: "0xff14000ca7", "0xffff000ca7", "0xff10000ca7")
	checkAccountBalanceOf(0, 3);

	//account[1] should have a balance of 2 (MarsMonke: "0x00738ea43a", "0xff05000ca7")
	checkAccountBalanceOf(1, 2);

	//account[2] should have a balance of 1 (MarsMonke: "0x00661a3341")
	checkAccountBalanceOf(2, 1);

	//account[3] should have a balance of 1 (MarsMonke: "0xff11000ca7")
	checkAccountBalanceOf(3, 1);

	//account[4] should have a balance of 0
	checkAccountBalanceOf(4, 0);

	//account[5] should have a balance of 1 (MarsMonke: "0xff12000ca7")
	checkAccountBalanceOf(5, 1);

	//account[6] should have a balance of 1 (MarsMonke: "0xff00000ca7")
	checkAccountBalanceOf(6, 1);	

	//account[7] should have a balance of 0
	checkAccountBalanceOf(7, 0);





//check to see if pending withdrawals work for unused accounts

	//account[6] should have a pendingWithdrawals of 0
	checkPendingWithdrawals(6, 0);

	//account[7] should have a pendingWithdrawals of 0
	checkPendingWithdrawals(7, 0);





//check to see if withdraw works for unused accounts
	
	//try to withdraw funds from account[6] which has 0
	checkWithdraw(6, 0);	

	//try to withdraw funds from account[7] which has 0
	checkWithdraw(7, 0);	

});