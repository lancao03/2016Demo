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
            handler:null,
            title:'这里是标题'
        }
    }

    Window.prototype={
        alert:function(cfg){
            //jquery的extend方法 比较合并
            var CFG= $.extend(this.cfg,cfg);

            var boundbox=$('<div class="window_boundingBox">' +
                '<div class="window_header">'+CFG.title+'</div>' +
                '<div class="window_content">'+CFG.content+'</div>' +
                '<div class="window_footer"><input type="button" value="确定"></div>' +
                '</div>'
            );
            boundbox.appendTo('body');

            var btn=boundbox.find('.window_footer input');
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






