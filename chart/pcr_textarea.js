let myChart;

function initTextArea() {
  csv = '2021/10/1,1365.0\n
2021/10/2,1328.0\n
2021/10/3,869.0\n
2021/10/4,498.0\n
2021/10/5,1111.0\n
2021/10/6,1175.0\n
2021/10/7,912.0\n
2021/10/8,808.0\n
2021/10/9,784.0\n
2021/10/10,579.0\n
2021/10/11,283.0\n
2021/10/12,667.0\n
2021/10/13,737.0\n
2021/10/14,641.0\n
2021/10/15,517.0\n
2021/10/16,533.0\n
2021/10/17,364.0\n
2021/10/18,177.0\n
2021/10/19,367.0\n
2021/10/20,387.0\n
2021/10/21,334.0\n
2021/10/22,324.0\n
2021/10/23,277.0\n
2021/10/24,229.0\n
2021/10/25,147.0\n
2021/10/26,309.0\n
2021/10/27,310.0\n
2021/10/28,268.0\n
2021/10/29,291.0\n
2021/10/30,283.0\n
2021/10/31,215.0\n
2021/11/1,80.0'\n
  document.getElementById("text1").value = csv;
}
  
function clickBtn() {
  let t1 = document.getElementById("text1").value;
  let csv = t1.split(/\n/);//改行で分割する
  console.log(csv);

  //2次元を2個の1次元に変換する。
  var labels = [];
  var datas = [];
  for(var i=0;i<csv.length;i=i+1){
    row = csv[i].split(/,/);
    labels.push(row[0]);
    datas.push(row[1]);
  }
  console.log(labels);
  console.log(datas);

  const data = {
    labels: labels,
    datasets: [{
      label: '新規陽性者数',
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
