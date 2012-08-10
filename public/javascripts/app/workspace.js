define(['app/init', 'app/charts.view', 'app/songs.view'], function() {
    myvolume.routers.Workspace = Backbone.Router.extend({
        routes: {
            "charts/:id"  : "renderChart",
            ""            : "renderIndex"
        },

        initialize: function() {
            _.bindAll(this, "renderIndex", "renderChart", "playPause");

            myvolume.views.charts = new myvolume.views.Charts();
            $(document).on("keydown", this.playPause);
        },

        renderIndex: function() {
            myvolume.views.charts.render();
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
        }
    });
});
