define("models/todo",function(e,t,o){var d=e("backbone"),l=d.Model.extend({defaults:{title:"",completed:!1},toggle:function(){this.save({completed:!this.get("completed")})}});o.exports=l});