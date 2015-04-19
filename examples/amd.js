requirejs.config({
    baseUrl: '../bower_components',
    paths: {
        dist: "../dist",

        "bootstrap-datepicker": "bootstrap-datepicker/dist/js/bootstrap-datepicker",
        jquery: "jquery/dist/jquery",
        knockout: "knockout/dist/knockout"
    },
    shim: {
        "bootstrap-datepicker": ["jquery"]
    }
});

requirejs(["knockout", "dist/knockout-bootstrap-datepicker"], function(ko, datepicker){
    var date = ko.observable();

    ko.applyBindings({
        date: date,
        today: function() {
            date("2015-03-19");
        }
    }, document.getElementById("container"));
});