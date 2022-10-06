function clickBtn(days){

	console.log("function clickBtn");
	
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



function getReward_feedprice(record){
	const username = document.getElementById("username").value
	let sbd_payout = 0;
	let steem_payout = 0;
	let vesting_payout = 0;
	let op = record[1].op[0];

	console.log("op="+ op);

	if(op == "feed_publish"){
		exchange_rate = record[1].op[1].exchange_rate.base;//0.229 SBD
		publisher = record[1].op[1].publisher;
		timestamp = record[1].timestamp;
	}else {
		return false;
	}
	
	return true;
}


function formatDate(dt) {
	//var y = dt.getFullYear();
	var m = ('00' + (dt.getMonth()+1)).slice(-2);
	var d = ('00' + dt.getDate()).slice(-2);
	var h = ('00' + dt.getHours()).slice(-2);
	var minute = ('00' + dt.getMinutes()).slice(-2);
	//return (y + '-' + m + '-' + d + ' ' + h + ':' + minute);
	return (m + '-' + d + ' ' + h + ':' + minute);
  }

//-------------------------------------------------------------------------------


function clickChartBtn(type, days, myChart, chart_id,  csv, title, color) {
	//let t1 = document.getElementById(csv_id).value;
	//let csv = t1.split(/\n/);//改行で分割する
	//2次元を2個の1次元に変換する。
	let labels = [];
	let datas = [];
	if(type != '累計'){//日ごと
		for(var i=0;i<csv.length;i=i+1){
			row = csv[i].split(/,/);
			labels.push(row[0]);
			datas.push(row[1]);
		}
	}
	//
	if(days > 0){
		labels = labels.slice(labels.length - days, labels.length);
		datas = datas.slice(datas.length - days, datas.length);
	}
	//
	const data = {
		labels: labels,
		datasets: [{
			label: title,
			backgroundColor: color,
			borderColor: color,
			data: datas,
		}]
	};
	// === include 'setup' then 'config' above ===
	const config = {
		type: 'line',
		data: data,
		options: {}
	};
	
	return new Chart(document.getElementById(chart_id), config);
}  



