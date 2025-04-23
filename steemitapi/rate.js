steem.api.setOptions({url: 'https://api.steememory.com'});

async function main_0(source, target, span, group){
    console.log('source=', source);
    console.log('target=', target);
    console.log('span=', span);
    
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    let to  = new Date();
    let from  = new Date();
    switch(span){
        case 'day':
            from.setDate(from.getDate() - 1);//1日
            group = group ?? 'hour';
            break;
        case '3days':
            from.setDate(from.getDate() - 3);//1日
            group = group ?? 'hour';
            break;
        case 'week':
            from.setDate(from.getDate() - 7);//1週間
            group = group ?? 'hour';
            break;
        case 'month':
            from.setMonth(from.getMonth() - 1);//1ヶ月
            group = group ?? 'hour';
            break;
        case '3months':
            from.setMonth(from.getMonth() - 3);//3ヶ月
            group = group ?? 'hour';
            break;
        case 'year':
            from.setFullYear(from.getFullYear() - 1);//1年
            group = group ?? 'hour';
            break;
        case '3years':
            from.setFullYear(from.getFullYear() - 3);//3年
            group = group ?? 'hour';
            break;
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
    setInterval(function () {
        main(source, target);
    }, interval * 60 * 1000);

    myChart.data.datasets[0].label = source + target + ' rate (' + span + ')';
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
    options: {
        responsive: true,
        scales: {
          y: {
            grid: {
              color: function(context) {
                return (context.tick.value > 10 - 0.001 && context.tick.value < 10 + 0.001 || 
                        context.tick.value > 142 - 0.4 && context.tick.value < 142 + 0.4 ||
                        context.tick.value > 1420 - 4 && context.tick.value < 1420 + 4) ? '#FF0000' : 'rgba(0, 0, 0, 0.1)';//default color
              },
              lineWidth: function(context) {
                return (context.tick.value > 10 - 0.001 && context.tick.value < 10 + 0.001 ||
                        context.tick.value > 142 - 0.4 && context.tick.value < 142 + 0.4 ||
                        context.tick.value > 1420 - 4 && context.tick.value < 1420 + 4) ? 2 : 1;
              },
            },
          }
        }
    },
};
