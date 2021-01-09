
let username;
let storage_username;
let defaultHtml = '<div style="height:150px; padding-top:55px;padding-bottom:55px;"><button type="button" class="btn btn-success" style="margin:3px;">followers: 0</button><button type="button" class="btn btn-warning" style="margin:3px;">unfollowers: 0</button></div>';

window.onload = function() {
    storage_username = localStorage.getItem("username");
    let previous_count = localStorage.getItem("follower_count");
    previous_count = previous_count === null ? 0 : previous_count;
    $("#text_username").val(storage_username);
    $("#past_sub").text("number of followers: " + previous_count);
    steem.api.setOptions({url: 'https://api.steemit.com'});
    getAccountCount();
    getSteemPrice();
    getVotingPowerPercent();
    loadSelectBox();
};
function loadSelectBox(){
    username = $("#text_username").val();
    if(username === ""){
        return;
    }
    steem.api.getDiscussionsByBlog({tag: username, limit: 20}, function(err, result) {
        let text = "";
        for(let i = 0; i < result.length; i++){
            if(result[i].author === username){
                text += '<option value="' + result[i].permlink+ '">' + result[i].title + '</option>';
            }
        }
        if(result.length == 0) {
            $("#selectPerm").html("");
            $("#votingListButton").text("");
            $("#votingListButton").val("");
            return;
        }
        $("#selectPerm").html(text);
        getVoting("SBD");
    });
}
function getAccountCount(){
    steem.api.getAccountCount(function(err, result) {
        $("#steemitUser").text(result);
    });
}
function getSteemPrice() {
    steem.api.getCurrentMedianHistoryPrice(function(err, result) {
        let steemPrice = parseFloat(result.base.replace(" SBD"));
        $("#steemPrice").text("$" + steemPrice);
    });
}
async function getFullPowerSBD() {
    $("#userSP").text("");
    $("#votingSBD").text("");
    let username = $("#text_username").val();
    let steemPrice = await steem.api.getCurrentMedianHistoryPriceAsync();
    steemPrice = parseFloat(steemPrice.base.replace(" SBD"));
    let accounts = await steem.api.getAccountsAsync([username]);
    if(accounts.length == 0) {return;}
    let item = accounts[0];

    // RSHARE
    let globalProperties = await steem.api.getDynamicGlobalPropertiesAsync();
    let total_vesting_shares = parseFloat(globalProperties.total_vesting_shares.replace(" VESTS", ""));
    let total_vesting_fund_steem = parseFloat(globalProperties.total_vesting_fund_steem.replace(" STEEM", ""));

    let sumVestingShare = parseFloat(item.vesting_shares.replace(" VESTS", "")) + parseFloat(item.received_vesting_shares.replace(" VESTS", "") - parseFloat(item.delegated_vesting_shares.replace(" VESTS", "")));
    let sp = (sumVestingShare / total_vesting_shares * total_vesting_fund_steem);
    let vp = item.voting_power + (10000 * ((new Date - new Date(item.last_vote_time + "Z")) / 1000) / 432000);
    let votingWeight = 100;
    let power = sp / (total_vesting_fund_steem / total_vesting_shares);
    let voting = ((100 * vp * (100 * votingWeight) / 10000) + 49) / 50;
    let rshare = power * voting;
    let fund = await steem.api.getRewardFundAsync('post');
    let sbd = rshare * (parseFloat(fund.reward_balance.replace(" STEEM","")) / fund.recent_claims) * steemPrice;

    $("#userSP").text(sp.toFixed(2) + " SP");
    $("#votingSBD").text("$" + sbd.toFixed(2));
}
function getVotingPowerPercent(){
    $("#timeLeft").text(" ");
    $("#votingPowerP").text(" ");
    let username = $("#text_username").val();
    steem.api.getAccounts([username], function(err, response){
        if(response.length == 0) return;
        let secondsago = (new Date - new Date(response[0].last_vote_time + "Z")) / 1000;
        let vpow = response[0].voting_power + (10000 * secondsago / 432000);
        let secondsLeft = (10000 - vpow) * 432000 / 10000;
        vpow = Math.min(vpow / 100, 100).toFixed(2) + "%";
        $("#votingPowerP").text(vpow);
        if(secondsLeft > 0){
            let minutesLeft = ((secondsLeft % 3600) / 60).toFixed();
            let hoursLeft = Math.floor(secondsLeft / 3600);
            if(minutesLeft < 10) {minutesLeft = "0" + minutesLeft};
            let timeLeft = hoursLeft > 0 ? hoursLeft + ":" + minutesLeft : minutesLeft + "min";  
            $("#timeLeft").text(timeLeft);
        }
    });
    getFullPowerSBD();
}

