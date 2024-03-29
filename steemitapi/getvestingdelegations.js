steem.api.setOptions({url: 'https://api.steemit.com'})
let _stok;
	
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
	html = html + '<th></th><th>delegatee</th><th>min_delegation_time</th><th>SP</th>';
	html = html + '</tr>';
	for(var i=0;i<records.length;i=i+1){
		html = html + '<tr>';
		html = html + '<td align=right>' + (i+1) + '</td>';
		html = html + '<td>' + records[i].delegatee + '</td>';
		html = html + '<td align=right>' + donokuraimae(records[i].min_delegation_time) + '</td>';
		html = html + '<td align=right>' + records[i].sp.toFixed(2) + '</td>';		
		html = html + '</tr>';
	}
	html = html + '</table>';
	console.log(html);
	document.getElementById("text").innerHTML = html;
}
		
async function aaa(){
	let out = [];
	let limit = 2;
	let lastlength = limit;
	let lastDelegatee = "";
	let author = document.getElementById("text1").value;
	while (lastlength == limit){
		if (out.length > 0) limit = 2 + 1;
		let ret = await steem.api.getVestingDelegationsAsync(author, lastDelegatee, limit);
		console.log(ret);
		if(ret.length == 0) break;
		lastlength = ret.length;
		lastDelegatee = ret[ret.length - 1].delegatee;
		out.pop();
		out = out.concat(ret);
	}
	console.log("☆");
	console.log(out);

	//vestToSteem
	let globalProperties = await steem.api.getDynamicGlobalPropertiesAsync();	
	for(let i=0; i<out.length; i++){
		out[i]['sp'] = steem.formatter.vestToSteem(out[i].vesting_shares, globalProperties.total_vesting_shares, globalProperties.total_vesting_fund_steem)
	}
	
	return out;
};

function clickBtn(){
	aaa().then(result => {		
		makeTable(result);
		_stok = result;
	}).catch(err => {
		console.log('☆');
		console.log(err);
	});
}  
