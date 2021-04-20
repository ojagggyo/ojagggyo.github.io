let username;
function saveUserName(){
    username = window.location.hash;// #username
    if (username == null || username.trim().length == 0){
        username = "#yasu";
    }

    username = username.substr(1);//#を取る
    username = decodeURI(username).trim();//デコード、トリム
}

async function getAccountsAsync(){
    let accounts = await steem.api.getAccountsAsync([username]);
    console.log(accounts);
    if(accounts.length == 0) {return;}
    let account = accounts[0];
    let vp = account.voting_power + (10000 * ((new Date - new Date(account.last_vote_time + "Z")) / 1000) / 432000);
    //var text = "Voting Powerは " + (vp/100).toFixed(4) + " %です。";
    //$("#votingPower").text(text);
    if(vp > 9900){//99%
        //$('body').css('background', '#f00');
        $('h1').css('color', '#f00');
    }else if(vp > 9500){//99%
        $('h1').css('color', '#ff0');
    }
    
    var text = "" + (vp/100).toFixed(3) + "%";
    //var text = "" + (vp/100).toFixed(3) + "%";
    $('#votingPower').text(text);
    $('#votingPower').css('color', '#fff');
    //$('#votingPower').css('font-size', '200%');
    
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


    let sp1 = (vesting_shares / total_vesting_shares * total_vesting_fund_steem);
    let sp2 = (received_vesting_shares / total_vesting_shares * total_vesting_fund_steem);
    let sp3 = (delegated_vesting_shares / total_vesting_shares * total_vesting_fund_steem);


    $("#userName").text(username + "");
    $("#steemPower").text("" + sp.toFixed(6) + "");
    $("#sp1").text(sp1.toFixed(6) + "");
    $("#sp2").text("+" + sp2.toFixed(6) + "");
    $("#sp3").text("-" + sp3.toFixed(6) + "");
    
    $('#userName').css('color', '#aaa');
    $('#steemPower').css('color', '#fff');    
    $('#sp1').css('color', '#aaa');
    $('#sp2').css('color', '#aaa');
    $('#sp3').css('color', '#aaa');

}

function link(){
    //$('#lll').text('リンク');
    $('#lll').html('<h1>リンク</h1>');
}

window.onload = function() {
    steem.api.setOptions({url: 'https://api.steemit.com'});
    saveUserName();
    getAccountsAsync();
    getSteemPower();

    setInterval(getAccountsAsync, 5000);
    setInterval(getSteemPower, 5000);
    
    link();
};
