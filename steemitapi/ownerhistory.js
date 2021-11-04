steem.api.setOptions({url: 'https://api.steemit.com'});    

async function getOwnerHistoryAsync(accountname){  
  let ownerHistory = await steem.api.getOwnerHistoryAsync(accountname);
  console.log('☆☆');
  console.log(ownerHistory);
  return ownerHistory;
}
            
function clickBtn() {
  let t1 = document.getElementById("text1").value;
  let csv = t1.split(/\n/);//改行で分割する
  
  for(var i=0;i<csv.length;i=i+1){
    getOwnerHistoryAsync(csv[i]).then(result => {
      console.log('★★');
      console.log(result);
      //console.log(result[0].last_valid_time);
      //console.log(result[0].previous_owner_authority);
      //console.log(result[0].previous_owner_authority.key_auths);
      //console.log(result[0].previous_owner_authority.key_auths.length);
      //onsole.log(result[0].previous_owner_authority.key_auths[0]);

      $("#text").text(result[0].last_valid_time);
    }).catch(err => {
    });
  }
}
