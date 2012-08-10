define(['app/init', 'lib/jplayer', 'lib/jquery.jplayer.min'], function() {
    myvolume.views.SongRow = Backbone.View.extend({
        tagName: 'tr',
        
        events: {
          "click" : "play",
          "click .download" : "openTab"
        },

        template: _.template($('#song-item-template').html()),
        templateGenre: _.template($('#genre-item-template').html()),

        initialize: function() {
            console.log("ChartItemView::Init");

            _.bindAll(this, 'render', 'play', 'openTab', 'generateLink');
            this.model.bind('change', this.render);
        },
     
        render: function() {
            console.log("ChartItemView::Render", this.model);

            $(this.el).html(this.template(this.model.toJSON()));
            
            //TODO: Add Genres
            var genre = this.model.get('genres')[0].name;
            var node = this.$(".genre");
            node.append(this.templateGenre({ name: genre }));

            return this;
        },

        play: function() {
            var sample_url = this.model.get('sampleUrl');
          
            $(".playing").removeClass("playing");
            $(this.el).addClass("playing");

            $("#jquery_jplayer_1").jPlayer("setMedia", {
              mp3: sample_url
            }).jPlayer("play");
        },

        openTab: function(evt) {
            window.open(this.generateLink(), '_blank');
            evt.stopPropagation();
        },

        generateLink: function() {
            var link = myvolume.DL_ROOT + this.model.get('name').replace(' ','+');
            if ( this.model.get('mixName') === "Original Mix" )
              link += "+" + this.model.get('artists')[0].name.replace(' ','+');
            else
              link += "+" + this.model.get('mixName').replace(' ','+');

            return link;
        }

    });
});
