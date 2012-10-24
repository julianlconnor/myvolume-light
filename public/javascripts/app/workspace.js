define(['app/init', 'app/charts.view', 'app/songs.view', 'app/filters.view'], function() {
    myvolume.routers.Workspace = Backbone.Router.extend({
        routes: {
            "charts/:id"  : "renderChart",
            ""            : "renderChartsFeatured"
        },

        initialize: function() {
            _.bindAll(this, "renderChartsFeatured",
                            "renderChartsAll",
                            "playPause",
                            "prefetchImages",
                            "prefetchImage");

            myvolume.views.charts = new myvolume.views.Charts();
            /*
            * Place filters on page.
            */
            myvolume.views.filters = new myvolume.views.Filters();
            myvolume.views.filters.render();

            $(document).on("keydown", this.playPause);
            $(document).on('filter:chart:featured', this.renderChartsFeatured);
            $(document).on('filter:chart:all', this.renderChartsAll);

            this.prefetchImages();
        },

        renderChartsFeatured: function() {
            myvolume.views.charts.renderFeatured();
        },

        renderChartsAll: function() {
            myvolume.views.charts.renderAll();
        },

        renderChart: function(chart_id) {
            myvolume.views.charts.render(chart_id);
        },

        playPause: function(evt) {
            if ( evt.keyCode !== 32 ) return;

            if ( !myvolume.PLAYER ) myvolume.PLAYER = $('#jquery_jplayer_1');

            evt.preventDefault();

            if ( myvolume.PLAYER.data('jPlayer').status.paused )
                myvolume.PLAYER.jPlayer('play');
            else
                myvolume.PLAYER.jPlayer('pause');
        },

        prefetchImages: function() {
            var images = ['download.png', 'download-hover.png'];
            _.each(images, this.prefetchImage);
        },

        prefetchImage: function(image_uri) {
            console.log("[pre-f] : " + image_uri);
            var img = new Image(),
                prefix = '/images/';
            img.src = prefix + image_uri;
        }
    });
});
