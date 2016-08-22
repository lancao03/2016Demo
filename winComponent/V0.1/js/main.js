/**
 * Created by lancao on 16/8/20.
 */
require.config({
    paths:{
        jquery:'jquery-1.8.3.min.js'
    }
}
);

require(['jquery','window'],function($, w){
    $('#a').click(function(){
       new w.Window().alert('welcome');
    });
})


//应用层new一个window的实例
require(['window'],function(w){
    new w.Window().alert();
})