async function getSteemPower(ids){
    let globalProperties = await steem.api.getDynamicGlobalPropertiesAsync();
    let total_vesting_shares = parseFloat(globalProperties.total_vesting_shares.replace(" VESTS", ""));
    let total_vesting_fund_steem = parseFloat(globalProperties.total_vesting_fund_steem.replace(" STEEM", ""));

    console.log(total_vesting_shares + "  " + total_vesting_fund_steem);
    let accounts = await steem.api.getAccountsAsync(ids);

    let retObj = {};
    accounts.map(function(item, index){
        let sumVestingShare = parseFloat(item.vesting_shares.replace(" VESTS", "")) + parseFloat(item.received_vesting_shares.replace(" VESTS", "") - parseFloat(item.delegated_vesting_shares.replace(" VESTS", "")));
        let sp = (sumVestingShare / total_vesting_shares * total_vesting_fund_steem).toFixed(0);
        retObj[item.name] = {"vesting_shares": item.vesting_shares.replace(" VESTS", ""), 
                "received_vesting_shares":item.received_vesting_shares.replace(" VESTS", ""),
                "delegated_vesting_shares":item.delegated_vesting_shares.replace(" VESTS", ""),
                "SP": sp};
    })
    return retObj;
}

async function getVoting(orderby){
    let link = $("#selectPerm").val();
    username = $("#text_username").val();
    let steemPrice = await steem.api.getCurrentMedianHistoryPriceAsync();
    steemPrice = parseFloat(steemPrice.base.replace(" SBD"));
    let fund = await steem.api.getRewardFundAsync('post');
    let replies = await steem.api.getContentRepliesWithAsync({author:username, permlink:link});
    replies = replies.map(function(item, index){
            return item.author;
    });
    let result = await steem.api.getActiveVotesAsync(username, link);
    let objectArray = [];
    let ids = result.map(function(item, index){
        return item.voter;
    })
    let sparray = await getSteemPower(ids);

    for(let i = 0; i < result.length; i++){
        let id = result[i].voter;
        let sbd = steemPrice * result[i].rshares * (parseFloat(fund.reward_balance.replace(" STEEM","")) /fund.recent_claims);
        let percent = result[i].percent / 100;
        let time = new Date(result[i].time).getTime();
        objectArray.push({ID:id, SBD: sbd, PERCENT: percent, SP: sparray[id].SP, TIME:time});
    }
    sortByKey(objectArray, orderby);

    let text = "";
    for(let i = 0; i < objectArray.length; i++){                    
        let item = "$" + objectArray[i].SBD.toFixed(3) + "    " + objectArray[i].PERCENT + "%      " + objectArray[i].ID + " (" + objectArray[i].SP + ")";
        if(replies.includes(objectArray[i].ID)){
            text += '<button class="dropdown-item" type="button" value="' + objectArray[i].ID + '" onclick="selectChanged(this);" style="background-color:#d1ffdb;">' + item + '</button>';
        }else{
            text += '<button class="dropdown-item" type="button" value="' + objectArray[i].ID + '" onclick="selectChanged(this);">' + item + '</button>';
        }

        if(i === 0){
            $("#votingListButton").text(item);
            $("#votingListButton").val(objectArray[i].ID);
        }

    }
    $("#dropdownList").html(text);
}

function selectChanged(obj){
    $("#votingListButton").text($(obj).text());
    $("#votingListButton").val($(obj).val());

}

