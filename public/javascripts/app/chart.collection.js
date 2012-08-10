define(['app/init', 'app/chart.model'], function() {
    myvolume.collections.Charts = Backbone.Collection.extend({
        
        model: myvolume.models.Chart,

        initialize: function() {
            this.page = 1;
        },

        url: function() {
            var today = new Date(),
                day, month, year,
                formatted_date;

            day = today.getDate();
            month = today.getMonth() + 1;
            year = today.getFullYear();

            formatted_date = year +"-"+ month +"-"+ day;

            return myvolume.API_ROOT + "/charts?sortBy=publishDate%20desc&publishDateStart="+ formatted_date +"&publishDateEnd=" + formatted_date + "&page=" + this.page++;

        },

        parse: function(response) {
            this.totalPages = response.metadata.totalPages;
            return response.results;
        }
    });
});
