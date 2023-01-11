client = steem.api.setOptions({url: 'https://api.steemit.com'})
	
async function aaa(){
	let tags = [];
	let limit = 10;
	let lastTag = "";
	while (limit == 10 && tags.length < 50){
		let ret = await steem.api.getTrendingTagsAsync(lastTag, limit);
		console.log(ret);
		limit = ret.length;
		lastTag = ret[ret.length - 1].name;
		tags.pop();
		tags = tags.concat(ret);
	}
	console.log("☆");
	console.log(tags);

	return tags;
};
	
aaa().then(result => {
	console.log('☆result☆');
	console.log(result);
	html = '<table border=1 >';
	//テーブルのヘッダー
	html = html + '<tr>';
	html = html + '<th></th><th>Name</th><th>top posts</th><th>comments</th><th>total payouts</th>';
	html = html + '</tr>';
	for(var i=0;i<result.length;i=i+1){
		html = html + '<tr>';
		html = html + '<td align=right>' + (i+1) + '</td>';
		html = html + '<td><a href=' + 'https://steemit.com/created/' + result[i].name + ' target=_blank>' + result[i].name+ '</a></td>';
		html = html + '<td align=right>' + result[i].top_posts + '</td>';
		html = html + '<td align=right>' + result[i].comments + '</td>';
		html = html + '<td align=right>' + result[i].total_payouts + '</td>';
		html = html + '</tr>';
	}
	html = html + '</table>';
	console.log(html);
	document.getElementById("text").innerHTML = html;
	}).catch(err => {
	console.log('☆');
	console.log(err);
});
