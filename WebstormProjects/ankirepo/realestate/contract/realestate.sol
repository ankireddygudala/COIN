pragma solidity ^0.4.22;

contract realestate {

    //address of owner
    address public owner;
    //address of tenant
    address public tenant;
    //rent amount
    uint public totalRent;
    uint public rentPaid;

    // set deposit amount by tenant
    uint public totalDeposit; // totalDeposit for the agrement
    uint public depositPaid;  // paid by the tenant

    //deductions amount
    uint public deductions;
    uint public damages;

    uint public createdTimestamp;

    // asset information
    struct Asset {
        string location;
        string description;
        string summary;
    }
    //house details
    Asset public house;

    //history of rental payment
    struct PaidRents {
        address paidBy;
        uint amount;
        uint timestamp;
    }

    PaidRents[] internal paidrents;

    enum State { Created, SignRequired, SignedAndDepositRequired, Active, WaitingForDeductions, Terminated }

    State public state;

    /* Events for DApps to listen to */
    event AgreementConfirmed(address indexed _tenant);
    event DepostedAmount(address indexed _tenant, uint _amount);
    event RentPaid(address indexed _tenant, uint _value);
    event CancelAgreement();
    event RentWithdrawl(address indexed _tenant, uint _value, bool _true);
    event AssetDetailsChanged(bool _true);

    //dev function modifier for only owner
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    //dec function modifier for only tenant
    modifier onlyTenant(){
        require(msg.sender == tenant);
        _;
    }
    //modifier to check the state of the contract agrement
    modifier inState(State _state) {
        require(state == _state);
        _;
    }

    // we set the contrct details, we can access this information by usign getter methods

    function getOwner() public view returns(address _owner) {
        return owner;
    }

    function getTenant() public view returns(address _tenant) {
        return tenant;
    }

    function getTotalRentAmount() public view returns(uint _rent) {
        return totalRent;
    }
    function getRentPaid() public view returns(uint) {
        return rentPaid;
    }

    function getTotalDepostAmount() public view returns(uint _deposit) {
        return totalDeposit;
    }

    function getDepositPaid() public view returns(uint) {
        return depositPaid;
    }

    function getContractAddress() public view returns(address _contract){
        return this;
    }

    function getCreatedTimestamp() public view returns(uint _timestamp) {
        return createdTimestamp;
    }

    //return Asset details
    function getHouse() public view returns(string _location, string _description, string _summary) {

        return (house.location, house.description, house.summary);
    }

    //teturn the state of the contract
    function getState() public view returns (State) {
        return state;
    }
    // retun paid rental history
    function getPaidRents() public view returns(address[], uint[], uint[]) {

        uint[] memory timestamps = new uint[](paidrents.length);
        address[] memory paidAddr = new address[](paidrents.length);
        uint[] memory amounts = new uint[](paidrents.length);

        for (uint i = 0; i < paidrents.length; i++) {
            PaidRents memory paid = paidrents[i];
            timestamps[i] = paid.timestamp;
            paidAddr[i] = paid.paidBy;
            amounts[i] = paid.amount;
        }

        return (paidAddr, amounts, timestamps);
    }

    //function to get the asset details
    function getAssetDetails() public view returns(string, string, string) {
        return(house.location, house.description, house.summary);
    }

    //dev function to set the damages
    function setDeductions(uint _amount) public onlyOwner inState(State.Active) returns(bool _success) {
        require(_amount >= 0);
        state = State.WaitingForDeductions;
        damages = _amount;
        return true;
    }

    //change asset details
    function changeAssetDetails(string _location, string _description, string _summary) public onlyOwner returns(bool ){

        house.location = _location;
        house.description = _description;
        house.summary = _summary;

        emit AssetDetailsChanged(true);
        return true;
    }

    //create rental agrement
    // rental agrement initialted by only owner
    function createRentalAgreement(uint _rent, uint _totalDeposit) onlyOwner  public  {

        require(state == State.Created || state == State.Terminated);
        require(_rent > 0);
        require(_totalDeposit >= 0);
        owner = msg.sender;
        totalDeposit = _totalDeposit;
        //reset depositPaid amount
        depositPaid = 0;
        totalRent = _rent;
        rentPaid = 0;
        createdTimestamp = block.timestamp;
        state = State.SignRequired;
    }



    //sign created agrement bt the owner
    //sign only by the tenant not by the owner
    function signAgrement() inState(State.SignRequired) public returns(bool success){
        require(msg.sender != owner);
        tenant = msg.sender;
        state = State.SignedAndDepositRequired;
        emit AgreementConfirmed(msg.sender);
        return true;
    }


    //deposit funds to contract
    function payDeposit() payable onlyTenant inState(State.SignedAndDepositRequired) public returns (bool success) {

        // check deposit amount reach totalDeposit amount
        require(depositPaid + msg.value < totalDeposit);

        depositPaid += msg.value;
        emit DepostedAmount(msg.sender, msg.value);

        if(totalDeposit == depositPaid) {
            state = State.Active;
        }
        return true;
    }


    //pay rent to owner
    // this function is only executed by the tenant only
    function payRent() payable onlyTenant public inState(State.Active) returns (bool) {

        require(msg.sender.balance > msg.value);
        require(msg.value > 0);
        require(rentPaid < totalRent);

        owner.transfer(msg.value);
        //insert into paidrents array
        paidrents.push(PaidRents({
            paidBy:msg.sender,
            amount:msg.value,
            timestamp: block.timestamp

        }));

        emit RentPaid(msg.sender, msg.value);
        return true;
    }

    //reset rents by monthly/weekly
    function resetRentPaidByTenant() public onlyOwner inState(State.Active) returns(bool success) {

        //check if tenant paid more rent than total rent required
        //if tenant paid more rent then forward that amount to next month
        if(rentPaid > totalRent){
            rentPaid -= totalRent;
        }
        else {
            rentPaid = 0;
        }
        return true;
    }

    //withdraw rent
    function withdrawRent() public onlyTenant inState(State.WaitingForDeductions) returns(bool){

        uint rent = address(this).balance - damages;

        msg.sender.transfer(address(this).balance - damages);
        owner.transfer(address(this).balance);
        emit RentWithdrawl(msg.sender, rent, true);
        return true;
    }


    //terminate rental agrement contract so tenant can't pay rents
    //only by the owner
    function cancelAgreement() onlyOwner inState(State.WaitingForDeductions) public returns(bool) {
        //event to


        owner.transfer(address(this).balance);
        /* If there is any value on the
               contract send it to the landlord*/
        state = State.Terminated;
        emit CancelAgreement();

        return true;
    }



    //kill smart contract
    function kill() public onlyOwner returns(bool){
        if(msg.sender == owner){

            selfdestruct(owner);
            return true;
        }
        return false;
    }

    // function initilize the contract
    // function initialted with asset details
    constructor(string _loc, string _desc, string _summ) public {

        house.location = _loc;
        house.description = _desc;
        house.summary =_summ;
        owner = msg.sender;
    }


}
