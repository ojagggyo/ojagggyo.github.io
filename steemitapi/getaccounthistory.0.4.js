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

function clickBtn(days){
	aaa(days).then(result => {		
		makeTable(result);
	}).catch(err => {
		console.log(err);
	});
}

function inputChange(event){
    let username = document.getElementById("username").value;
    jdenticon.update("#identicon", username);
}


function emoji(){
emoji_index = (emoji_index === void 0) ? 0 : ++emoji_index % 2;
switch(emoji_index)
{
case 0:
emoji_upvote = "👍";
emoji_curation_reward = "💰";
emoji_comment = "📮";
break;
case 1:
emoji_upvote = "😍";
emoji_curation_reward = "😁";
emoji_comment = "🙂";
break;		
}
}
