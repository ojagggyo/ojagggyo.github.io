

let username;
function saveUserName(){
    username = window.location.hash;// #username
    if (username == null || username.trim().length == 0){
        username = "#steemitblog";
    }

    username = username.substr(1);//#を取る
    username = decodeURI(username).trim();//デコード、トリム

alart(username);
    $("#aaa").text(username);
}

//window.onload = function() {
    alart("1");
    saveUserName();
  
//};
