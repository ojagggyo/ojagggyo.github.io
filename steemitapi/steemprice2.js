steem.api.setOptions({url: 'https://api.steememory.com'});
let username ='yasu.witness';

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

			    //チャート更新
			    labels.push(new Date().toLocaleString());
			    //datas.push(sbddebtratio.toFixed(9) );
			datas.push(10.5 );
			    myChart.update();
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
    fill: true, 
    backgroundColor: 'rgba(221, 51, 204, 0.2)',
}]
};
// === include 'setup' then 'config' above ===
const config = {
    type: 'line',
    data: data,
};
