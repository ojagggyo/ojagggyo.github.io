steem.api.setOptions({url: 'https://api.steememory.com'});

async function main(){
    /*
    steem.api.getWitnessByAccount("yasu.witness", function(err, result) {
      console.log(err, result);
    });
*/
    
    let a = await steem.api.getWitnessByAccountAsync("yasu.witness");
        console.log(a);
    let blockNum = a.last_confirmed_block_num;
   console.log(blockNum);


   let c =  await steem.api.getBlockAsync(blockNum);
console.log(c);
    timestamp = c.timestamp;
    console.log(timestamp);

    //let d = await steem.api.getBlockHeaderAsync(blockNum);
    //console.log(d);

    diff =  (new Date() - new Date(timestamp)) / 1000 / 60;
/*
document.querySelector("#progress").value = sbd_print_rates;

*/
    //チャート更新
    labels.push(new Date().toLocaleString());
    datas.push(diff);
    myChart.update();
}

window.onload = function() {
    main();
    setInterval(function () {
        main();
    }, 10*1000);
};

let labels = [];
let datas = [];
const data = {
labels: labels,
datasets: [{
    label: 'SBD Debt Ratio',
        backgroundColor: 'rgb(221, 51, 204)',
        borderColor: 'rgb(221, 51, 204)',
    data: datas,
    fill: true, 
    backgroundColor: 'rgba(221, 51, 204, 0.2)',
}]
};
// === include 'setup' then 'config' above ===
const config = {
    type: 'line',
    data: data,
};
