define(['app/init', 'app/song.model'], function() {
    myvolume.collections.Songs = Backbone.Collection.extend({
        model: myvolume.models.Song,
        initialize: function() {
            _.bindAll(this, 'url');
        },
        url: function() {
            return myvolume.API_ROOT + "/beatport/chart?id=" + this.id;
        },
        parse: function(response) {
            return response.results.tracks;
        }
    });
});
