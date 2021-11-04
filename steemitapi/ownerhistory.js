function ConvertDate(datetime){
  time = new Date(datetime);
  time.setHours(time.getHours() + 9);
  return time.toLocaleString().slice(0,-3);
}

steem.api.setOptions({url: 'https://api.steemit.com'});    

async function getAccountInfo(usernames){
  let data =[];
  
  for(var i=0;i<usernames.length;i=i+1){
    
    let accounts = await steem.api.getAccountsAsync([usernames[i]]);
    if(accounts.length == 0) return;//アカウントなし
    console.log(accounts[0]);
    let ownerHistory = await steem.api.getOwnerHistoryAsync(usernames[i]);
    console.log('☆☆');
    data.push({'n':usernames[i],'a':accounts[0],'v':ownerHistory}); 
  }
  
  console.log(data);
  return data;
}

function clickBtn() {
  let t1 = document.getElementById("text1").value;
  let csv = t1.split(/\n/);//改行で分割する
  
  getAccountInfo(csv).then(result => {
     console.log('★');
    console.log(result);
    html = '<table>';
    html = html + '<tr>';
    html = html + '<th>Account Name</th><th>recovery_account</th><th>last_valid_time</th>';
    html = html + '</tr>';
    
    for(var i=0;i<result.length;i=i+1){
      
      html = html + '<tr>';
      
      html = html + '<td>';
      html = html + csv[i];
      html = html + '</td>';
      
      html = html + '<td>';
      html = html + result[i].a.recovery_account;
      html = html + '</td>';
      
      html = html + '<td>';
      console.log('VVV');
      if(result[i].v.length > 0){
        console.log(result[i].v[0]);
        html = html + ConvertDate(result[i].v[0].last_valid_time);
      }
      html = html + '</td>';
      html = html + '</tr>';
    }
    html = html + '</table>';
    console.log(html);
    document.getElementById("text").innerHTML = html;
  }).catch(err => {
     console.log('☆');
    console.log(err);
  }); 


}


