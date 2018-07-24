var arr = [0,1,2,3,4,5,6,7,8,9];
for(var i = 65;i<122;i++){
    if(i>90&&i<97){
        continue;
    }
    arr.push(String.fromCharCode(i));
}
var len = arr.length;
var canvasStr = '';
var value = '';

function createCanvas(){
    
    canvasStr = '';
      value = '';
    for(var i = 0;i < 6;i++){
          var a= arr[Math.floor(Math.random() * len)] ;
          canvasStr += a + ' ';
          value += a;
    }

    var oCanvas = document.getElementById('canvasCaptcha');
    var ctx = oCanvas.getContext('2d');
    var w = oCanvas.width;  
    var h = oCanvas.height;
    var oImg = new Image();
    oImg.src = './images/bg.jpg';
    oImg.onload = function(){
        var pattern = ctx.createPattern(oImg,'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0,0,w,h);

        
        ctx.textAlign = 'center';
        ctx.fillStyle = "#ccc";
        ctx.font = '46px Roboto Slab';
        ctx.baseLine = 'middle';
        ctx.setTransform(1,-0.12,0.2,1,0,12);
        ctx.fillText(canvasStr,w/2,60);
    }
}
createCanvas();

function captcha(inputValue) {
    if(value == inputValue) {
        return true;
    }else {
        return false;
    }
}
function showResult(){
    var inputValue = $('.inputCaptcha').val();
    if(inputValue == ''|| inputValue==null ||inputValue == 'undefined'){
        $('.errorText').css({'display':'inline-block'}).html('请输入验证码!');
        $('.captchaIcon').css({display:'inline-block',backgroundImage:"url('./images/false.png')"});
        
    }else{
        var result = captcha(inputValue);
        if(result ==false){
            $('.errorText').css({'display':'inline-block'}).html('验证码错误,请重新输入!');
            $('.captchaIcon').css({display:'inline-block',backgroundImage:"url('./images/false.png')"});
            createCanvas();
        }else{
            $('.captchaIcon').css({display:'inline-block',backgroundImage: 'url("./images/true.png")'});

        }
    }
}
$('.captchaSubmit').click(showResult);
$('.refresh').click(createCanvas);
$('.inputCaptcha').focus(function(){
    $('.errorText').add($('.captchaIcon')).fadeOut(100);
})
