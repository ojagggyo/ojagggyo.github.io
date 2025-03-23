steem.api.setOptions({url: 'https://api.steememory.com'});

async function main_0(span){
    console.log('span=',span);
    
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    let group = '';
    let to  = new Date();
    let from  = new Date();
    if (span == 'day'){
        from.setMinutes(from.getMinutes() - 24 * 60);//1日
        group = 'minute';
    } else if (span == 'week'){
        from.setMinutes(from.getDate() - 7);//7日
        group = 'day';
    }
    console.log('from=',from);
    console.log('group=',group);
   
    fetch("https://steememory.com/rate2/?source=JPY&target=KRW&from=" + from.toISOString() + "&to=" + to.toISOString() + "&group=" + group, requestOptions)
      .then(
          (response) => response.text())
      .then(
          (result) => {
            //console.log(result);
            //チャート更新
            let objData = JSON.parse(result);
            //console.log(objData);
            //console.log(objData.length);
            for (var i = objData.length - 1; 0 <= i; i--) {
                let time = objData[i].time;
                let rate = objData[i].rate;
                //console.log(time);
                //console.log(rate);
                labels.push(new Date(time).toLocaleString().slice(5,-3));
                datas.push(rate);
            }
            myChart.update();
          }
      )
      .catch((error) => console.error(error));
}

async function main(){
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("https://steememory.com/rate/?source=JPY&target=KRW", requestOptions)
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
    let span = new URL(window.location.href).searchParams.get('span') ?? 'day';//week month
    let interval = new URL(window.location.href).searchParams.get('interval') ?? 3;
    //let group = new URL(window.location.href).searchParams.get('group') ?? 'minute';
    //console.log(span);
    main_0(span);
    setInterval(function () {
        main();
    }, interval * 60 * 1000);
};

let labels = [];
let datas = [];
const data = {
labels: labels,
datasets: [{
    label: 'JPYKRW rate',
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
