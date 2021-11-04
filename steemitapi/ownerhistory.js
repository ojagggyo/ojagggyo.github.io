steem.api.setOptions({url: 'https://api.steemit.com'});    

async function getOwnerHistoryAsync(accountname){  
  let ownerHistory = await steem.api.getOwnerHistoryAsync(accountname);
  console.log('☆☆');
  console.log(ownerHistory);
  return ownerHistory;
}

async function getOwnerHistoryAsync2(accountnames){
  let data =[];
  
  for(var i=0;i<accountnames.length;i=i+1){
    let ownerHistory = await steem.api.getOwnerHistoryAsync(accountnames[i]);
    console.log('☆☆');
    data.push({'n':accountnames[i],'v':ownerHistory}); 
  }
  
  console.log(data);
  return data;
}

/*
function createtable(accountname){
    getOwnerHistoryAsync(csv[i]).then(result => {
      console.log('★★');
      console.log(result);
      //console.log(result[0].last_valid_time);
      //console.log(result[0].previous_owner_authority);
      //console.log(result[0].previous_owner_authority.key_auths);
      //console.log(result[0].previous_owner_authority.key_auths.length);
      //onsole.log(result[0].previous_owner_authority.key_auths[0]);
    }).catch(err => {
    }); 
  }
}
*/


function clickBtn() {
  let t1 = document.getElementById("text1").value;
  let csv = t1.split(/\n/);//改行で分割する
  
  getOwnerHistoryAsync2(csv).then(result => {
     console.log('★');
    console.log(result);
    html = '<table>';
    for(var i=0;i<result.length;i=i+1){
      html = html + '<tr>';
      html = html + '<th>';
      html = html + csv[i];
      html = html + '</th>';
      html = html + '<td>';
      html = html + result[i].v.last_valid_time;
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
