function addA(source,target){
  var texts = [ '[1 day]', '[1 week]', '[1 month]', '[3 months]', '[1 year]' ].reverse();
  var hrefs = [ '?span=day', '?span=week', '?span=month', '?span=3months', '?span=year' ].reverse();
  texts.forEach(function( elem, index ) {
    let a = document.createElement('a');
    a.text = texts[index];
    a.href = hrefs[index]+'&source='+source+'&target='+target;;
    document.body.prepend(a);
  });
}
