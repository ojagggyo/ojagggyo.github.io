let username;
function saveUserName(){
    username = window.location.hash;// #username
    if (username == null || username.trim().length == 0){
        username = "#steemitblog";
    }

    username = username.substr(1);//#を取る
    username = decodeURI(username).trim();//デコード、トリム
    
}

var log = function(){
    bbb = $("body").html().replace(/@/g, '@'+username)
    bbb = bbb.replace(/a=/g, 'a='+username)
    $("body").html(bbb);
};


window.onload = function() {
    saveUserName();
    setTimeout(log, 1000);
};
