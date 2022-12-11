function getUserName(){
	
	let url = new URL(window.location.href);
	let params = url.searchParams;
	let api = params.get('api');
	console.log(api);
	if(api){
		console.log(api);
		//client = null;
		//client = new dsteem.Client(api);
		steem = null;
		steem.api.setOptions({url: api});
	}
	
	let hash = window.location.hash;// #username
	if (hash == null || hash.trim().length == 0){
		return "";
	}
	hash = hash.substr(1);//#を取る
	hash = decodeURI(hash).trim();//デコード、トリム]
	return hash;
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


let myChart1;
let csv = [];
function makeTable(records){
	csv.length = 0
	csv.push ('日付,価格\n'); 
	for(var i=0;i<records.length;i=i+1){
		let exchange_rate = records[i][1].op[1].exchange_rate.base.slice(0, -4);;//0.229 SBD
		let publisher = records[i][1].op[1].publisher;
		let timestamp = formatDate(new Date(records[i][1].timestamp + "z"));
		csv.push (timestamp + "," + exchange_rate);
	}
	document.getElementById("price").innerHTML = records[records.length-1][1].op[1].exchange_rate.base.slice(0, -4);
	
	//チャート
	if(myChart1 != null){myChart1.destroy();}
	let days = 0;
	myChart1 = clickChartBtn('', days, myChart1, 'myChart1', csv, 'STEEM価格', 'rgb(51, 221, 204)');
}
  

async function aaa(days){
	let out = [];
	let limit = 100;
	let lastlength = limit;
	let firstValue = -1;
	let firstTimestamp = new Date();
	let now = new Date();

	while (firstValue != 0 && now.getTime() - firstTimestamp.getTime() <= (86400000 * days)){
		//limitより小さいfirstValueでエラーになる問題の対応。
		if(firstValue != -1 && firstValue < limit) {
			limit = firstValue;
		}
		let ret = await steem.api.getAccountHistoryAsync(username, firstValue, limit);

		firstValue = ret[0][0];
			firstTimestamp = new Date(ret[0][1].timestamp);
		firstTimestamp.setHours(firstTimestamp.getHours() + 9);
		ret.shift();
		lastlength = ret.length;
		
		for(var i=ret.length-1;i>=0;i=i-1){
			if(now.getTime() - (new Date(ret[i][1].timestamp).getTime() + 3600000 * 9) > (86400000 * days)){
				ret.splice(i,1);
				continue;
				//ret.splice(0, i + 1);//残りの要素を削除
				//break;//すべて処理済
			}

			if(ret[i][1].op[0] != "feed_publish"){ 
				ret.splice(i,1);
				continue;
			}		

			let timestamp = new Date(ret[i][1].timestamp + "z");
			let termDay = (now - timestamp) / 86400000;
			document.getElementById("progress").innerText = timestamp.toLocaleString() + ' to now' + ' (' + termDay.toFixed(3) + ' days)';
		}
		out = ret.concat(out);
	}
	return out;
};


function clickBtn(days){
	document.getElementById("progress").innerText = "";
	document.getElementById("text").innerText = "";

	aaa(days).then(result => {
		makeTable(result);
	}).catch(err => {
		document.getElementById("text").innerText = err;
		console.log(err);
		alert(err);
	});
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



