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

function vestToSteem(vest){
	return  steem.formatter.vestToSteem(
		vest, 
		globalProperties.total_vesting_shares, 
		globalProperties.total_vesting_fund_steem)
}
	
function ellipsis(s){
	return s.length > 40 ? (s).slice(0,40)+"…" : s;
}

let emoji_index = Math.floor( Math.random() * 4 );	;
function emoji(){
emoji_index = ++emoji_index % 4;
switch(emoji_index)
{
case 0:
emoji_upvote = "👍";
emoji_downvote = "👎";
emoji_author_reward = "💰";
emoji_curation_reward = "💰";
emoji_authored = "🤙";
emoji_replied = "✋";
emoji_transfer = "";
emoji_comment_benefactor_reward = "";
break;
case 1:
emoji_upvote = "😍";
emoji_downvote = "😭";
emoji_author_reward = "💰";
emoji_curation_reward = "😁";
emoji_authored = "🙂";
emoji_replied = "😄";
emoji_transfer = "";
emoji_comment_benefactor_reward = "";
break;	
case 2:
		//🚀🛰️🛸🌌�🛰️📡🚀 🛸🪐⭐"
emoji_upvote = "🛰️";
emoji_downvote = "🕳️";
emoji_author_reward = "💰";
emoji_curation_reward = "🪐";
emoji_authored = "🚀";
emoji_replied = "🛸";
emoji_transfer = "";
emoji_comment_benefactor_reward = "";
break;
case 3:
		//🍓🍉🍈🍇🍊🍒🍓"
emoji_upvote = "🍉";
emoji_downvote = "🍏";
emoji_author_reward = "💰";
emoji_curation_reward = "🍊";
emoji_authored = "🍇";
emoji_replied = "🍒";
emoji_transfer = "";
emoji_comment_benefactor_reward = "";
break;
}
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
