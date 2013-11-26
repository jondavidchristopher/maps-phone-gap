$(function() {
    $(document).bind("deviceready", function() {
        App = Ember.Application.create();

        App.Router.map(function() {
            this.resource('joyride');
            this.resource('geolocate');
            this.resource('geolocate-error');
            this.resource('bars');
        });

        App.IndexRoute = Ember.Route.extend({
            beforeModel: function() {
                this.transitionTo('joyride');
            }
        });

        App.JoyrideRoute = Ember.Route.extend({
          // model: function() {
          //   return ['red', 'yellow', 'blue'];
          // }
        });

        App.GeolocateRoute = Ember.Route.extend({
            // Get current Location      
            model: function() {
                navigator.geolocation.getCurrentPosition(
                    $.proxy(this.onSuccess, this), 
                    $.proxy(this.onError, this), 
                    {timeout: 15000, enableHighAccuracy: true}
                );
            },     
            onSuccess: function(position) {
                alert('Latitude: '          + position.coords.latitude          + '\n' +
                      'Longitude: '         + position.coords.longitude);
            },
            onError: function(error) {
                this.transitionTo('geolocate-error');
            }
        });

        App.BarsRoute = Ember.Route.extend({
            model: function() {
                return new Ember.RSVP.Promise(function(resolve) {
                    navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
                });
            }          
        });

        App.GeoLocation = Ember.Object.extend({
          fullName: function() {
            return this.get('firstName') + ' ' + this.get('lastName');
          }.property('firstName', 'lastName')
        });        
    });
});