function sortByKey(array, key) {
     return array.sort(function(a,b) { return b[key] - a[key];});
}
async function getSteemData(){
    username = $("#text_username").val();
    if(username === ""){
        return;
    }
    $("#btn_check").css("background-color", "#256873").text("Loading...").prop('disabled', true);

    storage_username = localStorage.getItem("username");
    if(storage_username !==  username){
        localStorage.removeItem("username");
        localStorage.removeItem("follower_count");
        localStorage.removeItem("follower_list");

        $("#result").html(defaultHtml);
        loadSelectBox();
        getVotingPowerPercent();
    }
    localStorage.setItem("username", username);

    const result = await steem.api.getFollowCountAsync(username);
    console.log(result);

    if(result.follower_count == 0) {
        $("#btn_check").css("background-color", "#205894").text("Check Now").prop('disabled', false);
        return;
    }
    let allFollower = await getAllFollower(result.follower_count);
    console.log("total: " + allFollower.length);

    let previous_follower_count = localStorage.getItem("follower_count");
    if(previous_follower_count === null){
        $("#past_sub").text("number of followers: " + allFollower.length + " (↗0 ↘0)");
    }else{
        const allFollowing = await getAllFollowing(result.following_count);
        displayResult(allFollower, allFollowing);
    }
    localStorage.setItem("follower_count", allFollower.length);
    localStorage.setItem("follower_list", JSON.stringify(allFollower));
    $("#btn_check").css("background-color", "#205894").text("Check Now").prop('disabled', false);
}
async function getAllFollowing(total_count) {
    let retArray = [];
    let current_count = 0;
    let startFollowing = "";
    while(true) {
        let options = {follower: 'supergiant', startFollowing: startFollowing, followType: 'blog', limit: 100}
        let result = await steem.api.getFollowingWithAsync(options);
        let followingNum = result.length;
        startFollowing = result[followingNum - 1].following;

        if(followingNum > 99){
            result.pop();
            followingNum--;
        }
        let array = result.map(function(item, index){
            return item.following;
        })

        retArray = retArray.length == 0 ? array : retArray.concat(array);

        if(current_count + result.length < total_count){
            current_count += followingNum;
        }else{
            break;
        }
        if(followingNum === 0){
            break;
        }
    }
    return retArray;
}
async function getAllFollower(total_count) {
    let retArray = [];
    let current_count = 0;
    let startFollower = "";
    while(true) {
        let options = {following: username, startFollower: startFollower, followType: 'blog', limit: 1000}
        let result = await steem.api.getFollowersWithAsync(options);
        let followerNum = result.length;
        startFollower = result[followerNum - 1].follower;

        if(followerNum > 999){
            result.pop();
            followerNum--;
        }
        let array = result.map(function(item, index){
            return item.follower;
        })

        retArray = retArray.length == 0 ? array : retArray.concat(array);

        if(current_count + result.length < total_count){
            current_count += followerNum;
        }else{
            break;
        }
        if(followerNum === 0){
            break;
        }
    }
    return retArray;
}
function displayResult(followers, followings){    
    let previous_follower_array = JSON.parse(localStorage.getItem("follower_list"));
    let new_follower_array = [];
    for(let i = 0; i < followers.length; i ++){
        let index = previous_follower_array.indexOf(followers[i]);
        if(index === -1){
            new_follower_array.push(followers[i]);
        }else{
            previous_follower_array.splice(index,1);
        }
    }
    let resultHtml = "";
    for(let i = 0; i < new_follower_array.length; i++){
        let text = followings.indexOf(new_follower_array[i]) === -1 ? new_follower_array[i] : new_follower_array[i] + " *";
        let link = '<a class="btn btn-success" style="margin:3px;" href="https://steemit.com/@' + new_follower_array[i] + '" role="button" target="_blank">' + text + '</a>';
        resultHtml += link;
    }
    for(let i = 0; i < previous_follower_array.length; i++){
        let text = followings.indexOf(previous_follower_array[i]) === -1 ? previous_follower_array[i] : previous_follower_array[i] + " *";
        let link = '<a class="btn btn-warning" style="margin:3px;" href="https://steemit.com/@' + previous_follower_array[i] + '" role="button" target="_blank">' + text + '</a>';
        resultHtml += link;
    }
    if(new_follower_array.length == 0 && previous_follower_array.length == 0){
        $("#result").html(defaultHtml);
    }else{
        $("#result").html(resultHtml);
    }                        
    $("#past_sub").text("number of followers: " + followers.length + "  (↗" + new_follower_array.length + "  ↘" + previous_follower_array.length + ")");
    console.log("Recent followers: " + new_follower_array.length + " Recent unfollowers: "  + previous_follower_array.length);
}
function moveToPost(){
    let username = $("#text_username").val();
    let link = $("#selectPerm").val();
    if(link === null) {
        return;
    }
    let href="https://steemit.com/@" + username + "/" + link;
    window.open(href, "_blank");
}
function moveToBlog(){
    let username = $("#votingListButton").val();
    if(username === null) {
        return;
    }
    let href="https://steemit.com/@" + username;
    window.open(href, "_blank");
}
            
