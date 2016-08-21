/**
 * Created by lancao on 16/8/20.
 */
require.config({
    paths:{
        jquery:'jquery-1.8.3.min'
    }
}
);

require(['jquery','window'],function($, w){
    $('#a').click(function(){
       new w.Window().alert('welcome',function(){
           alert('you click the button');
       },{
           width:300,
           height:200,
           y:40
       });
    //    cfg传字典格式的数据
    });
})






