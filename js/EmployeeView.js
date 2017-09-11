var EmployeeView = function(employee) {

    this.initialize = function() {
        this.el = $('<div/>');
    };

    this.render = function() {
        this.el.html(EmployeeView.template(employee));
        return this;
    };

    this.initialize();

 }

Handlebars.registerHelper('token', function(block) {    
    return token; //just return global variable value 
 });
EmployeeView.template = Handlebars.compile($("#employee-tpl").html());
