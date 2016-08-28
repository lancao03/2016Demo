/**
 * Created by lancao on 16/8/20.
 */
require.config({
    paths:{
        jquery:'jquery-1.8.3.min',
        jqueryUI:'jquery-ui.min'
    }
}
);
//PS:应用层

//给关闭按钮增加回调函数
require(['jquery','window'],function($, w){
    $('#a').click(function(){
        var win=new w.Window();
        win.alert({
            title:'自定义标题',
            content:'hello word',
            hasCloseBtn:true,
            handler4AlertBtn:function(){
                alert('alert button');
            },
            handler4CloseBtn:function(){
                alert('close button');
            },
            dragHandle:'.window_header',
            text4AlertBtn:'自定义按钮',
            skinClassName:'red_wrap',
            hasMask:true,
            width:300,
            height:200,
            y:50
        });
        win.on('alert',function(){
            alert('second alert handler');

        });
        win.on('alert',function(){
           alert('third alert handler');
        });
        win.on('close',function(){
            alert('second close handler');
        })

    //    cfg传字典格式的数据
    });
})






