window.respaurantApp = (window.respaurantApp || {});
$(function (app, $, bb) {

    app = (app || {});

    // **********

    app.ModelMenuItem = bb.Model.extend({
        defaults: {
            btnClass: '',
            glyphiconClass: ''
        },
        initialize: function () {
            var self = this;
            self.listenTo(self.attributes.collectionRespaurant,'UpdatePointer', self.rebuildModel);
        },
        rebuildModel: function () {
            alert("oooops, model needs to be rebuilt");
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

    app.ModelRespaurant = bb.Model.extend({});

    app.CollectionRespaurant = bb.Collection.extend({
        defaults:
            [
                { address1: "Rathausplatz 1"},
                { address1: "Rathausplatz 10" },
                { address1: "Rathausplatz 20" },
                { address1: "Rathausplatz 30" },
                { address1: "Rathausplatz 45" }
            ],
        pointer: 0
    })

    app.ModelAddress = bb.Model.extend(app.optionsModel);
    app.CollectionAddress = bb.Collection.extend({});

    app.ModelOpenHour = bb.Model.extend(app.optionsModel);
    app.CollectionOpenHour = bb.Collection.extend({});

    app.ModelCuisine = bb.Model.extend(app.optionsModel);
    app.CollectionCuisine = bb.Collection.extend({});

    // *****

    app.ViewMenuItems = bb.View.extend({
        el: '#detailsMenuItems',
        initialize: function () {
            var self = this;
            this.$menuItems = this.$el;
        },
        render: function () {
            var self = this;
            var viewMenuItem;
            $.each(this.collection.models, function (index, model) {
                viewMenuItem = new app.ViewMenuItem({ model: model });
                self.$menuItems.append(viewMenuItem.render().el);
            });
            return this;
        },
        updateModelPointer: function (newPointer) {
            this.model.set({ pointer: newPointer });
        }
    });

    app.ViewMenuItem = bb.View.extend({
        tagName: 'li',
        events: {
            "click a": "modelMenuItemClick",
        },
        initialize: function () {
            var self = this;
        },
        template: Handlebars.compile($('#detailsMenuItem').html()),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        modelMenuItemClick: function () {
            var menuItemHookModel;
            var menuItemHookView;
            if (!this.model.attributes.modelInstance) {
                menuItemHookModel = new this.model.attributes.selectedModel(this.model.attributes.collection.models[this.model.attributes.collectionRespaurant.pointer].attributes);
                this.model.attributes.modelInstance = menuItemHookModel;
            }
            if (! this.model.attributes.viewInstance) {

                menuItemHookView = new this.model.attributes.selectedView({ model: this.model.attributes.modelInstance });
                this.model.attributes.viewInstance = menuItemHookView;
            }
            else {

            }
            
            this.model.attributes.modelInstance.trigger("select");
        },
        triggerChange: function () {
            this.model.attributes.modelInstance = undefined;
            this.model.attributes.viewInstance = undefined;
            this.modelMenuItemClick();
        }
    });

    app.ViewAddress = bb.View.extend({
        el: "#hook",
        template: _.template($('#detailsAddress').html()),
        initialize: function () {
            var self = this;
            this.model.on("showMe", self.render, self);
            this.model.on("swipeMe", self.render, self);
        },
        render: function () {
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
            this.model.on("showMe", self.render, self);
            this.model.on("swipeMe", self.render, self);
        },
        render: function () {
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
            this.model.on("showMe", self.render, self);
            this.model.on("swipeMe", self.render, self);
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    app.ViewFooter = bb.View.extend({
        el: ".footer",
        events: {
            "click .btn-left": "swipeLeft",
            "click .btn-right": "swipeRight"
        },
        model: {},
        template: {},
        initialize: function () {
            _.bindAll(this, "render");
        },
        render: function () { },
        swipeLeft: function () {
            var respaurantPtrStepLeft = this.collection.pointer - 1;
            respaurantPtrStepLeft = (respaurantPtrStepLeft < 0) ? 0 : respaurantPtrStepLeft;
            this.collection.pointer = respaurantPtrStepLeft;
        },
        swipeRight: function () {
            var respaurantPtrStepRight = this.collection.pointer + 1;
            var numFilteredRespaurants = this.collection.length - 1;
            numFilteredRespaurants = (numFilteredRespaurants < 0) ? 0 : numFilteredRespaurants;
            respaurantPtrStepRight = (respaurantPtrStepRight > numFilteredRespaurants) ? numFilteredRespaurants : respaurantPtrStepRight;
            this.collection.pointer = respaurantPtrStepRight;
            this.collection.trigger('UpdatePointer', this.collection.pointer)
        }
    })
    
}(window.respaurantApp, jQuery, Backbone));

