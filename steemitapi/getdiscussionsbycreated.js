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

function getTags(json_string){
  const json = JSON.parse(json_string);
  if ('tags' in json) {
    return json.tags.map(tag => "#" + tag).join(' ');
  }
  return '';  
}
	
function getImages(json_string){
	const json = JSON.parse(json_string);
	if ('image' in json) {
		let html = "";
			for(let i=0; i<json.image.length; i=i+1){
			html = html + "<img src=" + json.image[i] + " loading=lazy />";
		}
		return html;
	}
	return "";
}	

async function aaa(){
	let query = { limit : 10, tag : "hive-161179" };
	query["limit"] = _limit;
	query["start_author"] = _author;
	query["start_permlink"] = _permlink;
	let ret = steem.api.getDiscussionsByCreatedAsync(query);
	console.log(ret);
	return ret;
};

function clickBtn(){
	console.log(_author);
	console.log(_permlink);
	aaa().then(result => {
		if(_author != ''){
			result.shift();//配列の先頭を削除
		}
		if(result.length > 0){
			_author = result[result.length - 1].author;//最後の要素を保存
			_permlink = result[result.length - 1].permlink;//最後の要素を保存
			_limit = 11;
		}
		_discussions = _discussions.concat(result);//合体
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
	html = html + '<th></th><th>author</th><th>title</th><th>beneficiaries</th><th>tags</th>';
	html = html + '</tr>';
	for(let i=0; i<records.length; i=i+1){
		html = html + '<tr>';
		html = html + '<td align=right>' + donokuraimae(records[i].created) + '</td>';//
		html = html + '<td>' + records[i].author + '</td>';
		html = html + '<td><a href=' + 'https://steemit.com' + records[i].url + ' target=_blank>' + records[i].title + '</a>'
			+ '<br/>' + getImages(records[i].json_metadata) + '</td>';
		html = html + '<td>';
		for(let j=0; j<records[i].beneficiaries.length; j++){
			html = html + records[i].beneficiaries[j].account + ' ';
			html = html + records[i].beneficiaries[j].weight.toString().slice(0,-2) + '%';
			html = html + '<br/>';
		}
		html = html + '</td>';
		html = html + '<td>' + getTags(records[i].json_metadata) + '</td>';
		html = html + '</tr>';
	}
	html = html + '</table>';
	document.getElementById("text").innerHTML = html;
}

steem.api.setOptions({url: 'https://api.steemit.com'})
_author = "";
_permlink = "";
_discussions = [];
_limit = 10;

window.onload = function() {
	_author = "";
	_permlink = "";
	_discussions.length = 0;//配列の初期化
	clickBtn();
};
