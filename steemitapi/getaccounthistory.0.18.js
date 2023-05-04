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
	return  window.steem.formatter.vestToSteem(
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

function effectivepower(username,id1, id2, id3){
	if(arguments.length == 1){
		id1 = "effectivepowervalue";
		id2 = "effectivepowerdetail";
		id3 = "effectivepower";
	}
	getEffectivePower(username).then(result => {
		document.getElementById(id1).text = 
			steem.formatter.numberWithCommas((result.sp + result.received_sp - result.delegated_sp).toFixed(0)) + " SP" ;
		document.getElementById(id2).text = 
			'('
			+ steem.formatter.numberWithCommas((result.sp).toFixed(0))
			+ ' + '
			+ steem.formatter.numberWithCommas((result.received_sp).toFixed(0))
			+ ' - ' 
			+ steem.formatter.numberWithCommas((result.delegated_sp).toFixed(0))
			+ ')';
		if(id3){
			document.getElementById(id3).max = result.sp + result.received_sp;
			document.getElementById(id3).value = result.sp + result.received_sp - result.delegated_sp;
		}
	}).catch(err => {
		console.log(err);
	});	
}


	
function getVotingPower(username) {
    return new Promise((resolve, reject) => {
        steem.api.getAccounts([username], function(err, response) {
		if (err) reject(err);
		const voting_power  = response[0].voting_power + (10000 * ((new Date - new Date(response[0].last_vote_time + "Z")) / 1000) / 432000);
		resolve(voting_power / 100);
        });          
    });
}

function votingpower(username, id1, id2){
	if(arguments.length == 1){
		id1 = "votingpowervalue";
		id2 = "votingpower";
	}
	getVotingPower(username).then(result => {
		document.getElementById(id1).text = result.toFixed(0) + ' %';
		if(id2){
			document.getElementById(id2).value = result;
		}
	}).catch(err => {
		console.log(err);
	});
}

	
function steemAmountFormat(steem, sbd, sp) {
	let s = "";
	let lines = [];
	if(steem > 0){ lines.push(steem.toFixed(3) + " STEEM"); }
	if(sbd > 0){ lines.push(sbd.toFixed(3) + " SBD"); }
	if(sp > 0){ lines.push(sp.toFixed(3) + " SP"); }
	switch(lines.length){
	case 1:
		s = lines[0];
		break;
	case 2:
		s = lines[0] + ' and ' + lines[1];
		break;
	case 3:
		s = lines[0] + ', ' + lines[1] + ' and ' + lines[2];
		break;
	}
	return s;
}	
	
function krwAmountFormat(steemAmount, sbdAmount, spAmount, krw_steem, krw_sbd) {
	if(krw_steem == 0) return "";
	return ' <a class=gray>(' 
		+ steem.formatter.numberWithCommas((steemAmount * krw_steem + sbdAmount * krw_sbd + spAmount * krw_steem).toFixed(0)) 
		+ ' won)</a>';
}
	
//reputation
function log10(str) {
    const leadingDigits = parseInt(str.substring(0, 4));
    const log = Math.log(leadingDigits) / Math.LN10 + 0.00000001;
    const n = str.length - 1;
    return n + (log - parseInt(log));
}

function repLog10(str) {
    let rep = String(str);
    const neg = rep.charAt(0) === '-';
    rep = neg ? rep.substring(1) : rep;
    let out = log10(rep);
    if (isNaN(out)) out = 0;
    out = Math.max(out - 9, 0); // @ -9, $0.50 earned is approx magnitude 1
    out = (neg ? -1 : 1) * out;
    out = out * 9 + 25; // 9 points per magnitude. center at 25  
    return out;
};

async function getReputation(username){
	return new Promise((resolve, reject) => {
		steem.api.getAccounts([username], function(err, response) {
		    if (err) reject(err);
		    resolve(repLog10(response[0].reputation));
		});
	});
}

 function reputation(username, id){
	getReputation(username).then(result => {
		document.getElementById(id).text = result.toFixed(3);
	}).catch(err => {
		console.log(err);
	});	
}

// ---------- age ----------
//27.3217
async function getAge(username){
	return new Promise((resolve, reject) => {
		steem.api.getAccounts([username], function(err, response) {
			if (err) reject(err);
			date1 = new Date(response[0].created);
			date1.setHours(date1.getHours() + 9);
			var now = new Date();
			sa = now - date1;
			
			resolve({
				moons: sa / 86400000 / 27.3217,//月の公転周期 27.3217日
				days: sa / 86400000, 
				earths: sa / 86400000 / 365.242//地球の公転周期365.242日
			});
		});
	});
}

 function age(username){
	getAge(username).then(result => {
		let index = Math.floor( Math.random() * 3);
		if(result.moons < 1 || index == 0){
			document.getElementById("age").text = result.days.toFixed(3) + ' days';
		}else if(result.earths < 1 || index == 1){
			document.getElementById("age").text = result.moons.toFixed(3) + ' moons';
		}else{
			document.getElementById("age").text = result.earths.toFixed(3) + ' earths';
		}

	}).catch(err => {
		console.log(err);
	});	
}
	
//reward
let total_count = {};
let total_sbd_payout = {};
let total_steem_payout = {};
let total_vesting_payout = {};
let total_sp_payout = {};
function getReward(record){
	const username = document.getElementById("username").value
	let sbd_payout = 0;
	let steem_payout = 0;
	let vesting_payout = 0;
	let op = record[1].op[0];
	
	if(op == "comment_benefactor_reward" && record[1].op[1].benefactor == username){
		sbd_payout = parseFloat(record[1].op[1].sbd_payout);
		steem_payout = parseFloat(record[1].op[1].steem_payout);
		vesting_payout = parseFloat(record[1].op[1].vesting_payout);
	}else if(op == "author_reward"){
		sbd_payout = parseFloat(record[1].op[1].sbd_payout);
		steem_payout = parseFloat(record[1].op[1].steem_payout);
		vesting_payout = parseFloat(record[1].op[1].vesting_payout);
	}else if(op == "curation_reward"){
		sbd_payout = 0;
		steem_payout = 0;
		vesting_payout = parseFloat(record[1].op[1].reward);
	}else if(op == "producer_reward"){
		sbd_payout = 0;
		steem_payout = 0;
		vesting_payout = parseFloat(record[1].op[1].vesting_shares);
	}else {
		return false;
	}
	
	/* 不要？
	//vest Steem変換
	total_sp_payout[op] = window.steem.formatter.vestToSteem(
			total_vesting_payout[op], 
			globalProperties.total_vesting_shares, 
			globalProperties.total_vesting_fund_steem)
	*/
	
	if(total_count[op] === void 0){
		total_count[op] = 1;
		total_sbd_payout[op] = sbd_payout;
		total_steem_payout[op] = steem_payout;
		total_vesting_payout[op] = vesting_payout;
		total_sp_payout[op] = vestToSteem(vesting_payout);
	}else{
		total_count[op] += 1;
		total_sbd_payout[op] += sbd_payout;
		total_steem_payout[op] += steem_payout;
		total_vesting_payout[op] += vesting_payout;
		total_sp_payout[op] += vestToSteem(vesting_payout);
	}
	return true;
}
	
//Donation
let total_donation_count = {};
let total_donation_sbd = {};
let total_donation_steem = {};
let total_donation_vesting = {};
let total_donation_sp = {};
function getReward_donation(record){
	const username = document.getElementById("username").value
	let sbd = 0;
	let steem = 0;
	let vesting = 0;
	let op = record[1].op[0];
	if(op == "comment_benefactor_reward" && record[1].op[1].benefactor != username){//Donation
		op = "donation";
		sbd = parseFloat(record[1].op[1].sbd_payout);
		steem = parseFloat(record[1].op[1].steem_payout);
		vesting = parseFloat(record[1].op[1].vesting_payout);
	}else {
		return false;
	}
	
	/* 不要？
	//vest Steem変換
	total_donation_sp[op] = window.steem.formatter.vestToSteem(
			total_donation_vesting[op], 
			globalProperties.total_vesting_shares, 
			globalProperties.total_vesting_fund_steem)
	*/
	
	if(total_donation_count[op] === void 0){
		total_donation_count[op] = 1;
		total_donation_sbd[op] = sbd;
		total_donation_steem[op] = steem;
		total_donation_vesting[op] = vesting;
		total_donation_sp[op] = vestToSteem(vesting);
	}else{
		total_donation_count[op] += 1;
		total_donation_sbd[op] += sbd;
		total_donation_steem[op] += steem;
		total_donation_vesting[op] += vesting;
		total_donation_sp[op] += vestToSteem(vesting);
	}
	return true;
}

//Power up/down
let total_powerupdown_count = {};
let total_powerupdown_steem = {};
let total_powerupdown_vesting = {};
let total_powerupdown_sp = {};
function getReward_powerupdown(record){
	//const username = document.getElementById("username").value
	//let sbd = 0;
	let steem = 0;
	let vesting = 0;
	let op = record[1].op[0];
	//if(op == "withdraw_vesting"){//Power up
	//	op = "power_up";
	//	vesting = parseFloat(record[1].op[1].vesting_shares);
	if(op == "transfer_to_vesting"){//Power up
		op = "power_up";
		steem = parseFloat(record[1].op[1].amount);
	}else if(op == "fill_vesting_withdraw"){//Power down
		op = "power_down";
		steem = parseFloat(record[1].op[1].deposited);
	}else {
		return false;
	}
	
	if(total_powerupdown_count[op] === void 0){
		total_powerupdown_count[op] = 1;
		total_powerupdown_steem[op] = steem;
		total_powerupdown_vesting[op] = vesting;
		total_powerupdown_sp[op] = vestToSteem(vesting);
	}else{
		total_powerupdown_count[op] += 1;
		total_powerupdown_steem[op] += steem;
		total_powerupdown_vesting[op] += vesting;
		total_powerupdown_sp[op] += vestToSteem(vesting);
	}
	return true;
}
	
	
// ---------- Price ----------
function getPrice(markets) {
	return new Promise((resolve, reject) => {
		let url = "https://api.upbit.com/v1/ticker?markets=" + markets;
		//$.getJSON(url, (data) => {
		var p = $.getJSON(url, function(data) {
			resolve(data[0].trade_price);
		})
		.done(function() { 
			console.log('getJSON request succeeded!'); 
		})
		.fail(function(jqXHR, textStatus, errorThrown) { 
			console.log('getJSON request failed! ' + textStatus);
			//reject('getJSON request failed! ' + textStatus);
			resolve(0);
		})
		.always(function() { 
			console.log('getJSON request ended!'); 
		});
		
		setTimeout(function(){ 
			p.abort(); 
		}, 5000);
			
	});
};

	
//transfer
let total_transfer_count = {};
let total_transfer_steem = {};
let total_transfer_sbd = {};
function getTransferAmount(record){
	const username = document.getElementById("username").value
	let transfer_steem = 0;
	let transfer_sbd = 0;
	let amount = record[1].op[1].amount;
	let op = record[1].op[0];
	if(op == "transfer" && record[1].op[1].from == username){
		op = op + "_out";
		if(amount.endsWith('STEEM')){
			transfer_steem = parseFloat(record[1].op[1].amount);
		}else{
			transfer_sbd = parseFloat(record[1].op[1].amount);
		}
	}else if(op == "transfer" && record[1].op[1].to == username){
		op = op + "_in";
		if(amount.endsWith('STEEM')){
			transfer_steem = parseFloat(record[1].op[1].amount);
		}else{
			transfer_sbd = parseFloat(record[1].op[1].amount);
		}
	}else {
		return false;
	}
	
	if(total_transfer_count[op] === void 0){
		total_transfer_count[op] = 1;
		total_transfer_steem[op] = transfer_steem;
		total_transfer_sbd[op] = transfer_sbd;
		
	}else{
		total_transfer_count[op] += 1;
		total_transfer_steem[op] += transfer_steem;
		total_transfer_sbd[op] += transfer_sbd;
	}
	return true;
}


//



// ---------- ----------
function clickBtn(days){
	
	let username = document.getElementById("username").value;
	window.location.hash = '#' + username;
	
	emoji();
	document.getElementById("progress").innerText = "";
	document.getElementById("author_reward").innerText = "";
	document.getElementById("curation_reward").innerText = "";
	document.getElementById("producer_reward").innerText = "";
	document.getElementById("comment_benefactor_reward").innerText = "";
	document.getElementById("transfer_in").innerText = "";
	document.getElementById("transfer_out").innerText = "";
	document.getElementById("donation").innerText = "";
	document.getElementById("power_up").innerText = "";
	document.getElementById("power_down").innerText = "";
	document.getElementById("text").innerText = "";
	
	//payout
	total_count = {};
	total_sbd_payout = {};
	total_steem_payout = {};
	total_vesting_payout = {};
	total_sp_payout = {};
	
	//transfer
	total_transfer_count = {};
	total_transfer_sbd = {};
	total_transfer_steem = {};
	
	//donation
	total_donation_count = {};
	total_donation_sbd = {};
	total_donation_steem = {};
	total_donation_vesting = {};
	total_donation_sp = {};
	
	//power up/down
	total_powerupdown_count = {};
	total_powerupdown_steem = {};
	total_powerupdown_vesting = {};
	total_powerupdown_sp = {};

	aaa(days).then(result => {
		makeTable(result);
		result_copy = result;
	}).catch(err => {
		document.getElementById("text").innerText = err;
		console.log(err);
		alert(err);
	});
}

var result_copy;
function clickUpvote(days){
	makeTable(result_copy);
}

function inputChange(event){
    jdenticon.update("#identicon", document.getElementById("username").value);
}
