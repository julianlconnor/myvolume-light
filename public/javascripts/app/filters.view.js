define(['app/init'], function() {
    myvolume.views.Filters = Backbone.View.extend({
        /*
        * View for handling filter on charts. Obvi.
        */
        el : '#filters',

        initialize: function() {
            _.bindAll(this, 'render',
                            'filterCharts');

            this.chart_filter = new myvolume.views.ChartFilter();
            this.chart_filter.on('filter:chart', this.filterCharts);
        },

        render: function() {
            this.$el.html(this.chart_filter.render().el);
            return this;
        },

        filterCharts: function(chart_type) {
            /*
            * Handler for chart filters.
            */
            pass;
        }
    });

    myvolume.views.ChartFilter = Backbone.View.extend({

        tagName: 'ul',

        className: 'chart-filter',

        initialize: function() {
            _.bindAll(this, 'render',
                            'renderOne');

            this.filters = [
                { name : "Featured", slug : 'featured', data_url : myvolume.FEATURED_CHARTS_ENDPOINT, active : true },
                { name : "All", slug : 'all', data_url : myvolume.ALL_CHARTS_ENDPOINT, active : false }
            ];
        },
        
        render: function() {
            this.$el.empty();
            _.each(this.filters, this.renderOne);

            return this;
        },

        renderOne: function(data) {
            data.parent = this;
            var item = new myvolume.views.ChartFilterItem(data);
            item.on('filter:clicked', this.filter);
            this.$el.append(item.render().el);

            return this;
        },

        filter: function(filter_data) {
            /*
            * Click handler for chart filtering.
            */
            $(document).trigger('filter:chart:' + filter_data.slug);
        }
    });

    myvolume.views.ChartFilterItem = Backbone.View.extend({

        tagName: 'li',

        events: {
            "click" : "handleClick"
        },

        template : _.template($('#chart-filter').html()),

        initialize: function(options) {
            _.bindAll(this, 'render',
                            'trigger');
        },

        render: function() {
            this.$el.html(this.options.name);
            if ( this.options.active ) this.$el.addClass('active');
            return this;
        },

        handleClick: function() {
            this.options.parent.$('.active').removeClass('active');
            this.$el.addClass('active');
            this.trigger('filter:clicked', this.options);
        }

    });
});
