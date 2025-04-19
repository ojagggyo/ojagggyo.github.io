steem.api.setOptions({url: 'https://api.steememory.com'});

async function main_0(source, target, span, group){
   
    fetch("https://steememory.com/rate2/?source=" + source + "&target=" + target + "&from=" + from.toISOString() + "&to=" + to.toISOString() + "&group=" + group, requestOptions)
      .then(
          (response) => response.text())
      .then(
          (result) => {
            //console.log(result);
            //チャート更新
            let objData = JSON.parse(result);
            //let before_year = 0;
            for (var i = objData.length - 1; 0 <= i; i--) {
                let time = objData[i].time;
                let rate = objData[i].rate;
                let timeDate = new Date(time);
                let label = timeDate.toLocaleString().slice(0,-3);
                labels.push(label);
                datas.push(rate);
            }
            myChart.update();
          }
      )
      .catch((error) => console.error(error));
}

async function main(source, target){
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("https://steememory.com/rate/?source=" + source + "&target=" + target, requestOptions)
      .then(
          (response) => response.text())
      .then(
          (result) => {
              console.log(result);
              //チャート更新
             labels.push(new Date().toLocaleString());
             datas.push(result);
             myChart.update();
      }
      )
      .catch((error) => console.error(error));
}

window.onload = function() {
    let source = new URL(window.location.href).searchParams.get('source') ?? 'JPY';
    let target = new URL(window.location.href).searchParams.get('target') ?? 'KRW';
    let group = new URL(window.location.href).searchParams.get('group');
    let span = new URL(window.location.href).searchParams.get('span') ?? 'day';//week or month
    let interval = new URL(window.location.href).searchParams.get('interval') ?? 3;
    main_0(source, target, span, group);
    //setInterval(function () {
    //    main(source, target);
    //}, interval * 60 * 1000);
 ;

let labels = [];
let datas = [];
const data = {
labels: labels,
datasets: [{
    label: 'rate',
        backgroundColor: 'rgb(204, 51, 221)',
        borderColor: 'rgb(204, 51, 221)',
    data: datas,
    fill: true, 
    backgroundColor: 'rgba(204, 51, 221, 0.2)',
}]
};
// === include 'setup' then 'config' above ===
const config = {
    type: 'line',
    data: data,
};
