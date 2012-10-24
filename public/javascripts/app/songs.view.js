define(['app/init', 'app/songstable.view', 'app/workspace'], function() {
    myvolume.views.Songs = Backbone.View.extend({
        initialize: function(chartId) {
             _.bindAll(this,
                 'render',
                 'fadeIn',
                 'fetching',
                 'done');
             this.view = new myvolume.views.SongsTable();
             this.view.on('ready', this.fadeIn);

             this.view.on('fetching', this.fetching);
             this.view.on('done', this.done);
        },

        render: function(id) {
            this.$el.empty();
            this.view.render(id);
            return this;
        },

        fadeIn: function() {
            this.$el.html(this.view.el);
            return this;
        },
        fetching: function() {
            this.trigger('fetching');
        },
        done: function() {
            this.trigger('done');
        }
        
    });
});
