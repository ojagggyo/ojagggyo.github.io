steem.api.setOptions({url: 'https://api.steemit.com'});

async function getOwnerHistory(){  
  let ownerHistory = await steem.api.getOwnerHistory('support-jp');
  console.log('☆');
  console.log(ownerHistory);
  return ownerHistory;
}
