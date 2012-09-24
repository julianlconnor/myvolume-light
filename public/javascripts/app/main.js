define(['app/init', 'app/workspace'], function() {
            var attrs = {
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: "http://geo-samples.beatport.com/items/volumes/volume1/items/2000000/600000/70000/6000/300/80/2676381.LOFI.mp3"
                    });
                },
                ended: function (event) {
                    $(this).jPlayer("play");
                },
                swfPath: "js",
                supplied: "mp3"
            };

            console.log("myvolume.player", myvolume.PLAYER);
            myvolume.PLAYER = $('#jquery_jplayer_1');
            myvolume.PLAYER.jPlayer(attrs);
		
            /* This starts the backbone app */
            myvolume.routers.workspace = new myvolume.routers.Workspace();
            Backbone.history.start();
        }
);

