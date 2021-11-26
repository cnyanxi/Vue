//二维码
function showweixin(obj) {
    var imgweixin = document.getElementById("weixinimg");
    if (imgweixin.src = obj.src) {
        imgweixin.src = "./image/weixinerweima.png";
    }
    imgweixin.style.display = "";
    imgweixin.style.position = "absolute";
    imgweixin.style.width ="200px"
    imgweixin.style.height ="200px"
  
}
function hideweixin() {
    document.getElementById("weixinimg").style.display = "none";
}
function showQQ(obj) {
    var imgQQ = document.getElementById("QQimg");
    if (imgQQ.src = obj.src) {
        imgQQ.src = "./image/qqerweima.png";
    }
    imgQQ.style.display = "";
    imgQQ.style.position = "absolute";
    imgQQ.style.width ="180px"
    imgQQ.style.height ="180px"
}function hideQQ() {
    document.getElementById("QQimg").style.display = "none";
}
function showbillbill(obj) {
    var imgbillbill = document.getElementById("billbillimg");
    if (imgbillbill.src = obj.src) {
        imgbillbill.src = "./image/billbillerweima.png";
    }
    imgbillbill.style.display = "";
    imgbillbill.style.position = "absolute";
    imgbillbill.style.width ="200px"
    imgbillbill.style.height ="200px"
}function hidebillbill() {
    document.getElementById("billbillimg").style.display = "none";
}
//回到顶部按钮
    var backTop = document.getElementById("backTop");
    backTop.onclick = function(){
        window.scrollTo({ top: 0, behavior: "smooth" });
    }       
    window.onscroll = function(){
        var backTop1 = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (backTop1> 0) {
            backTop.style.display = "";
        } else {
            backTop.style.display = "none";
        }
     }
     function runningClock(){
        var clock = new Date();
        var getHours = clock.getHours();
        var getMinutes = clock.getMinutes();
        var getSeconds = clock.getSeconds();
        if(getHours<10){
            document.getElementById("getHours").innerText = "0"+ getHours ;
        }else{
            document.getElementById("getHours").innerText = getHours ;
        }
        if(getMinutes < 10){
            document.getElementById("getMinutes").innerText = "0" + getMinutes ;
        }else{
            document.getElementById("getMinutes").innerText = getMinutes ;
        }
        if(getSeconds<10){
            document.getElementById("getSeconds").innerText = "0" +  getSeconds  ;
        }else{
            document.getElementById("getSeconds").innerText = getSeconds  ;
        }
    } 
    var timer = setInterval(function(){
        runningClock();
    },1000);

