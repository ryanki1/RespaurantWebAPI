window.respaurantApp = {};
$(function (app, $, bb) {


    var Model = bb.Model.extend({});
    var model = new Model({ address1: "Rathausplatz 1" });
    var View = bb.View.extend({
        el: "body",
        template: _.template("<div><%= address1 %></div>"),
        initialize: function () {
            var self = this;
            self.model.bind('change', _.bind(self.render, self));
        },
        signalChange: function () {
            this.render();
        },
        render: function () {
            $(this.el).append($(this.template(this.model.toJSON())).html());
        }
    });
    var view = new View({ model: model });
    view.render();

    model.set("address1","Rathauspltz 1");

    console.log("page loaded");

}(window.respaurantApp, jQuery, Backbone));