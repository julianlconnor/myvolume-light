define(['app/init', 'app/songstable.view', 'app/workspace'], function() {
    myvolume.views.Songs = Backbone.View.extend({
        initialize: function(chartId) {
             _.bindAll(this,
                 'render',
                 'fadeIn');
             this.view = new myvolume.views.SongsTable();
             this.view.on('ready', this.fadeIn);
        },

        render: function(id) {
            myvolume.routers.workspace.navigate('charts/' + id);
            this.$el.empty();
            this.view.render(id);
            return this;
        },

        fadeIn: function() {
            this.$el.html(this.view.el);
            return this;
        }
        
    });
});
