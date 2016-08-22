/**
 * Created by lancao on 16/8/20.
 */
define(function(){
    //定义window模块 设计下接口 暴露window类
    function Window(){

    }

    Window.prototype={
        alert:function(content){
            var boundbox=$('<div class="window_boundingBox"></div>');
            boundbox.appendTo('body');
            boundbox.html(content);
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






