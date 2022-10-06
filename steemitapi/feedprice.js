function clickBtn(days){
	
	document.getElementById("progress").innerText = "";
	document.getElementById("text").innerText = "";
	
	//payout
	total_count = {};
	total_price = {};
	total_date = {};

	aaa(days).then(result => {
		makeTable(result);
	}).catch(err => {
		document.getElementById("text").innerText = err;
		console.log(err);
		alert(err);
	});
}