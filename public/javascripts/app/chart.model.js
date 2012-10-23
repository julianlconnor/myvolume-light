define(['app/init'], function() {
    myvolume.models.Chart = Backbone.Model.extend({
        initialize: function() {
            var detail;
            if ( (detail = this.get('detail')) ) {
                this.set(detail);
                this.unset('detail');
            }
        }
    });
});
