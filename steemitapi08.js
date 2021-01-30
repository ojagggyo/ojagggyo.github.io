let username;
function saveUserName(){
    username = window.location.hash;// #username
    if (username == null || username.trim().length == 0){
        username = "#steemitblog";
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
    
    var text = "Voting Powerは " + (vp/100).toFixed(4) + " %です。";
    $('#votingPower').text(text);
    
}

window.onload = function() {
    steem.api.setOptions({url: 'https://api.steemit.com'});
    saveUserName();
    getAccountsAsync();

    setInterval(getAccountsAsync, 5000);
};
