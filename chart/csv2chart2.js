let myChart;

function clickBtn() {
  let t1 = document.getElementById("text1").value;
  let csv = t1.split(/\n/);//改行で分割する
  console.log(csv);

  //2次元を2個の1次元に変換する。
  let labels = [];
  let datas = [];
  let total = 0;
  for(var i=0;i<csv.length;i=i+1){
    row = csv[i].split(/,/);
    labels.push(row[0]);
    datas.push(parseFloat(row[1]) - total);
    total +=  parseFloat(row[1]);
  }
  console.log(labels);
  console.log(datas);

  const data = {
    labels: labels,
    datasets: [{
      label: '',
      backgroundColor: 'rgb(51, 221, 204)',
      borderColor: 'rgb(51, 221, 204)',
      data: datas,
    }]
  };

  // === include 'setup' then 'config' above ===
  const config = {
  type: 'bar',
    data: data,
    options: {}
  };

  if(myChart != null){
    myChart.destroy();
  }
  myChart = new Chart(
      document.getElementById('myChart'), config);
}
