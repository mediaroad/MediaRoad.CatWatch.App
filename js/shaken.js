// ------------------------------------------------------------------------------------------
// Name: Shaken(options) 
// Description: [PhoneGap] Detect shaken movment via phonegap accelerometer 
// Usage:
// 
// var shaken = new Shaken({
//    frequency: 300,                                                //milliseconds between polls for accelerometer data.
//    threshold: 12,                                                  //how hard the shake has to be to register.
//    success: shake_detected,                                        //callback when shake is detected. "this" will be the "shake" object.
//    failure: shake_not_detected,                                    //callback when watching/getting acceleration fails. "this" will be the "shake" object.
//    progress: shake_detecting                                      // callback when moving
// });
//  shaken.StartWatch();
// ------------------------------------------------------------------------------------------        
// Ref (1): http://mobile.tutsplus.com/tutorials/phonegap/phonegap-from-scratch-device-apis/
// Ref (2): https://gist.github.com/ucavus/5418463
// Both of the above code were not working for some reasons by copy and paste, so combined them to 
// make this version
//
// Modified by: Mythos-Rini
// Last update: 2013-08-09
// ------------------------------------------------------------------------------------------      

function Shaken(options) {

    // Accelerometer varaibles
    var watchID = null;
    var previousReading = { x: null, y: null, z: null }

    // Options via parameters
    var defaultOptions = {
        frequency: 300,
        threshold: 12,
        success: undefined,
        failure: undefined,
        progress: undefined
    }

    // Get parameters
    for (var p in defaultOptions)
        if (!options.hasOwnProperty(p))
            options[p] = defaultOptions[p];


    // Start watching the acceleration            
    this.StartWatch = function () {
        watchID = navigator.accelerometer.watchAcceleration(onAccSuccess, onAccError, { frequency: options.frequency });
    }

    // Stop watching the acceleration            
    this.StopWatch = function () {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }


    // onError watch
    function onAccError() {
        console.log("Exception: accelerometer onError is called");
    }


    // onSuccess watch
    function onAccSuccess(acceleration) {

        var changes = {}

        // first time
        if (previousReading.x == null) {
            changes.x = 0;
            changes.y = 0;
            changes.z = 0;

            previousReading = {
                x: 0,
                y: 0,
                z: 0
            }
        }
        else {

            // Repeat 
            changes.x = Math.abs(acceleration.x - previousReading.x);
            changes.y = Math.abs(acceleration.y - previousReading.y);
            changes.z = Math.abs(acceleration.z - previousReading.z);

            previousReading = {
                x: acceleration.x,
                y: acceleration.y,
                z: acceleration.z
            }

        }

        // report progress (e.g. print to screen)
     //   options.progress.call(this, changes, acceleration.timestamp);

        // magnitude
        var magnitude = Math.sqrt(
              Math.pow(changes.x, 2) +
              Math.pow(changes.y, 2) +
              Math.pow(changes.z, 2)
          );

        // Check magniture to determine shake or not
        if (magnitude >= options.threshold)
            options.success.call(this, magnitude, changes, acceleration.timestamp);
        else
            options.failure.call(this);

    } // method

} // class
