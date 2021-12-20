steem.api.setOptions({url: 'https://api.steemit.com'})

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
		
function makeTable(records){

	console.log('☆records☆');
	console.log(records);
	html = '<table border=1 >';
	//テーブルのヘッダー
	html = html + '<tr>';
	html = html + '<th>timestamp</th><th>no</th><th>op</th><th></th>';
	html = html + '</tr>';
	//for(var i=0;i<records.length;i=i+1){
	for(var i=records.length-1;i>=0;i=i-1){
		html = html + '<tr>';
		html = html + '<td align=right>' + donokuraimae(records[i][1].timestamp) + '</td>';
		html = html + '<td>' + records[i][0] + '</td>';
		html = html + '<td>' + records[i][1].op[0] + '</td>';
		html = html + '<td>' + JSON.stringify(records[i][1].op[1]) + '</td>';
		html = html + '</tr>';
	}
	html = html + '</table>';
	console.log(html);
	document.getElementById("text").innerHTML = html;
}
		
async function aaa(){
	let out = [];
	let limit = 100;
	let lastlength = limit;
	let firstValue = -1;
	let author = document.getElementById("text1").value;
	while (firstValue != 0 && out.length < 1000){	
		if(firstValue != -1 && firstValue < limit) limit = firstValue;//limitより小さいfirstValueでエラーになる問題の対応。
		let ret = await steem.api.getAccountHistoryAsync(author, firstValue, limit);
		console.log(ret);		
		firstValue = ret[0][0];
		ret.shift();
		lastlength = ret.length;
		out = ret.concat(out);
	}
	console.log("☆");
	console.log(out);
	return out;
};

function clickBtn(){
	aaa().then(result => {		
		makeTable(result);
	}).catch(err => {
		console.log('☆');
		console.log(err);
	});
}
