/**
 * Created by lancao on 16/8/20.
 */
require.config({
    paths:{
        jquery:'jquery-1.8.3.min',
        jqueryUI:'http://code.jquery.com/ui/1.10.4/jquery-ui'
    }
}
);
//PS:增加拖动把手

//给关闭按钮增加回调函数
require(['jquery','window'],function($, w){
    $('#a').click(function(){
       new w.Window().alert({
           title:'自定义标题',
           content:'hello word',
           hasCloseBtn:true,
           handler4AlertBtn:function(){
               console.log('点击了确认按钮');
           },
           handler4CloseBtn:function(){
             console.log('点击了关闭按钮');
           },
           dragHandle:'.window_header',
           text4AlertBtn:'自定义按钮',
           skinClassName:'red_wrap',
           hasMask:true,
           width:300,
           height:200,
           y:50
       });
    //    cfg传字典格式的数据
    });
})






