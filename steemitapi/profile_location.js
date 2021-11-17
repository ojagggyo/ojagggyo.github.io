function getlocation(json_string){
  const json = JSON.parse(json_string);
  if ('location' in json) {
    return json.location;
  }
  return '';  
}

async function aaa(usernames){
  let items = [];
  let accounts = await steem.api.getAccountsAsync(usernames)
  console.log(accounts);
  for(var i=0;i<accounts.length;i=i+1){
	  let item = {};
	  item['name'] = accounts[i].name;
	  item['profile_location'] = getlocation(accounts[i].json_metadata);
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

function clickTableHeader(){
	if(_stok.length < 2) return;
	if(_stok[0].profile_location > _stok[_stok.length - 1].profile_location) {
		k = -1;
	}else{
		k = 1;
	}
	_stok = _stok.sort(function(a,b){
		if(a.profile_location < b.profile_location) return k;
		if(a.profile_location > b.profile_location) return -k;
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
	html = html + '<th>name</th><th><a href=javascript:clickTableHeader();>location</a></th>';
	html = html + '</tr>';
	for(let i=0; i<records.length; i=i+1){
		html = html + '<tr>';
		html = html + '<td>' + records[i].name + '</td>';//
		html = html + '<td align=right>' + records[i].profile_location + '</a></td>';
	}
	html = html + '</table>';
	document.getElementById("text").innerHTML = html;
}

steem.api.setOptions({url: 'https://api.steemit.com'})
let _stok ;
