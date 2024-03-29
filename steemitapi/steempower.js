async function aaa(usernames){
  let items = [];
  let globalProperties = await steem.api.getDynamicGlobalPropertiesAsync();
  console.log(globalProperties);
  let total_vesting_shares = parseFloat(globalProperties.total_vesting_shares.replace(" VESTS", ""));
  let total_vesting_fund_steem = parseFloat(globalProperties.total_vesting_fund_steem.replace(" STEEM", ""));
  let k = total_vesting_fund_steem / total_vesting_shares;
  let accounts = await steem.api.getAccountsAsync(usernames)
  console.log(accounts);
  for(var i=0;i<accounts.length;i=i+1){
    let vesting_shares = parseFloat(accounts[i].vesting_shares.replace(" VESTS", ""));
    let received_vesting_shares = parseFloat(accounts[i].received_vesting_shares.replace(" VESTS", ""));
    let delegated_vesting_shares = parseFloat(accounts[i].delegated_vesting_shares.replace(" VESTS", ""));
    let item = {};
    sp = vesting_shares * k;//保持しているSP
    sp1 = received_vesting_shares * k;//委任されたSP
    sp2 = delegated_vesting_shares * k;//委任したSP
    item['name'] = accounts[i].name;
    item['sp'] = sp.toFixed(3);
    item['received_sp'] = sp1.toFixed(3);
    item['delegated_sp'] = sp2.toFixed(3);
    item['effective_sp'] = (sp + sp1 - sp2).toFixed(3);
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
	if(parseFloat(_stok[0].effective_sp) > parseFloat(_stok[_stok.length - 1].effective_sp)) {
		k = -1;
	}else{
		k = 1;
	}
	_stok = _stok.sort(function(a,b){
		if(parseFloat(a.effective_sp) < parseFloat(b.effective_sp)) return k;
		if(parseFloat(a.effective_sp) > parseFloat(b.effective_sp)) return -k;
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
	html = html + '<th>name</th><th><a href=javascript:clickTableHeader();>Effective Power</a></th><th>sp</th><th>received sp</th><th>delegated sp</th>';
	html = html + '</tr>';
	for(let i=0; i<records.length; i=i+1){
		html = html + '<tr>';
		html = html + '<td>' + records[i].name + '</td>';//
		html = html + '<td align=right>' + records[i].effective_sp + '</a></td>';
		html = html + '<td align=right>' + records[i].sp + '</td>';
		html = html + '<td align=right>' + records[i].received_sp + '</td>';
		html = html + '<td align=right>' + records[i].delegated_sp + '</td>';
	}
	html = html + '</table>';
	document.getElementById("text").innerHTML = html;
}

steem.api.setOptions({url: 'https://api.steememory.com'})
let _stok ;
