/**
 *
 * @param config
 * @returns {{}}
 * @constructor
 */
var RegionTimeControls = function(config) {

    var timeSlider;
    var CONTROL_STATES = {
        PLAYING: 0,
        PAUSED: 1,
        STOPPED: 2
    };
    var state = CONTROL_STATES.STOPPED;
    var from = 1800
    var to = 2017
    var maxValue = 2017
    var minValue = 1800
    var refreshInterval;
    var playTimeRange;

    var callback;

    var init = function(config) {
        callback = config.callback;

        timeSlider = config.parent.find('#timeSlider')
            .slider({
                tooltip: "hide",
                min: minValue,
                max: maxValue,
                range: true,
                value: [from, to]
            }).on('slideStop', function(event, ui) {
                console.log('slideStop')
                callback(timeSlider.getValue())
                updateTimeRange(timeSlider.getValue())
            }).on('slide', function(event, ui) {
                console.log('slide')
                updateTimeRange(timeSlider.getValue())
            }).data('slider');

        initializeTimeControlsEvents();
    };


    var initializeTimeControlsEvents = function() {
        // Initialize play button
        $('#playButton').on('click', function(){
            play();
        });

        // Initialize stop button
        $('#stopButton').on('click', function(){
            stop();
        });

        // Initialize pause button
        $('#pauseButton').on('click', function(){
            pause();
        });

        // Initialize reset button
        $('#resetButton').on('click', function(){
            reset();
        });

    };

    var increaseTimeRangeByADecade = function() {
        var incrementTo = (maxValue - playTimeRange[1]) < 10 ? maxValue - playTimeRange[1] : 10;
        if (incrementTo != 0) {
            timeSlider.setValue([playTimeRange[0] + 10, playTimeRange[1] + incrementTo], false, true);
            playTimeRange = timeSlider.getValue();
            callback(timeSlider.getValue())
        } else {
            stop();
        }
    };

    var play = function() {

        switch (state) {
            case CONTROL_STATES.STOPPED:
                // Start playing from the beginning
                // Update state before updating slider values
                state = CONTROL_STATES.PLAYING;
                timeSlider.setValue([minValue, minValue + 10], false, true);
                break;
            case CONTROL_STATES.PAUSED:
                // Resume playing
                // Update state before updating slider values
                state = CONTROL_STATES.PLAYING;
                timeSlider.setValue([playTimeRange[0], playTimeRange[1]], false, true);
                break;
        }

        // For SVG elements the addClass and removeClass jQuery method do not work
        $('#pauseButton').removeClass('selected').trigger('selected');
        $('#playButton').addClass('selected').trigger('selected');
        playTimeRange = timeSlider.getValue();
        refreshInterval = setInterval(function () {
            increaseTimeRangeByADecade();
        }, 4000);
    };

    var stop = function() {
        clearInterval(refreshInterval);
        $('#pauseButton').removeClass('selected').trigger('selected');
        $('#playButton').removeClass('selected').trigger('selected');
        state = CONTROL_STATES.STOPPED;
    };

    var pause = function() {
        if (state === CONTROL_STATES.PLAYING) {
            $('#pauseButton').addClass('selected').trigger('selected');
            $('#playButton').removeClass('selected').trigger('selected');
            clearInterval(refreshInterval);
            state = CONTROL_STATES.PAUSED;
        }
    };

    var reset = function() {
        timeSlider.setValue([minValue, maxValue], false, true);
        stop();
        //regionWidget.updateDateRange(minValue, maxValue);
        console.log(minValue + ' ' + maxValue)
    };

    var updateTimeRange = function(values) {
        $('#timeFrom').text(values[0]);
        $('#timeTo').text(values[1]);
    };

    var _public = {

    };

    init(config);
    return _public;
};