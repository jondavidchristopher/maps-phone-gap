$(function() {
    $(document).bind("deviceready", function() {
        $("#joyride").removeClass('hidden').hide().fadeIn('fast');
        geoLocation.initialize();
    });
});

var geoLocation = {
    initialize: function() {
        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
    },

    onSuccess: function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + new Date(position.timestamp)      + '\n');
    },
    
    onError: function (error) {
        error.PERMISSION_DENIED
        error.POSITION_UNAVAILABLE
        error.TIMEOUT
        alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
    }
};