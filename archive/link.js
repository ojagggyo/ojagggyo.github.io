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
    bbb = $("tbody").html().replace(/@/g, '@'+username);
    bbb = bbb.replace(/a=/g, 'a='+username);
    bbb = bbb.replace(/steemworld.org/g, 'steemworld.org/@'+username);
    bbb = bbb.replace(/steemscan.com/g, 'steemscan.com/account/'+username);
    bbb = bbb.replace(/steemdb.io/g, 'steemdb.io/@'+username);
   
    $("tbody").html(bbb);
};

window.onload = function() {
    saveUserName();
    setTimeout(log, 0);
};
