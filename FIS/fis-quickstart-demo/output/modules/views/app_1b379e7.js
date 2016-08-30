define("views/app",function(require,exports,module){var Backbone,TodoView,todos,common,AppView,$=require("jquery"),_=require("underscore");Backbone=require("backbone"),common=require("common"),TodoView=require("views/todos"),todos=require("collections/todos"),AppView=Backbone.View.extend({el:"#todoapp",statsTemplate:function(obj){{var __t,__p="";Array.prototype.join}with(obj||{})__p+='<span id="todo-count"><strong>'+(null==(__t=remaining)?"":__t)+"</strong> "+(null==(__t=1===remaining?"item":"items")?"":__t)+' left</span>\n<ul id="filters">\n    <li>\n        <a class="selected" href="#/">All</a>\n    </li>\n    <li>\n        <a href="#/active">Active</a>\n    </li>\n    <li>\n        <a href="#/completed">Completed</a>\n    </li>\n</ul>\n',completed&&(__p+='\n<button id="clear-completed">Clear completed ('+(null==(__t=completed)?"":__t)+")</button>\n"),__p+="";return __p},events:{"keypress #new-todo":"createOnEnter","click #clear-completed":"clearCompleted","click #toggle-all":"toggleAllComplete"},initialize:function(){this.allCheckbox=this.$("#toggle-all")[0],this.$input=this.$("#new-todo"),this.$footer=this.$("#footer"),this.$main=this.$("#main"),this.listenTo(todos,"add",this.addOne),this.listenTo(todos,"reset",this.addAll),this.listenTo(todos,"change:completed",this.filterOne),this.listenTo(todos,"filter",this.filterAll),this.listenTo(todos,"all",this.render),todos.fetch()},render:function(){var e=todos.completed().length,t=todos.remaining().length;todos.length?(this.$main.show(),this.$footer.show(),this.$footer.html(this.statsTemplate({completed:e,remaining:t})),this.$("#filters li a").removeClass("selected").filter('[href="#/'+(common.TodoFilter||"")+'"]').addClass("selected")):(this.$main.hide(),this.$footer.hide()),this.allCheckbox.checked=!t},addOne:function(e){var t=new TodoView({model:e});$("#todo-list").append(t.render().el)},addAll:function(){this.$("#todo-list").html(""),todos.each(this.addOne,this)},filterOne:function(e){e.trigger("visible")},filterAll:function(){todos.each(this.filterOne,this)},newAttributes:function(){return{title:this.$input.val().trim(),order:todos.nextOrder(),completed:!1}},createOnEnter:function(e){e.which===common.ENTER_KEY&&this.$input.val().trim()&&(todos.create(this.newAttributes()),this.$input.val(""))},clearCompleted:function(){return _.invoke(todos.completed(),"destroy"),!1},toggleAllComplete:function(){var e=this.allCheckbox.checked;todos.each(function(t){t.save({completed:e})})}}),module.exports=AppView});