async function Sample(error) {
    if(error){
        // throwしているため、この値がrejectされる
        throw new Error('★Error★');
    }
    else{
        // returnしているため、この値がresolveされる
        return '★Success★';
    }   
}

Sample(true)
    .then(value => {
        console.log(value);
        $("#Sample1").text(value);
    })
    .catch(err => {
        console.log(err);
        $("#Sample1").text(err);
        $('#Sample1').css('color','red');
    });

Sample(false)
    .then(value => {
        console.log(value);
        $("#Sample2").text(value);
    })
    .catch(err => {
        console.log(err);
        $("#Sample2").text(err);
        $('#Sample2').css('color','red');
    });
