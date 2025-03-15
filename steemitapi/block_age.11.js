steem.api.setOptions({url: 'https://api.steememory.com'});

async function main(){
    let witness = await steem.api.getWitnessByAccountAsync("yasu.witness");
    console.log(witness);
    let blockNum = witness.last_confirmed_block_num;
    console.log(blockNum);
    
    //let block =  await steem.api.getBlockAsync(blockNum);
    //console.log(block);
    //timestamp = block.timestamp;
    //console.log(timestamp);

    let blockHeader = await steem.api.getBlockHeaderAsync(blockNum);
    console.log(blockHeader);
    let timestamp = blockHeader.timestamp;
    console.log(timestamp);

    diff =  (new Date() - new Date(timestamp+"Z")) / 1000 / 3600;
    
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
    label: 'Block Age',
        backgroundColor: 'rgb(51, 221, 204)',
        borderColor: 'rgb(51, 221, 204)',
    data: datas,
    fill: true, 
    backgroundColor: 'rgba(51, 221, 204, 0.2)',
}]
};
// === include 'setup' then 'config' above ===
const config = {
    type: 'line',
    data: data,
};
