/**
 * Created by lancao on 16/8/20.
 */
define(function(){
    //定义window模块 设计下接口 暴露window类
    function Window(){
        //字典格式 cfg
        this.cfg={
            width:500,
            height:300,
            content:'hello',
            handler:null
        }
    }

    Window.prototype={
        alert:function(cfg){
            //jquery的extend方法 比较合并
            var CFG= $.extend(this.cfg,cfg);

            var boundbox=$('<div class="window_boundingBox"></div>');
            boundbox.appendTo('body');
            boundbox.html(CFG.content);

            var btn=$('<input type="button" value="确定">');
            btn.appendTo(boundbox);
            btn.click(function(){
                CFG.handler && CFG.handler();
                boundbox.remove();
            });

            boundbox.css({
                width:CFG.width+'px',
                height:CFG.height+'px',
                left:(CFG.x||(window.innerWidth-CFG.width)/2)+'px',
                top:(CFG.y||(window.innerHeight-CFG.height)/2)+'px'
            })
            console.log(window.innerWidth,CFG.width);
        },
        confirm:function(){

        },
        prompt:function(){

        }
    }

    return {
        Window:Window
    }



})






