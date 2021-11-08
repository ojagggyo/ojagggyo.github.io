steem.api.setOptions({url: 'https://api.steemit.com'});    

async function getAccountInfo(usernames){
  const start = performance.now();//計測用
  document.getElementById("text").innerHTML = '<tabel></tabel>';
  let accounts = await steem.api.getAccountsAsync(usernames);
  document.getElementById("progress").innerText =  accounts.length + '件';
  const end = performance.now();//計測用
  console.log(end - start);//計測用
  console.log(accounts);
  accounts.sort(function(a,b){
        if(a.curation_rewards < b.curation_rewards) return -1;
        if(a.curation_rewards > b.curation_rewards) return 1;
        return 0;
  });
  console.log(accounts)
  return accounts;
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
      html = html + '<td>' + result[i].name + '</td>';
      html = html + '<td align=right>' + result[i].curation_rewards + '</td>';
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
