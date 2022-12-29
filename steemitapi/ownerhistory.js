//const sleep = ms => new Promise(res => setTimeout(res, ms));
              
function ConvertDate(datetime){
    time = new Date(datetime);
    time.setHours(time.getHours() + 9);
    return time.toLocaleString().slice(0,-3);//右から3文字カット
}

//steem.api.setOptions({url: 'https://api.steemit.com'});
steem.api.setOptions({url: 'https://api.steememory.com'});

async function getAccountInfo(usernames){
  let data = [];
  document.getElementById("text").innerHTML = '<tabel></tabel>';
  for(var i=0;i<usernames.length;i=i+1){  
    document.getElementById("progress").innerText = ' ' + (i + 1) + ' / ' + usernames.length;
    let accounts = await steem.api.getAccountsAsync([usernames[i]]);
    if(accounts.length == 0) continue;//アカウントなし
    let ownerHistory = await steem.api.getOwnerHistoryAsync(usernames[i]);
    data.push({'n':usernames[i],'a':accounts[0],'v':ownerHistory}); 
  }
  console.log(data);
  return data;
}

function clickBtn() {
  let t1 = document.getElementById("text1").value;
  let csv = t1.split(/\n/);//改行で分割する
  getAccountInfo(csv).then(result => {
      console.log('☆result☆');
      console.log(result);
    html = '<table border=1 >';
      //テーブルのヘッダー
    html = html + '<tr>';
    html = html + '<th>Name</th>'
      +'<th>recovery account</th>'
      +'<th>last owner update</th>'
      +'<th>withdraw routes</th>'
      +'<th>last valid time</th>'
      +'<th>Power Down</th>';
    html = html + '</tr>';
    for(var i=0;i<result.length;i=i+1){
      html = html + '<tr>';
      html = html + '<td>' + result[i].n + '</td>';
      html = html + '<td>' + result[i].a.recovery_account + '</td>';
      html = html + '<td>';
      console.log(result[i].a.last_owner_update.toString());
      if(result[i].a.last_owner_update.toString() != '1970-01-01T00:00:00'){
        html = html + ConvertDate(result[i].a.last_owner_update);
      }
      html = html + '</td>';
      html = html + '<td>';
      if(result[i].a.withdraw_routes > 0){
        html = html + result[i].a.withdraw_routes;          
      }
      html = html + '</td>';
      html = html + '<td>';
      if(result[i].v.length > 0){
        for(var j=0;j<result[i].v.length;j=j+1){
            html = html + ConvertDate(result[i].v[j].last_valid_time) + "<br/>";
        }
      }
      html = html + '</td>';
      html = html + '<td>';
      if(result[i].a.next_vesting_withdrawal.toString() != '1969-12-31T23:59:59'){
        html = html + '開始'
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
