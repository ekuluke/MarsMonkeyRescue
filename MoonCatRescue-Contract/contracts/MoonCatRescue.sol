pragma solidity ^0.7.4;
//pragma solidity ^0.4.13;

contract MoonCatRescue {
  enum Modes { Inactive, Disabled, Test, Live }

  Modes public mode = Modes.Inactive;

  address owner;

  bytes16 public imageGenerationCodeMD5 = 0xdbad5c08ec98bec48490e3c196eec683; // use this to verify moonmonkeparser.js the monke image data generation javascript file.

  string public name = "MarsMonkes";
  string public symbol = "0x1f98d"; // unicode monke symbol
  uint8 public decimals = 0;

  uint256 public totalSupply = 25600;
  uint16 public remainingMonkes = 25600 - 256; // there will only ever be 25,000 monkes
  uint16 public remainingGenesisMonkes = 256; // there can only be a maximum of 256 genesis monkes
  uint16 public rescueIndex = 0;

  bytes5[25600] public rescueOrder;

  bytes32 public searchSeed = 0x0; // gets set with the immediately preceding blockhash when the contract is activated to prevent "premining"

  struct AdoptionOffer {
    bool exists;
    bytes5 monkeId;
    address seller;
    uint price;
    address onlyOfferTo;
  }

  struct AdoptionRequest{
    bool exists;
    bytes5 monkeId;
    address requester;
    uint price;
  }

  mapping (bytes5 => AdoptionOffer) public adoptionOffers;
  mapping (bytes5 => AdoptionRequest) public adoptionRequests;

  mapping (bytes5 => bytes32) public monkeNames;
  mapping (bytes5 => address) public monkeOwners;
  mapping (address => uint256) public balanceOf; //number of monkes owned by a given address
  mapping (address => uint) public pendingWithdrawals;

  /* events */

  event MonkeRescued(address indexed to, bytes5 indexed monkeId);
  event MonkeNamed(bytes5 indexed monkeId, bytes32 monkeName);
  event Transfer(address indexed from, address indexed to, uint256 value);
  event MonkeAdopted(bytes5 indexed monkeId, uint price, address indexed from, address indexed to);
  event AdoptionOffered(bytes5 indexed monkeId, uint price, address indexed toAddress);
  event AdoptionOfferCancelled(bytes5 indexed monkeId);
  event AdoptionRequested(bytes5 indexed monkeId, uint price, address indexed from);
  event AdoptionRequestCancelled(bytes5 indexed monkeId);
  event GenesisMonkesAdded(bytes5[16] monkeIds);

  constructor() payable {
    owner = msg.sender;
    assert((remainingMonkes + remainingGenesisMonkes) == totalSupply);
    assert(rescueOrder.length == totalSupply);
    assert(rescueIndex == 0);
  }

  /* registers and validates monkes that are found */
  function rescueMonke(bytes32 seed) public activeMode returns (bytes5) {
    require(remainingMonkes > 0); // cannot register any monkes once supply limit is reached
    bytes32 monkeIdHash = keccak256(abi.encodePacked(seed, searchSeed)); // generate the prospective monkeIdHash
    require(monkeIdHash[0] | monkeIdHash[1] | monkeIdHash[2] == 0x0); // ensures the validity of the monkeIdHash
    bytes5 monkeId = bytes5((monkeIdHash & bytes32(uint256(0xffffffff))) << 216); // one byte to indimonkee genesis, and the last 4 bytes of the monkeIdHash
    require(monkeOwners[monkeId] == address(0x0)); // if the monke is already registered, throw an error. All monkes are unique.

    rescueOrder[rescueIndex] = monkeId;
    rescueIndex++;

    monkeOwners[monkeId] = msg.sender;
    balanceOf[msg.sender]++;
    remainingMonkes--;

    emit MonkeRescued(msg.sender, monkeId);

    return monkeId;
  }

  /* assigns a name to a monke, once a name is assigned it cannot be changed */
  function nameMonke(bytes5 monkeId, bytes32 monkeName) public onlyMonkeOwner(monkeId) {
    require(monkeNames[monkeId] == 0x0); // ensure the current name is empty; monkes can only be named once
    require(!adoptionOffers[monkeId].exists); // monkes cannot be named while they are up for adoption
    monkeNames[monkeId] = monkeName;
    emit MonkeNamed(monkeId, monkeName);
  }

  /* puts a monke up for anyone to adopt */
  function makeAdoptionOffer(bytes5 monkeId, uint price) public onlyMonkeOwner(monkeId) {
    require(price > 0);
    adoptionOffers[monkeId] = AdoptionOffer(true, monkeId, msg.sender, price, address(0x0));
    emit AdoptionOffered(monkeId, price, address(0x0));
  }

  /* puts a monke up for a specific address to adopt */
  function makeAdoptionOfferToAddress(bytes5 monkeId, uint price, address to) public onlyMonkeOwner(monkeId) isNotSender(to){
    adoptionOffers[monkeId] = AdoptionOffer(true, monkeId, msg.sender, price, to);
    emit AdoptionOffered(monkeId, price, to);
  }

  /* cancel an adoption offer */
  function cancelAdoptionOffer(bytes5 monkeId) public onlyMonkeOwner(monkeId) {
    adoptionOffers[monkeId] = AdoptionOffer(false, monkeId, address(0x0), 0, address(0x0));
    emit AdoptionOfferCancelled(monkeId);
  }

  /* accepts an adoption offer  */
  function acceptAdoptionOffer(bytes5 monkeId) external payable {
    AdoptionOffer storage offer = adoptionOffers[monkeId];
    require(offer.exists);
    require(offer.onlyOfferTo == address(0x0) || offer.onlyOfferTo == msg.sender);
    require(msg.value >= offer.price);
    if(msg.value > offer.price) {
      pendingWithdrawals[msg.sender] += (msg.value - offer.price); // if the submitted amount exceeds the price allow the buyer to withdraw the difference
    }
    transferMonke(monkeId, monkeOwners[monkeId], msg.sender, offer.price);
  }

  /* transfer a monke directly without payment 
 function giveMonke(bytes5 monkeId, address to) onlyMonkeOwner(monkeId) {
    transferMonke(monkeId, msg.sender, to, 0);
  }
*/
  /* requests adoption of a monke with an ETH offer */
  function makeAdoptionRequest(bytes5 monkeId) public payable isNotSender(monkeOwners[monkeId]) {
    require(monkeOwners[monkeId] != address(0x0)); // the monke must be owned
    AdoptionRequest storage existingRequest = adoptionRequests[monkeId];
    require(msg.value > 0);
    require(msg.value > existingRequest.price);


    if(existingRequest.price > 0) {
      pendingWithdrawals[existingRequest.requester] += existingRequest.price;
    }

    adoptionRequests[monkeId] = AdoptionRequest(true, monkeId, msg.sender, msg.value);
    emit AdoptionRequested(monkeId, msg.value, msg.sender);

  }

  /* allows the owner of the monke to accept an adoption request */
  function acceptAdoptionRequest(bytes5 monkeId) public onlyMonkeOwner(monkeId) {
    AdoptionRequest storage existingRequest = adoptionRequests[monkeId];
    require(existingRequest.exists);
    address existingRequester = existingRequest.requester;
    uint existingPrice = existingRequest.price;
    adoptionRequests[monkeId] = AdoptionRequest(false, monkeId, address(0x0), 0); // the adoption request must be cancelled before calling transferMonke to prevent refunding the requester.
    transferMonke(monkeId, msg.sender, existingRequester, existingPrice);
  }

  /* allows the requester to cancel their adoption request */
  function cancelAdoptionRequest(bytes5 monkeId) public {
    AdoptionRequest storage existingRequest = adoptionRequests[monkeId];
    require(existingRequest.exists);
    require(existingRequest.requester == msg.sender);

    uint price = existingRequest.price;

    adoptionRequests[monkeId] = AdoptionRequest(false, monkeId, address(0x0), 0);

    msg.sender.transfer(price);

    emit AdoptionRequestCancelled(monkeId);
  }


  function withdraw() public{
    uint amount = pendingWithdrawals[msg.sender];
    pendingWithdrawals[msg.sender] = 0;
    msg.sender.transfer(amount);
  }

  /* owner only functions */

  /* disable contract before activation. A safeguard if a bug is found before the contract is activated */
  function disableBeforeActivation() private onlyOwner inactiveMode {
    mode = Modes.Disabled;  // once the contract is disabled it's mode cannot be changed
  }

  /* activates the contract in *Live* mode which sets the searchSeed and enables rescuing */
  function activate() private onlyOwner inactiveMode {
    searchSeed = blockhash(block.number - 1); // once the searchSeed is set it cannot be changed;
    mode = Modes.Live; // once the contract is activated it's mode cannot be changed
  }

  /* activates the contract in *Test* mode which sets the searchSeed and enables rescuing */
  function activateInTestMode() private onlyOwner inactiveMode { //
    searchSeed = 0x5713bdf5d1c3398a8f12f881f0f03b5025b6f9c17a97441a694d5752beb92a3d; // once the searchSeed is set it cannot be changed;
    mode = Modes.Test; // once the contract is activated it's mode cannot be changed
  }

  /* add genesis monkes in groups of 16 */
  function addGenesisMonkeGroup() private onlyOwner activeMode {
    require(remainingGenesisMonkes > 0);
    bytes5[16] memory newMonkeIds;
    uint256 price = (17 - (remainingGenesisMonkes / 16)) * 300000000000000000;
    for(uint8 i = 0; i < 16; i++) {

      uint16 genesisMonkeIndex = 256 - remainingGenesisMonkes;
      bytes5 genesisMonkeId = (bytes5(uint40(genesisMonkeIndex)) << 24) | 0xff00000ca7;

      newMonkeIds[i] = genesisMonkeId;

      rescueOrder[rescueIndex] = genesisMonkeId;
      rescueIndex++;
      balanceOf[address(0x0)]++;
      remainingGenesisMonkes--;

      adoptionOffers[genesisMonkeId] = AdoptionOffer(true, genesisMonkeId, owner, price, address(0x0));
    }
    emit GenesisMonkesAdded(newMonkeIds);
  }


  /* aggregate getters */

  function getMonkeIds() public returns (bytes5[] memory) {
    bytes5[] memory monkeIds = new bytes5[](rescueIndex);
    for (uint i = 0; i < rescueIndex; i++) {
      monkeIds[i] = rescueOrder[i];
    }
    return monkeIds;
  }


  function getMonkeNames() public returns (bytes32[] memory) {
    bytes32[] memory names = new bytes32[](rescueIndex);
    for (uint i = 0; i < rescueIndex; i++) {
      names[i] = monkeNames[rescueOrder[i]];
    }
    return names;
  }

  function getMonkeOwners()  public returns (address[] memory) {
    address[] memory owners = new address[](rescueIndex);
    for (uint i = 0; i < rescueIndex; i++) {
      owners[i] = monkeOwners[rescueOrder[i]];
    }
    return owners;
  }

  function getMonkeOfferPrices()  public returns (uint[] memory) {
    uint[] memory monkeOffers = new uint[](rescueIndex);
    for (uint i = 0; i < rescueIndex; i++) {
      bytes5 monkeId = rescueOrder[i];
      if(adoptionOffers[monkeId].exists && adoptionOffers[monkeId].onlyOfferTo == address(0x0)) {
        monkeOffers[i] = adoptionOffers[monkeId].price;
      }
    }
    return monkeOffers;
  }

  function getMonkeRequestPrices()  public returns (uint[] memory) {
    uint[] memory monkeRequests = new uint[](rescueIndex);
    for (uint i = 0; i < rescueIndex; i++) {
      bytes5 monkeId = rescueOrder[i];
      monkeRequests[i] = adoptionRequests[monkeId].price;
    }
    return monkeRequests;
  }

  function getMonkeDetails(bytes5 monkeId)  public returns (bytes5 id,
                                                         address owner,
                                                         bytes32 name,
                                                         address onlyOfferTo,
                                                         uint offerPrice,
                                                         address requester,
                                                         uint requestPrice) {

    return (monkeId,
            monkeOwners[monkeId],
            monkeNames[monkeId],
            adoptionOffers[monkeId].onlyOfferTo,
            adoptionOffers[monkeId].price,
            adoptionRequests[monkeId].requester,
            adoptionRequests[monkeId].price);
  }

  /* modifiers */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  modifier inactiveMode() {
    require(mode == Modes.Inactive);
    _;
  }

  modifier activeMode() {
    require(mode == Modes.Live || mode == Modes.Test);
    _;
  }

  modifier onlyMonkeOwner(bytes5 monkeId) {
    require(monkeOwners[monkeId] == msg.sender);
    _;
  }

  modifier isNotSender(address a) {
    require(msg.sender != a);
    _;
  }

  /* transfer helper */
  function transferMonke(bytes5 monkeId, address from, address to, uint price) private {
    monkeOwners[monkeId] = to;
    balanceOf[from]--;
    balanceOf[to]++;
    adoptionOffers[monkeId] = AdoptionOffer(false, monkeId, address(0x0), 0, address(0x0)); // cancel any existing adoption offer when monke is transferred

    AdoptionRequest storage request = adoptionRequests[monkeId]; //if the recipient has a pending adoption request, cancel it
    if(request.requester == to) {
      pendingWithdrawals[to] += request.price;
      adoptionRequests[monkeId] = AdoptionRequest(false, monkeId, address(0x0), 0);
    }

    pendingWithdrawals[from] += price;

    emit Transfer(from, to, 1);
    emit MonkeAdopted(monkeId, price, from, to);
  }

}
