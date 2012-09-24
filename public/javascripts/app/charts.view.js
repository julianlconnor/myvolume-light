define(['app/init', 'app/chart.collection', 'app/chart.view'], function() {
    myvolume.views.Charts = Backbone.View.extend({
        el: '#charts',

        initialize: function() {
            console.log("ChartsView::Init");
            _.bindAll(this, "render",
                            "addAll", 
                            "addOne", 
                            "infiniteScroll",
                            "playNext");

            this.collection = new myvolume.collections.Charts();

            /* Infinite Scroll */
            $(document).on('scroll', this.infiniteScroll);

            /* Handles playlist style track ending */
            myvolume.PLAYER.on($.jPlayer.event.ended + ".repeat", this.playNext);
        },

        render: function() {
            console.log("ChartsView::Render");

            this.$el.empty();
            this.$el.html('<div class="loader"><img src="/images/ajax-loader.gif" /></div>');

            $.when(this.collection.fetch()).then(this.addAll);

            return this;
        },
        
        addAll: function(callback) {
            this.fetching = false;
            this.$el.empty();
            this.collection.each(this.addOne);


            return this;
        },

        addOne: function(chart) {
            var item = new myvolume.views.Chart({ model: chart});

            $(this.el).append(item.render().el);

            return this;
        },

        infiniteScroll: function(evt) {
            if ( this.fetching ) return;


            var scrollTop = $(document).scrollTop(),
                docHeight = $(document).height(),
                winHeight = $(window).height();

            if ( scrollTop >= docHeight - winHeight - 100 &&
                    this.collection.page < this.collection.totalPages ) {
                this.fetching = true;
                this.$el.append('<div class="infinite_loader"><img src="/images/ajax-loader.gif" /></div>');
                $.when(this.collection.fetch({add: true})).then(this.addAll);
            }
        },

        playNext: function() {
          /*
          * Play next track from currently playing.
          *
          * If it's the last track in a collection, this will wrap
          * to the first track. Super ghetto but awesome lol
          *
          */
          var playing = this.$('tr.playing'),
              next_track = playing.next();

          if ( next_track.length === 0 ) 
            next_track = this.$('tr:first-child', playing.parent());

          next_track.click();
        }
       
    });
});
