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
      
async function aaa(){
	let blogs = [];
	let total = 0;
	let ret;
	let limit = DEF_LIMIT;
	let entry_id = 0;
	let author = document.getElementById("text1").value
	document.getElementById("text").innerHTML = '<tabel></tabel>';
	if(entry_id == 0){
		ret = await steem.api.getBlogAsync(author, entry_id, 1);
		entry_id = ret[0].entry_id;
		total = entry_id + 1;
		document.getElementById("progress").innerText = ' 0 / ' + total;
	}
	
	while (entry_id != 0){
		if(blogs.length > 0){
			limit = DEF_LIMIT + 1;
		}
		if(entry_id + 1 < limit){
			limit = entry_id + 1;
		}
		ret = await steem.api.getBlogAsync(author, entry_id, limit);
		entry_id = ret[ret.length - 1].entry_id;
		blogs.pop();
		blogs = blogs.concat(ret);
		document.getElementById("progress").innerText = ' ' + blogs.length + ' / ' + total;
	}
	return blogs;
};

function clickBtn(){;
	aaa().then(result => {		
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
	html = html + '<th>entry id</th><th>author</th><th>created</th><th>title</th>';
	html = html + '</tr>';
	for(let i=0; i<records.length; i=i+1){
		html = html + '<tr>';
		html = html + '<td align=right>' + records[i].entry_id + '</td>';//
		//html = html + '<td>' + records[i].blog + '</td>';
		html = html + '<td>' + donokuraimae(records[i].comment.author) + '</td>';
		html = html + '<td>' + donokuraimae(records[i].comment.created) + '</td>';
		html = html + '<td><a href=https://steemit.com'+records[i].comment.url + ' target=_blank>' + records[i].comment.title + '</a></td>';
	}
	html = html + '</table>';
	document.getElementById("text").innerHTML = html;
}

steem.api.setOptions({url: 'https://api.steemit.com'})
const DEF_LIMIT = 500;
