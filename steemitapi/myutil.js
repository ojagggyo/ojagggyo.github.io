steem.api.setOptions({url: 'https://api.steemit.com'});

function getUserName(){
  username = window.location.hash;// #username
  if (username == null || username.trim().length == 0){
      username = "#steemitblog";
  }
  username = username.substr(1);//#を取る
  username = decodeURI(username).trim();//デコード、トリム]
  return username;
}

async function getAccountsAsync(username){
  let accounts = await steem.api.getAccountsAsync([username]);
  console.log(accounts);
  if(accounts.length == 0) {return;}
  return accounts[0];
}

function getOwnerHistory(account){  
  steem.api.getOwnerHistory(account, function(err, result) {
    console.log(err, result);
  });
}
