define(['app/init', 'app/chart.model'], function() {
    myvolume.collections.ChartsFeatured = Backbone.Collection.extend({
        
        model: myvolume.models.Chart,

        initialize: function(options) {
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

            url = myvolume.FEATURED_CHARTS_ENDPOINT + "?sortBy=publishDate%20desc&publishDateStart="+ formatted_date +"&page=" + this.page;

            this.page += 1;

            return url;
        },

        parse: function(response) {
            var slideshow = response.results.components[0].items,
                featured  = response.results.components[1].items;

            return slideshow.concat(featured);
        }
    });

    myvolume.collections.ChartsAll = Backbone.Collection.extend({
        
        model: myvolume.models.Chart,

        initialize: function(options) {
            _.bindAll( this, 'changeRoot');
        },

        url: function() {
            var today = new Date(),
                day, month, year,
                formatted_date, url;

            day = today.getDate();
            month = today.getMonth() + 1;
            year = today.getFullYear();

            formatted_date = year +"-"+ month +"-"+ day;

            url = myvolume.ALL_CHARTS_ENDPOINT + "?sortBy=publishDate%20desc&publishDateStart="+ formatted_date +"&page=" + this.page;

            this.page += 1;

            return url;
        },

        changeRoot: function(new_root) {
            /*
            * filter:chart:change is triggered by the filter view.
            */
            this.API_ENDPOINT = new_root;
            this.trigger('charts:change:root');
        },

        parse: function(response) {
            this.totalPages = response.metadata.totalPages;
            return response.results;
        }
    });
});
