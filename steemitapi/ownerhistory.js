steem.api.setOptions({url: 'https://api.steemit.com'});

function getOwnerHistory(){  
  wait steem.api.getOwnerHistory('support-jp', function(err, result) {
     console.log('☆');
    console.log(err, result);
    return result;
  });
}
