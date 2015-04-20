requirejs.config({
    baseUrl: '../bower_components',
    paths: {
        dist: "../dist",

        "bootstrap": "bootstrap/dist/js/bootstrap",
        "bootstrap-datepicker": "bootstrap-datepicker/dist/js/bootstrap-datepicker",
        jquery: "jquery/dist/jquery",
        knockout: "knockout/dist/knockout",
        "knockout-bootstrap-modal": "knockout-bootstrap-modal/dist/js/knockout-bootstrap-modal",
        "knockout-bootstrap-modal-html": "knockout-bootstrap-modal/dist/html/modal.html",
        "knockout-mapping": "bower-knockout-mapping/dist/knockout.mapping.min",
        "knockout-reactor": "knockoutjs-reactor-bower/knockout.reactor-beta",
        "knockout-undomanager": "knockout-undomanager-bower/knockout-undomanager-0.2",
        "text": "requirejs-text/text"
    },
    shim: {
        "bootstrap": ["jquery"],
        "bootstrap-datepicker": ["jquery"]
    }
});

requirejs(["knockout", "dist/knockout-bootstrap-datepicker", "knockout-bootstrap-modal"], function(ko, datepicker, modal){
    var date = ko.observable("2015-05-05");

    ko.applyBindings({
        date: date,
        today: function(){}
    }, document.getElementById("container")); 
});