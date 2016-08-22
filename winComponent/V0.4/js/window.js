/**
 * Created by lancao on 16/8/20.
 */
define(function(){
    //定义window模块 设计下接口 暴露window类
    function Window(){
        //字典格式 cfg
        this.cfg={
            width:500,
            height:300
        }
    }

    Window.prototype={
        alert:function(content,handler,cfg){
            var boundbox=$('<div class="window_boundingBox"></div>');
            boundbox.appendTo('body');
            boundbox.html(content);

            var btn=$('<input type="button" value="确定">');
            btn.appendTo(boundbox);
            btn.click(function(){
               handler && handler();
                boundbox.remove();
            });

            //jquery的extend方法 比较合并
            $.extend(this.cfg,cfg);
            boundbox.css({
                width:this.cfg.width+'px',
                height:this.cfg.height+'px',
                left:(this.cfg.x||(window.innerWidth-this.cfg.width)/2)+'px',
                top:(this.cfg.y||(window.innerHeight-this.cfg.height)/2)+'px'
            })
            console.log(window.innerWidth,this.cfg.width);
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






