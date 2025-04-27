function addA(){
  var texts = [ '[1 day]', '[1 week]', '[1 month]' ].reverse();
  var hrefs = [ '?span=day', '?span=week', '?span=month' ].reverse();
  texts.forEach(function( elem, index ) {
    let a = document.createElement('a');
    a.text = texts[index];
    a.href = hrefs[index];
    document.body.prepend(a);
  });
}
