function clickBtn(days){
	
	let username = document.getElementById("username").value;
	window.location.hash = '#' + username;
	
	emoji();
	document.getElementById("progress").innerText = "";
	document.getElementById("author_reward").innerText = "";
	document.getElementById("curation_reward").innerText = "";
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
	}).catch(err => {
		document.getElementById("text").innerText = err;
		console.log(err);
		alert(err);
	});
}