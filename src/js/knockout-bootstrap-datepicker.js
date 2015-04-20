var Datepicker = function Datepicker(element, valueAccessor, allBindings){
    this.element = $(element);
    this.observable = valueAccessor();
    this.settings = this.generateSettings();

    // Initialize the bootstrap datepicker library
    this.initializeDatepicker();

    // The following is for synchronizing the observable 
    // and the date picker library. We therefore only do it
    // if the given value of the binding is an observable.
    if (ko.isObservable(this.observable)) {
        this.ignoreSubscription = false;

        // Setup bootstrap datepicker events
        this.setupChangeEvents();
        this.setupObservableSubscriber();
    }
}

Datepicker.DEFAULTS = {
    // Default settings for the binding
    Binding: {
        defaultViewDate: "today"
    },
    // Default settings for the bootstrap datepicker library
    BootstrapDatepicker: {
        autoclose: true,
        format: "yyyy-mm-dd",
        startDate: null,
        weekStart: 1
    }
}

Datepicker.prototype.datePickedEvent = function datePickedEvent(e) {
    var date = e.date;

    // We only want the subscription events to fire if the observable
    // was changed in the viewmodel and not when we update it when 
    // a new date is chosen on the datepicker.
    this.ignoreSubscription = true;
    this.setObservable(date);
    this.ignoreSubscription = false;
}

Datepicker.prototype.generateSettings = function generateSettings() {
    var settings = $.extend({}, Datepicker.DEFAULTS.Binding);

    // Let the users use the power of Date's constructor to set 
    // a defaultViewDate and parse it to match bootstrap datepicker's
    // format
    var defaultViewDate = settings.defaultViewDate === "today" ? new Date() : new Date(settings.defaultViewdate);
    settings.defaultViewDate = {
        year: defaultViewDate.getFullYear(),
        month: defaultViewDate.getMonth(),
        day: defaultViewDate.getDate()
    };

    return settings;
}

Datepicker.prototype.generateBootstrapDatepickerSettings = function generateBootstrapDatepickerSettings() {
    var settings = $.extend({}, Datepicker.DEFAULTS.BootstrapDatepicker, this.settings);

    if (!(settings.startDate instanceof Date)) {
        settings.startDate = new Date(settings.startDate);
    }

    return settings;
}

Datepicker.prototype.initializeDatepicker = function initializeDatepicker() {
    var settings = this.generateBootstrapDatepickerSettings();
    this.element.datepicker(settings);

    var initialDate = ko.unwrap(this.observable);
    if (!initialDate instanceof Date) {
        initialDate = new Date(initialDate);
    }
    this.updateDatepicker(initialDate);
}

Datepicker.prototype.setObservable = function setObservable(date) {
    var value = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    this.observable(value);
}

Datepicker.prototype.setupChangeEvents = function setupChangeEvents() {
    this.element.on("changeDate", this.datePickedEvent.bind(this));
}

Datepicker.prototype.setupObservableSubscriber = function setupObservableSubscriber() {
    var self = this;
    this.observable.subscribe(function(newValue){
        if (self.ignoreSubscription === false) {
            self.updateDatepicker(new Date(newValue));
        }
    });
}

Datepicker.prototype.updateDatepicker = function updateDatepicker(date) {
    this.element.datepicker("update", date);
}

ko.bindingHandlers.datepicker = {};
ko.bindingHandlers.datepicker.init = function init(element, valueAccessor, allBindings){
    return new Datepicker(element, valueAccessor, allBindings);
};