steem.api.setOptions({url: 'https://api.steemit.com'})
let _stok;
		
function makeTable(records){
	console.log('☆records☆');
	console.log(records);
	html = '<table border=1 >';
	//テーブルのヘッダー
	html = html + '<tr>';
	html = html + '<th></th><th>follower</th><th><a href=javascript:clickTableHeader();>reputation</a></th>';
	html = html + '</tr>';
	for(var i=0;i<records.length;i=i+1){
		html = html + '<tr>';
		html = html + '<td align=right>' + (i+1) + '</td>';
		html = html + '<td>' + records[i].follower + '</td>';
		html = html + '<td align=right>' + records[i].reputation.toFixed(2) + '</td>';		
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
	let lastFollower = "";
	let author = document.getElementById("text1").value;
	while (lastlength == limit){
		(out.length > 0) ? limit = 101:;
		let ret = await steem.api.getFollowersAsync(author, lastFollower, 'blog', limit);
		console.log(ret);
		lastlength = ret.length;
		lastFollower = ret[ret.length - 1].follower;
		out.pop();
		out = out.concat(ret);
	}
	console.log("☆");
	console.log(out);
	return out;
};

function clickTableHeader(){
	if(_stok.length < 2) return;
	(_stok[0].reputation > _stok[_stok.length - 1].reputation) ? k = -1 : k = 1;
	_stok = _stok.sort(function(a,b){
		if(a.reputation < b.reputation) return k;
		if(a.reputation > b.reputation) return -k;
		return 0;
	});
	makeTable(_stok);
}

function clickBtn(){
	aaa().then(result => {		
		makeTable(result);
		_stok = result;
	}).catch(err => {
		console.log('☆');
		console.log(err);
	});
}
