var Wichtel = {
    Models: {},
    Collections: {},
    Views: {}
};

(function($){
    /*
     * Model definitions
     */
    Wichtel.Models.User = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot:'/api/user'
    });

    Wichtel.Models.Event = Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
            participantIds: []
        }
    });

    /*
     * Collection Model definitions
     */
    Wichtel.Collections.User = Backbone.Collection.extend({
        model: Wichtel.Models.User,
        url: '/api/user',

        initialize: function() {
            this.on('remove', this.hideModel);
        },
        hideModel: function() {
            this.model.trigger('hide');
        }
    });

    Wichtel.Collections.Event = Backbone.Collection.extend({
        model: Wichtel.Models.Event,
        url: '/api/event'
    });

    /*
     * Single Element View definitions
     */
    Wichtel.Views.TinyUserView = Backbone.View.extend({
        tagName: 'li',
        className: 'list-group-item',
        template: Handlebars.compile('{{ firstname }} <em>({{ nickname }})</em> {{ lastname }}'),

        initialize: function(){
            this.model.on('change', this.render, this);
            this.model.on('hide', this.remove, this);
        },
        render: function() {
            var attributes = this.model.toJSON();
            this.$el.html(this.template(attributes));
            return this;
        }
    });

    Wichtel.Views.TinyEventView = Backbone.View.extend({
        template: Handlebars.compile($('#event_list_item_template').html()),
        events: {
            'click li.main' : 'toggleButtonBar',
            'click span.add': 'addEvent',
            'click span.edit': 'editEvent',
            'click span.delete': 'deleteEvent'
        },

        initialize: function() {
            this.model.on('change', this.render, this);
            this.model.on('hide', this.remove, this);
            this.model.on('destroy', this.remove, this);
        },
        render: function() {
            var attributes = this.model.toJSON();
            attributes.numParticipants = attributes.participantIds.length;
            this.$el.append(this.template(attributes));
            return this;
        },
        toggleButtonBar: function(event){
            event.preventDefault();
            $('.togglable').toggleClass('hidden');
        },
        showEditDialog: function(the_model) {
            this.eventEditView = new Wichtel.Views.EventEditView({model: the_model});
            this.containerDiv = $('#event_edit_view');
            this.containerDiv.empty();
            this.containerDiv.append(this.eventEditView.render().el);
            $('#event_edit').modal();
        },
        addEvent: function() {
            this.showEditDialog(new Wichtel.Models.Event());
        },
        editEvent: function() {
            this.showEditDialog(this.model);
        },
        deleteEvent: function() {
            this.model.destroy();
        }
    });

    Wichtel.Views.EventEditView = Backbone.View.extend({
        template: Handlebars.compile($('#edit_event_template').html()),
        events: {
            "focusout input" : "updateModel",
            "click button[data-backbone-save]" : "saveModel"
        },

        updateModel: function(e) {
            var attributeName=$(e.currentTarget).attr('name');
            var attributeValue=$(e.currentTarget).val();
            this.modelAttribute = this.modelAttribute || {};
            this.modelAttribute[attributeName] = attributeValue;
        },
        saveModel: function() {
            if (!this.model.id) {
                Wichtel.events.add(this.model);
            }
            this.model.save(this.modelAttribute, {success: function(){
                $("#event_edit").modal('hide');
            }});
        },
        render: function() {
            var attribtues = this.model.toJSON();
            this.$el.html(this.template(attribtues));
            return this;
        }
    });

    /*
     * Collection View definitions
     */
    Wichtel.Views.UserList = Backbone.View.extend({
        tagName: 'ul',
        className: 'list-group',

        initialize: function(){
            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.addAll, this);
            this.collection.on('fetch', this.addAll, this);
        },
        addAll: function(){
            this.collection.forEach(this.addOne, this);
        },
        addOne: function(user) {
            var userView = new Wichtel.Views.TinyUserView({model: user});
            this.$el.append(userView.render().el);
        },
        render: function(){
            this.addAll();
        }
    });

    Wichtel.Views.EventList = Backbone.View.extend({
        initialize: function() {
            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.addAll, this);
            this.collection.on('fetch', this.addAll, this);
        },
        addAll: function() {
            this.collection.forEach(this.addOne, this);
        },
        addOne: function (event) {
            var eventView = new Wichtel.Views.TinyEventView({model: event, el: this.$el});
            this.$el.append(eventView.render().el);
        },
        render: function () {
            this.addAll();
        }

    });


    /*
     * Router definitions
     */
    var AppRouter = Backbone.Router.extend({
        routes: {"/home" : 'index'},
        initialize: function() {
            Wichtel.users = new Wichtel.Collections.User();
            Wichtel.events = new Wichtel.Collections.Event();

            this.userListView = new Wichtel.Views.UserList({collection: Wichtel.users});
            this.eventListView = new Wichtel.Views.EventList({collection: Wichtel.events, el: $('#event_list')});

            $('#my_friends').append(this.userListView.el);
            $('#my_events').append(this.eventListView.el);
        },
        start: function() {
            Backbone.history.start({pushState: true});
        },
        index: function() {
            Wichtel.users.fetch();
            Wichtel.events.fetch();
        }
    });

    var app = new AppRouter();
    app.start();
    app.index();
    Wichtel.me = new Wichtel.Models.User({userId: "me"});
    Wichtel.me.fetch();

})(jQuery)