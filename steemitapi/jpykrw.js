steem.api.setOptions({url: 'https://api.steememory.com'});

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
    main();
    setInterval(function () {
        main();
    }, 60*1000);
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
