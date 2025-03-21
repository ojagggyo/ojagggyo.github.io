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
    
    fetch("https://steememory.com/rate2/?source=JPY&target=KRW&from=" + from.toISOString().replaceAll("/","-") + "&to=" + to.toISOString().replaceAll("/","-") + "&group=minute", requestOptions)
      .then(
          (response) => response.text())
      .then(
          (result) => {
              console.log(result);
              //チャート更新
            // JSONへ変換
            // JavaScriptオブジェクトへ変換
            let objData = JSON.parse(result);
            console.log(objData);
              console.log(objData.length);

            for (var i = objData.length - 1; 0 <= i; i--) {
                let time = objData[i].time;
                let rate = objData[i].rate;
                console.log(time);
                 console.log(rate);
                labels.push(new Date(time).toLocaleString());
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
