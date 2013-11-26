$(function() {
    $(document).bind("deviceready", function() {
        App = Ember.Application.create();

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
                signin: function() {
                    var data = this.getProperties('email','password');
                    api.call ("login", data, $.proxy(function(response) {
                        if (response.errors) {
                            $(".well").addClass("has-error");
                            this.set('errorMessage', response.errors);                    
                        } else {
                            api.set('token', response.token);   
                            this.transitionTo('geolocate');
                        }
                    }, this));
                }
            });

        // Service Objects
           App.Api = Ember.Object.extend({
                url: null,
                version: null,
                token: null,

                call: function(endpoint, data, callback) {
                    if (this.get("token")) {
                        'auth_token='+ this.get("token") + '&' + data
                    }

                    $.ajax({
                        type: "GET",
                        dataType: "jsonp",
                        url: this.get("url") + "/api/" + this.get("version") + "/" + endpoint,
                        cache: false,
                        timeout: 3000,
                        data: data,

                        success: callback,

                        error: function(data){
                            console.log(data);
                        }
                    });
                }
            });

            App.Environment = Ember.Object.extend({
            // Placeholder for environments
              someVariable: null,

              remoteURL: function() {
                return this.get('firstName') + ' ' + this.get('lastName');
              }.property('firstName', 'lastName')
            });  

                   

        // Initialize App
            var api = App.Api.create({
              url: "http://localhost:3000",
              version:  "v1"
            });       

    });
});