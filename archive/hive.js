let username;
function saveUserName(){
    username = window.location.hash;// #username
    if (username == null || username.trim().length == 0){
        username = "#steemitblog";
    }

    username = username.substr(1);//#を取る
    username = decodeURI(username).trim();//デコード、トリム
    
    bbb = $("body").html().replace(/yasu/g, username)
    $("body").html(bbb);
}

window.onload = function() {
    saveUserName();

};
