$(function() {
    $(document).bind("deviceready", function() {
        App = Ember.Application.create();

        // Models
        // Placeholder for environments
        App.Environment = Ember.Object.extend({
          // these will be supplied by `create`
          someVariable: null,

          remoteURL: function() {
            return this.get('firstName') + ' ' + this.get('lastName');
          }.property('firstName', 'lastName')
        });        

        // Routes
        App.Router.map(function() {
            this.resource('joyride');
            this.resource('signin');
            this.resource('signup');
            this.resource('forgot_password');
            this.resource('geolocate');
            this.resource('geolocate-failure');
            this.resource('bars');
        });

        App.IndexRoute = Ember.Route.extend({
            beforeModel: function() {
                this.transitionTo('joyride');
            }
        });


        App.SigninRoute = Ember.Route.extend({
            setupController: function(controller, context) {
                controller.reset();
            }
        });

        App.JoyrideRoute = Ember.Route.extend({
            // Do amazing story here
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
                this.transitionTo('geolocate-failure');
            }
        });

        App.BarsRoute = Ember.Route.extend({
            model: function() {
            }          
        });

        // Controllers
        App.SigninController = Ember.Controller.extend({
            reset: function() {
                this.setProperties({
                    username: "",
                    password: "",
                    errorMessage: ""
                });
            },            
            signin: function() {
                var self = this, data = this.getProperties('username','password');
                // Clear out any error messages.
                this.set('errorMessage', null);                
                Ember.$.post('localhost:3000/api/v1/login', data).then(function(response) {
                    self.set('errorMessage', response.message);
                    if (response.success) {
                        self.set('token', response.token);                        
                    }
                });
            }
        });

    });
});