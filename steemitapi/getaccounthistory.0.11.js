

function donokuraimae(date){
	date1 = new Date(date);
	date1.setHours(date1.getHours() + 9);
	var now = new Date();
	sa = now - date1;
	if(sa >= 86400000){return Math.floor(sa / 86400000)+'日前';}
	if(sa >= 3600000){return Math.floor(sa / 3600000)+'時間前';}
	if(sa >= 60000){return Math.floor(sa / 60000)+'分前';}
	if(sa >= 1000){return Math.floor(sa / 1000)+'秒前';}
	return 'たった今';
}

function vestToSteem(vest){
	return  steem.formatter.vestToSteem(
		vest, 
		globalProperties.total_vesting_shares, 
		globalProperties.total_vesting_fund_steem)
}
	
function ellipsis(s){
	return s.length > 40 ? (s).slice(0,40)+"…" : s;
}

function getUserName(){
  let hash = window.location.hash;// #username
  if (hash == null || hash.trim().length == 0){
	  return "";
  }
  hash = hash.substr(1);//#を取る
  hash = decodeURI(hash).trim();//デコード、トリム]
  return hash;
}

// ---------- emoji ----------
let emoji_index = Math.floor( Math.random() * 4 );	;
function emoji(){
emoji_index = ++emoji_index % 4;
switch(emoji_index)
{
case 0:
emoji_upvote = "👍";
emoji_downvote = "👎";
emoji_author_reward = "💰";
emoji_curation_reward = "💰";
emoji_authored = "🤙";
emoji_replied = "✋";
emoji_transfer = "";
emoji_delegate_vesting_shares = "";
emoji_undelegate_vesting_shares = "";
emoji_claim_reward_balance = "";
emoji_comment_benefactor_reward = "💰";
break;
case 1:
emoji_upvote = "😍";
emoji_downvote = "😭";
emoji_author_reward = "😁";
emoji_curation_reward = "😁";
emoji_authored = "🙂";
emoji_replied = "😄";
emoji_transfer = "";
emoji_delegate_vesting_shares = "";
emoji_undelegate_vesting_shares = "";
emoji_claim_reward_balance = "";
emoji_comment_benefactor_reward = "😁";
break;	
case 2:
		//🚀🛰️🛸🌌�🛰️📡🚀 🛸🪐⭐"
emoji_upvote = "🚀";
emoji_downvote = "🕳️";
emoji_author_reward = "⭐";
emoji_curation_reward = "⭐";
emoji_authored = "🛸";
emoji_replied = "🛸";
emoji_transfer = "";
emoji_delegate_vesting_shares = "";
emoji_undelegate_vesting_shares = "";
emoji_claim_reward_balance = "";
emoji_comment_benefactor_reward = "⭐";
break;
case 3:
		//🍓🍉🍈🍇🍊🍒🍓"
emoji_upvote = "🍉";
emoji_downvote = "🍏";
emoji_author_reward = "🍊";
emoji_curation_reward = "🍊";
emoji_authored = "🍒";
emoji_replied = "🍒";
emoji_transfer = "";
emoji_delegate_vesting_shares = "";
emoji_undelegate_vesting_shares = "";
emoji_claim_reward_balance = "";
emoji_comment_benefactor_reward = "🍊";
break;
}
}

// ---------- power ---------- 
async function getEffectivePower(username){
	let globalProperties = await steem.api.getDynamicGlobalPropertiesAsync();
	console.log(globalProperties);
	let total_vesting_shares = parseFloat(globalProperties.total_vesting_shares.replace(" VESTS", ""));
	let total_vesting_fund_steem = parseFloat(globalProperties.total_vesting_fund_steem.replace(" STEEM", ""));
	let k = total_vesting_fund_steem / total_vesting_shares;
	let accounts = await steem.api.getAccountsAsync([username]);
	console.log(accounts);
	let vesting_shares = parseFloat(accounts[0].vesting_shares.replace(" VESTS", ""));
	let received_vesting_shares = parseFloat(accounts[0].received_vesting_shares.replace(" VESTS", ""));
	let delegated_vesting_shares = parseFloat(accounts[0].delegated_vesting_shares.replace(" VESTS", ""));
	sp = vesting_shares * k;//保持しているSP
	sp1 = received_vesting_shares * k;//委任されたSP
	sp2 = delegated_vesting_shares * k;//委任したSP
	return {sp:sp, received_sp: sp1, delegated_sp: sp2};
}
	
 function effectivepower(username){
	getEffectivePower(username).then(result => {
		document.getElementById("effectivepowervalue").text = 
			steem.formatter.numberWithCommas((result.sp + result.received_sp - result.delegated_sp).toFixed(0)) + " SP" ;
		document.getElementById("effectivepowerdetail").text = 
			'('
			+ steem.formatter.numberWithCommas((result.sp).toFixed(0))
			+ ' + '
			+ steem.formatter.numberWithCommas((result.received_sp).toFixed(0))
			+ ' - ' 
			+ steem.formatter.numberWithCommas((result.delegated_sp).toFixed(0))
			+ ')';
		document.getElementById("effectivepower").max = result.sp + result.received_sp;
		document.getElementById("effectivepower").value = result.sp + result.received_sp - result.delegated_sp;
	}).catch(err => {
		console.log(err);
	});	
}
	
function getVotingPower(username) {
    return new Promise((resolve, reject) => {
        steem.api.getAccounts([username], function(err, response) {
            if (err) reject(err);
            const voting_power  = response[0].voting_power;
            resolve(voting_power / 100);
        });          
    });
}
	
function votingpower(username){
	getVotingPower(username).then(result => {
		document.getElementById("votingpowervalue").text = result.toFixed(0) + ' %';
		document.getElementById("votingpower").value = result;
	}).catch(err => {
		console.log(err);
	});
}

// ---------- ----------
function clickBtn(days){
	emoji();
	document.getElementById("progress").innerText = "";
	document.getElementById("author_reward").innerText = "";
	document.getElementById("curation_reward").innerText = "";
	document.getElementById("comment_benefactor_reward").innerText = "";
	document.getElementById("transfer_in").innerText = "";
	document.getElementById("transfer_out").innerText = "";
	document.getElementById("text").innerText = "";
	
	total_count = {};
	total_sbd_payout = {};
	total_steem_payout = {};
	total_vesting_payout = {};
	total_sp_payout = {};
	
	total_transfer_count = {};
	total_transfer_sbd = {};
	total_transfer_steem = {};
	
	window.location.hash = '#' + document.getElementById("username").value;
	aaa(days).then(result => {
		document.getElementById("text").innerText = 'processing...';
		makeTable(result);
	}).catch(err => {
		document.getElementById("text").innerText = err;
		console.log(err);
		alert(err);
	});
}

function inputChange(event){
    jdenticon.update("#identicon", document.getElementById("username").value);
}
