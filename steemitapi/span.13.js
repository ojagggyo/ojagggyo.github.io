function addA(source,target){
  var texts = [ '[1 day]', '[3 day]', '[1 week]', '[1 month]', '[3 months]', '[1 year]', '[3 years]' ].reverse();
  var hrefs = [ '?span=day', '?span=3days', '?span=week', '?span=month', '?span=3months', '?span=year', '?span=3years' ].reverse();
  texts.forEach(function( elem, index ) {
    let a = document.createElement('a');
    a.text = texts[index];
    a.href = hrefs[index]+'&source='+source+'&target='+target;;
    document.body.prepend(a);
  });
  let a = document.createElement('a');
  a.text = 'within ';
  document.body.prepend(a);  

  let root = document.documentElement; //htmlのルート要素を取得
  root.style.fontFamily = 'Meiryo';
  
//let root = document.documentElement; //htmlのルート要素を取得
//let style = window.getComputedStyle(root).getPropertyValue('font-family');
//let size = window.getComputedStyle(root).getPropertyValue('font-size');
//alert(style);
//alert(size);
//root.style.fontFamily = '"Lato';
}
