steem.api.setOptions({url: 'https://api.steememory.com'});
let username ='yasu.witness';

const sleep = (time) => new Promise((r) => setTimeout(r, time));//timeはミリ秒

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
			}
			if(ret[i][1].op[0] != "feed_publish"){ 
				ret.splice(i,1);
				continue;
			}

			let exchange_rate = ret[i][1].op[1].exchange_rate.base.slice(0, -4);;//0.229 SBD
			let day = new Date(ret[i][1].timestamp).toLocaleString();
			
			    //チャート更新
			    labels.unshift(day);
			    datas.unshift(exchange_rate);
			    myChart.update();
			await sleep(300);
		}
	}
};

window.onload = function() {
	aaa(30);
};

let labels = [];
let datas = [];
const data = {
labels: labels,
datasets: [{
    label: 'Steem price',
        backgroundColor: 'rgb(221, 51, 204)',
        borderColor: 'rgb(221, 51, 204)',
    data: datas,
    //fill: true, 
    //backgroundColor: 'rgba(221, 51, 204, 0.2)',
}]
};
// === include 'setup' then 'config' above ===
const config = {
    type: 'line',
    data: data,
};
