window.respaurantApp = (window.respaurantApp || {});
$(function (app, $, bb) {

    app = (app || {});

    // **********

    app.ModelMenuItem = bb.Model.extend({
        defaults: {
            btnClass: '',
            glyphiconClass: ''
        }
    });

    app.ModelMenuItems = bb.Collection.extend({
        model: app.ModelMenuItem,
        defaults: {
            selection: 0
        }
    });

    app.optionsModel = _.extend({
        initialize: function () {
            this.on("select", this.showMe);
        },
            showMe: function () {
                this.trigger("showMe")
            }
        }
        , Backbone.Events);

    app.ModelAddress = bb.Model.extend(app.optionsModel);

    app.ModelOpenHour = bb.Model.extend(app.optionsModel);

    app.ModelCuisine = bb.Model.extend(app.optionsModel);

    // *****

    app.ViewMenuItems = bb.View.extend({
        el: '#detailsMenuItems',
        initialize: function () {
            this.listenTo(this.model, 'change', 'alert');
            this.listenTo(this.model, 'reset', 'render');
            this.$menuItems = this.$el;
        },
        render: function () {
            var self = this;
            var viewMenuItem;
            $.each(this.model.models, function (index, model) {
                viewMenuItem = new app.ViewMenuItem({ model: model });
                self.$menuItems.append(viewMenuItem.render().el);
            });
            return this;
        }
    });

    app.ViewMenuItem = bb.View.extend({
        tagName: 'li',
        events: {
            "click a": "ModelMenuItemClick",
        },
        template: _.template($('#detailsMenuItem').html()),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        ModelMenuItemClick: function () {
            var menuItemHookModel = new this.model.attributes.selectedModel();
            var menuItemHookView = new this.model.attributes.selectedView({ model: menuItemHookModel })
            menuItemHookModel.trigger("select");
        }
    });

    app.ViewAddress = bb.View.extend({
        el: "#hook",
        template: _.template($('#detailsAddress').html()),
        initialize: function () {
            var self = this;
            self.model.on("showMe", _.bind(self.render, self));
        },
        render: function () {
            this.model.set({ address1: "Rathausgasse 1" });
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    app.ViewOpenHour = bb.View.extend({
        el: "#hook",
        model: {},
        template: _.template($('#detailsOpenHour').html()),
        initialize: function () {
            var self = this;
            self.model.on("showMe", _.bind(self.render, self));
        },
        render: function () {
            this.model.set({});
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    app.ViewCuisine = bb.View.extend({
        el: "#hook",
        model: {},
        template: _.template($('#detailsCuisine').html()),
        initialize: function () {
            var self = this;
            self.model.on("showMe", _.bind(self.render, self));
        },
        render: function () {
            this.model.set({});
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    
}(window.respaurantApp, jQuery, Backbone));

