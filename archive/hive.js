let username;
function saveUserName(){
    username = window.location.hash;// #username
    if (username == null || username.trim().length == 0){
        username = "#steemitblog";
    }

    username = username.substr(1);//#を取る
    username = decodeURI(username).trim();//デコード、トリム

    //$("#aaa").text(username);
    $("#aaa").text(username);

    bbb = replaced = $("#bbb").replace('@', '@'+username)
    
    alert(bbb);
    $("#bbb").text(bbb);
}

window.onload = function() {
    saveUserName();
};
