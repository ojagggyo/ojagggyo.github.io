steem.api.setOptions({url: 'https://api.steemit.com'});    

async function getAccountInfo(usernames){
  let data = [];
  document.getElementById("text").innerHTML = '<tabel></tabel>';
  for(var i=0;i<usernames.length;i=i+1){  
    document.getElementById("progress").innerText = ' ' + (i + 1) + ' / ' + usernames.length;
    let accounts = await steem.api.getAccountsAsync([usernames[i]]);
    if(accounts.length == 0) continue;//アカウントなし
    data.push({'n':usernames[i],'a':accounts[0]}); 
  }
  console.log(data);
  data.sort(function(a,b){
        if(a.a.curation_rewards < b.a.curation_rewards) return -1;
        if(a.a.curation_rewards > b.a.curation_rewards) return 1;
        return 0;
  });
  console.log(data)   
  return data;
}

function clickBtn() {
  let t1 = document.getElementById("text1").value;
  let csv = t1.split(/\n/);//改行で分割する
  getAccountInfo(csv).then(result => {
      console.log('☆result☆');
      console.log(result);
    html = '<table border=1';
      //テーブルのヘッダー
    html = html + '<tr>';
    html = html + '<th>Name</th>'
      +'<th>curation rewards</th>';
    html = html + '</tr>';
    for(var i=0;i<result.length;i=i+1){
      html = html + '<tr>';
      html = html + '<td>' + result[i].n + '</td>';
      html = html + '<td align=right>' + result[i].a.curation_rewards + '</td>';
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
