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

(async function(flag) {
    try {
        var result = await Sample(flag);
        $("#Sample1").text(result);  
    } catch (error) {
        $("#Sample1").text(error);
        $('#Sample1').css('color','red');
    }
})(true);

(async function(flag) {
    try {
        var result = await Sample(flag);
        $("#Sample2").text(result);  
    } catch (error) {
        $("#Sample2").text(error);
        $('#Sample2').css('color','red');
    }
})(false);
