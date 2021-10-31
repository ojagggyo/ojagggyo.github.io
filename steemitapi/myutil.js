steem.api.setOptions({url: 'https://api.steemit.com'});
//let username;


function getUserName(){
  username = window.location.hash;// #username
  if (username == null || username.trim().length == 0){
      username = "#steemitblog";
  }
  username = username.substr(1);//#を取る
  username = decodeURI(username).trim();//デコード、トリム]
  return username;
}

async function getAccountsAsync(){
  let accounts = await steem.api.getAccountsAsync([username]);
  console.log(accounts);
  if(accounts.length == 0) {return;}
  let account = accounts[0];
  return account;
}
