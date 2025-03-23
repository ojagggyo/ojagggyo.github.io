steem.api.setOptions({url: 'https://api.steememory.com'});

async function main_0(source, target, span){
    console.log('source=', source);
    console.log('target=', target);
    console.log('span=', span);
    
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    let group = '';
    let to  = new Date();
    let from  = new Date();
    if (span == 'day'){
        from.setDate(from.getDate() - 1);//1日
        group = 'hour';
    } else if (span == 'week'){
        from.setDate(from.getDate() - 7);//7日
        group = 'hour';
    } else if (span == 'month'){
        from.setDate(from.getDate() - 30);//30日
        group = 'day';
    }
    console.log('from=', from);
    console.log('group=', group);
   
    fetch("https://steememory.com/rate2/?source=" + source + "&target=" + target + "&from=" + from.toISOString() + "&to=" + to.toISOString() + "&group=" + group, requestOptions)
      .then(
          (response) => response.text())
      .then(
          (result) => {
            //console.log(result);
            //チャート更新
            let objData = JSON.parse(result);
            for (var i = objData.length - 1; 0 <= i; i--) {
                let time = objData[i].time;
                let rate = objData[i].rate;
                labels.push(new Date(time).toLocaleString().slice(5,-3));
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
    let span = new URL(window.location.href).searchParams.get('span') ?? 'day';//week month
    let interval = new URL(window.location.href).searchParams.get('interval') ?? 3;
    main_0(source, target, span);
    setInterval(function () {
        main(source, target);
    }, interval * 60 * 1000);


    myChart.defaults.plugins.title = source + target + ' rate (' + span + ')';
    myChart.update();
};

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
