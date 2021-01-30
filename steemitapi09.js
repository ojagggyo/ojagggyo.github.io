let username;
function saveUserName(){
    username = window.location.hash;// #username
    if (username == null || username.trim().length == 0){
        username = "#steemitblog";
    }

    username = username.substr(1);//#を取る
    username = decodeURI(username).trim();//デコード、トリム
}

async function getSteemPower() {
    let steemPrice = await steem.api.getCurrentMedianHistoryPriceAsync();
    console.log(steemPrice);
    steemPrice = parseFloat(steemPrice.base.replace(" SBD"));

    let accounts = await steem.api.getAccountsAsync([username]);
    console.log(accounts);
    if (accounts.length == 0) { return; }
    let item = accounts[0];

    // RSHARE
    let globalProperties = await steem.api.getDynamicGlobalPropertiesAsync();
    console.log(globalProperties);
    let total_vesting_shares = parseFloat(globalProperties.total_vesting_shares.replace(" VESTS", ""));
    let total_vesting_fund_steem = parseFloat(globalProperties.total_vesting_fund_steem.replace(" STEEM", ""));

    let vesting_shares = parseFloat(item.vesting_shares.replace(" VESTS", ""));
    let received_vesting_shares = parseFloat(item.received_vesting_shares.replace(" VESTS", ""));
    let delegated_vesting_shares = parseFloat(item.delegated_vesting_shares.replace(" VESTS", ""));
    let sumVestingShare = vesting_shares + received_vesting_shares - delegated_vesting_shares;

    let sp = (sumVestingShare / total_vesting_shares * total_vesting_fund_steem);
    $("#steemPower").text("" + sp.toFixed(6) + " STEEM");

    let sp1 = (vesting_shares / total_vesting_shares * total_vesting_fund_steem);
    let sp2 = (received_vesting_shares / total_vesting_shares * total_vesting_fund_steem);
    let sp3 = (delegated_vesting_shares / total_vesting_shares * total_vesting_fund_steem);

    $("#sp1").text(sp1.toFixed(6) + " STEEM");
    $("#sp2").text("+" + sp2.toFixed(6) + " STEEM");
    $("#sp3").text("-" + sp3.toFixed(6) + " STEEM");
}

window.onload = function() {
    steem.api.setOptions({url: 'https://api.steemit.com'});
    saveUserName();
    getSteemPower();

    setInterval(getSteemPower, 1000);
};
