async function aaa(usernames,withdrawRouteType){
  let items = [];
  for(var i=0;i<usernames.length;i=i+1){
      let ret = await steem.api.getWithdrawRoutesAsync(usernames[i], withdrawRouteType);
	    console.log(ret);
	  if(ret.length > 0){
		for(var j=0;j<ret.length;j=j+1){
			let item = {};
			item['from_account'] = ret[j].from_account;
			item['to_account'] = ret[j].to_account;
			item['percent'] = (ret[j].percent/100).toFixed(2)+"%";
			item['auto_vest'] = ret[j].auto_vest;
			items.push(item);
	 	}
	  }else{
		  	let item = {};
			item['from_account'] = (withdrawRouteType == 1) ? usernames[i] : "no route";
			item['to_account'] = (withdrawRouteType == 0) ? usernames[i] : "no route";
			item['percent'] = "";
			item['auto_vest'] = "";
			items.push(item);
	  }
  }
  return items;
}

function clickBtn(withdrawRouteType){
	let t1 = document.getElementById("text1").value;
	let usernames = t1.split(/\n/);//改行で分割する
	aaa(usernames,withdrawRouteType).then(result => {	
		_stok = result;
		makeTable(result);
	}).catch(err => {
		console.log('☆');
		console.log(err);
	});
}
	
function makeTable(records){
	console.log('☆records☆');
	console.log(records);
	let html = '<table border=1 >';
	//テーブルのヘッダー
	html = html + '<tr>';
	html = html + '<th>from_account</th><th>to_account</th><th>percent</th><th>auto_vest</th>';
	html = html + '</tr>';
	for(let i=0; i<records.length; i=i+1){
		html = html + '<tr>';
		html = html + '<td>' + records[i].from_account + '</td>';//
		html = html + '<td>' + records[i].to_account + '</td>';
		html = html + '<td align=right>' + records[i].percent + '</td>';
		html = html + '<td>' + records[i].auto_vest + '</td>';
		
	}
	html = html + '</table>';
	document.getElementById("text").innerHTML = html;
}

steem.api.setOptions({url: 'https://api.steememory.com'})
let _stok ;
