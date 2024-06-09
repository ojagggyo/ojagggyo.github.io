steem.api.setOptions({url: 'https://api.steememory.com'});

async function main(){
    let a = await steem.api.getDynamicGlobalPropertiesAsync();
    let current_sbd_supply = parseFloat(a.current_sbd_supply);
    console.log(current_sbd_supply);
    $("#current_sbd_supply").text(current_sbd_supply);
    let virtual_supply = parseFloat(a.virtual_supply);
    console.log(virtual_supply);
    $("#virtual_supply").text(virtual_supply);
    let b = await steem.api.getCurrentMedianHistoryPriceAsync();
    let base = parseFloat(b.base);
    let quote = parseFloat(b.quote);
    let steem_price = base / quote;
    console.log(steem_price);
    $("#steem_price").text('$'+steem_price);
    let sbddebtratio = current_sbd_supply * 100 / (virtual_supply * steem_price);
    $("#text").text(sbddebtratio +'%');
    let sbd_print_rates = (sbddebtratio > 10) ? 0 : (sbddebtratio < 9) ? 100 : (10 - sbddebtratio) * 100
    $("#sbd_print_rates").text(sbd_print_rates.toFixed(1) +'%');
    document.querySelector("#progress").value = sbd_print_rates;
    //チャート更新
    labels.push(new Date().toLocaleString());
    datas.push(sbd_print_rates.toFixed(1) );
    myChart.update();
}

window.onload = function() {
    setInterval(function () {
        main();
    }, 3000);
};

let labels = [];
let datas = [];
const data = {
labels: labels,
datasets: [{
    label: 'SBD Print Rates',
        backgroundColor: 'rgb(221, 51, 204)',
        borderColor: 'rgb(221, 51, 204)',
    data: datas,
    fill: true, 
    backgroundColor: 'rgba(221, 51, 204, 0.2)',
}]
};
// === include 'setup' then 'config' above ===
const config = {
type: 'line',
data: data,
};
