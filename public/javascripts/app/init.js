define([], function() {
    // Place your application-specific JavaScript functions and classes here
    // This file is automatically included by javascript_include_tag :defaults
    window.myvolume = {};

    myvolume.routers = {};
    myvolume.views = {};
    myvolume.models = {};
    myvolume.collections = {};
    myvolume.mixins = {};

    myvolume.DL_ROOT  = "http://www.google.com/search?q=site:zippyshare.com+OR+site:mediafire.com+OR+site:oron.com+OR+site:soundcloud.com+OR+site:minitech.ws+";
    myvolume.API_ROOT = 'http://api.beatport.com';
    myvolume.FEATURED_CHARTS_ENDPOINT = myvolume.API_ROOT + '/catalog/3/beatport/chart-overview';
    myvolume.ALL_CHARTS_ENDPOINT = myvolume.API_ROOT + '/catalog/3/charts';

    $(function() {
        myvolume.PLAYER = $("#jquery_jplayer_1");
    });

});
