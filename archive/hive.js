let username;
function saveUserName(){
    username = window.location.hash;// #username
    if (username == null || username.trim().length == 0){
        username = "#steemitblog";
    }

    username = username.substr(1);//#を取る
    username = decodeURI(username).trim();//デコード、トリム

    alert(username);
    $("#aaa").text(username);
}

window.onload = function() {
    alert("1");
    saveUserName();
};
