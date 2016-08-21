/**
 * Created by lancao on 16/8/20.
 */
//PS:增加遮罩默认值
define(function(){
    //定义window模块 设计下接口 暴露window类
    function Window(){
        //字典格式 cfg
        this.cfg={
            width:500,
            height:300,
            content:'hello',
            title:'这里是标题',
            hasCloseBtn:false,
            handler4AlertBtn:null,
            handler4CloseBtn:null,
            text4AlertBtn:"确定",
            hasMask:false,
            skinClassName:null
        }
    }

    Window.prototype={
        alert:function(cfg){
            //jquery的extend方法 比较合并
            var CFG= $.extend(this.cfg,cfg);

            var boundbox=$('<div class="window_boundingBox">' +
                '<div class="window_header">'+CFG.title+'</div>' +
                '<div class="window_content">'+CFG.content+'</div>' +
                '<div class="window_footer"><input type="button" value="'
                +CFG.text4AlertBtn+'"></div>' +
                '</div>'
            );
            boundbox.appendTo('body');

            var btn=boundbox.find('.window_footer input');
            btn.click(function(){
                CFG.handler4AlertBtn && CFG.handler4AlertBtn();
                boundbox.remove();
            });

            boundbox.css({
                width:CFG.width+'px',
                height:CFG.height+'px',
                left:(CFG.x||(window.innerWidth-CFG.width)/2)+'px',
                top:(CFG.y||(window.innerHeight-CFG.height)/2)+'px'
            })

            //是否有关闭按钮
            if(CFG.hasCloseBtn){
                var closeBtn=$('<span class="window_closeBtn">X</span>');
                closeBtn.appendTo(boundbox);
                closeBtn.click(function(){
                    CFG.handler4CloseBtn && CFG.handler4CloseBtn();
                   boundbox.remove();
                });
            }

            //是否有自定义皮肤
            if(CFG.skinClassName){
                boundbox.addClass(CFG.skinClassName);

            }

            //是否为模态窗口 是否要为其增加这招
            if(CFG.hasMask){
                var mask=$('<div class="window_mask"></div>');
                mask.appendTo('body');
            }



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






