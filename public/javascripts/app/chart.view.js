define(['app/init'], function() {
    myvolume.views.Chart = Backbone.View.extend({
        tagName: 'div',
        className: 'chart clearfix',

        template : _.template($('#chart-item-template').html()),
        templateGenre : _.template($('#genre-item-template').html()),

        events: {
            "click .top-wrapper" : "triggerClicked"
        },
        
        initialize: function() {
            console.log("ChartItemView::Init");
            _.bindAll(this,
                'render',
                'triggerClicked',
                'showSpinner',
                'hideSpinner');

            this.model.on('activate', this.activate);
            this.model.on('deactivate', this.deactivate);

            this.songs = new myvolume.views.Songs();

            this.songs.on('fetching', this.showSpinner);
            this.songs.on('done', this.hideSpinner);
        },
     
        render: function() {
            console.log("ChartItemView::Render", this.model.attributes);

            this.$el.addClass(this.model.get('id')).attr('title', this.model.get('name')).html(this.template(this.model.toJSON()));
            
            var genres = this.model.get('genres');
            var node = this.$el.find(".genres");
            for (var i = 0; i < genres.length; i++) {
                node.append(this.templateGenre({ name: genres[i].name }));
            }
            
            return this;
        },

        triggerClicked: function(evt) {
            var songs_el = this.$('.songs');



            if ( songs_el.is(':visible') )
                songs_el.slideUp();
            else {
                songs_el.fadeIn();
                songs_el.htmlFadeIn(this.songs.render(this.model.get('id')).el);
            }

            this.trigger('chart:clicked', this.model);
        },

        showSpinner: function() {
            console.log('showSPinner');
            this.$('.overlay').fadeIn();
        },
        hideSpinner: function() {
            console.log('hideSPinner');
            this.$('.overlay').fadeOut();
        }

    });
});
