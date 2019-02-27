//请求函数封装
let commonfun = {
    request : (url,data,callback,failfun)=>{
        $.ajax({
        url:url,
        type:"post",
        data:data,
        dataType:"json",
        success:(data)=>{
            callback(data)
        },
        fail:(err)=>{
            failfun(err)
        }
        })
    }
}


// status状态码:
// 0(成功提示) 
// 1(错误提示) 
//例： tipObj.setErrmsg('请输入评论内容',1);
let tipObj={
    setErrmsg:(cont,status)=>{

        let colors = '#3BCD86';
        if(status == 0){
           colors = "#3BCD86"
        }else{
            colors="#EA6F5A"
        }
       let str = '<div class="noty_message" style="background: #fff;border: 1px solid '+colors+';'+
       'color: '+colors+';top:0;left:50%;transform: translate(-50%, 0%);'+
       'font-size: 13px;line-height: 16px;height:16px;text-align: center;padding: 10px 100px;'+
       'width: auto;position: fixed;font-weight: bold;border-radius: 4px;">'+
        '<span class="noty_text">'+cont+'</span></div>';
        $('body').append(str);
        setTimeout(function(){
            const element =  document.querySelector('.noty_message')
            element.classList.add('animated', 'fadeOutUp')
            element.addEventListener('animationend', function() {
                 $('.noty_message').remove();
            })
        },1500)
    }
}
   
