steem.api.setOptions({url: 'https://api.steemit.com'});

function getOwnerHistory(){  
  let ownerHistory = steem.api.getOwnerHistory('support-jp');
  console.log('☆');
  console.log(ownerHistory);
  return ownerHistory;
}
