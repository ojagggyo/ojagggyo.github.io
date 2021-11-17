async function aaa(usernames){
  let items = [];
  let accounts = await steem.api.getAccountsAsync(usernames)
  console.log(accounts);
  for(var i=0;i<accounts.length;i=i+1){
	  let vp = accounts[i].voting_power + (10000 * ((new Date - new Date(accounts[i].last_vote_time + "Z")) / 1000) / 432000);
	  let item = {};
	  item['name'] = accounts[i].name;
	  item['voting_power'] = vp / 100;
	  items.push(item);
  }
  return items;
}

function clickBtn(){
	let t1 = document.getElementById("text1").value;
	let usernames = t1.split(/\n/);//改行で分割する
	aaa(usernames).then(result => {	
		_stok = result;
		makeTable(result);
	}).catch(err => {
		console.log('☆');
		console.log(err);
	});
}

function clickHeader(){
	if(_stok.length < 2) return;
	if(parseFloat(_stok[0].voting_power) > parseFloat(_stok[_stok.length - 1].voting_power)) {
		k = -1;
	}else{
		k = 1;
	}
	_stok = _stok.sort(function(a,b){
		if(a.voting_power < b.voting_power) return k;
		if(a.voting_power > b.voting_power) return -k;
		return 0;
	});
	makeTable(_stok);
}
	
function makeTable(records){
	console.log('☆records☆');
	console.log(records);
	let html = '<table border=1 >';
	//テーブルのヘッダー
	html = html + '<tr>';
	html = html + '<th>name</th><th><a href=javascript:clickHeader();>voting power</a></th>';
	html = html + '</tr>';
	for(let i=0; i<records.length; i=i+1){
		html = html + '<tr>';
		html = html + '<td>' + records[i].name + '</td>';//
		html = html + '<td align=right>' + records[i].voting_power.toFixed(2) + '%</a></td>';
	}
	html = html + '</table>';
	document.getElementById("text").innerHTML = html;
}

steem.api.setOptions({url: 'https://api.steemit.com'})
let _stok ;
