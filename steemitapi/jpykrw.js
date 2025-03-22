steem.api.setOptions({url: 'https://api.steememory.com'});

async function main_0(){
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    let to  = new Date();
    let from  = new Date();
    from.setMinutes(from.getMinutes() - 24 * 60);
    //.toISOString()
    //toLocaleDateString();
    
    fetch("https://api.wise.com/v1/rates?source=JPY&target=KRW&from=" + from.toLocaleDateString() + "&to=" + to.toLocaleDateString() + "&group=minute", requestOptions)
      .then(
          (response) => response.text())
      .then(
          (result) => {
              console.log(jsonData);
              //チャート更新
            // JSONへ変換
            // JavaScriptオブジェクトへ変換
            let objData = JSON.parse(jsonData);
            console.log(objData);
              
            for (var item in objData) {
                let time = item.time;
                let rate = item.rate;

                 console.log(time);
                 console.log(rate);

                labels.push(new Date(item.time).toLocaleString());
                datas.push(item.rate);
            }

            /*for (var i = 0; i < objData.length; i++) {
                let time = objData.time[i];
                let rate = objData.rate[i];
            }*/
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
    let span = new URL(window.location.href).searchParams.get('span') ?? 3;
    console.log(span);
    main_0();
    //main();
    setInterval(function () {
        main();
    }, span * 60 * 1000);
};

let labels = [];
let datas = [];
const data = {
labels: labels,
datasets: [{
    label: 'JPYKRW rate',
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
