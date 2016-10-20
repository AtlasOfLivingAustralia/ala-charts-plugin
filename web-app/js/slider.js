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
    var from;
    var to;
    var maxValue;
    var minValue;
    var refreshInterval;
    var playTimeRange;

    var callback;
    var _config;

    var init = function(config) {
        callback = config.callback;
        _config = config;

        minValue = from = config.range[0];
        maxValue = to = config.range[1];

        updateTimeRange(config.range)

        //default step size is 1/10 of range
        config.parent.find('#stepSize').val((maxValue - minValue) / 10.0);

        timeSlider = config.parent.find('#timeSlider')
            .slider({
                tooltip: "hide",
                min: minValue,
                max: maxValue,
                range: true,
                value: [from, to]
            }).on('slideStop', function(event, ui) {
                callback(timeSlider.getValue())
                updateTimeRange(timeSlider.getValue())
            }).on('slide', function(event, ui) {
                updateTimeRange(timeSlider.getValue())
            }).data('slider');

        initializeTimeControlsEvents();
    };


    var initializeTimeControlsEvents = function() {
        // Initialize play button
        _config.parent.find('#playButton').on('click', function(){
            play();
        });

        // Initialize stop button
        _config.parent.find('#stopButton').on('click', function(){
            stop();
        });

        // Initialize pause button
        _config.parent.find('#pauseButton').on('click', function(){
            pause();
        });

        // Initialize reset button
        _config.parent.find('#resetButton').on('click', function(){
            reset();
        });

    };

    var stepSize = function() {
        return parseInt(config.parent.find('#stepSize').val());
    }

    var increaseTimeRangeByADecade = function() {
        var step = stepSize();
        var incrementTo = (maxValue - playTimeRange[1]) < step ? maxValue - playTimeRange[1] : step;
        if (incrementTo != 0) {
            timeSlider.setValue([playTimeRange[0] + step, playTimeRange[1] + incrementTo], false, true);
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
                timeSlider.setValue([minValue, minValue + stepSize()], false, true);
                break;
            case CONTROL_STATES.PAUSED:
                // Resume playing
                // Update state before updating slider values
                state = CONTROL_STATES.PLAYING;
                timeSlider.setValue([playTimeRange[0], playTimeRange[1]], false, true);
                break;
        }

        // For SVG elements the addClass and removeClass jQuery method do not work
        _config.parent.find('#pauseButton').removeClass('selected').trigger('selected');
        _config.parent.find('#playButton').addClass('selected').trigger('selected');
        playTimeRange = timeSlider.getValue();
        refreshInterval = setInterval(function () {
            increaseTimeRangeByADecade();
        }, 4000);
    };

    var stop = function() {
        clearInterval(refreshInterval);
        _config.parent.find('#pauseButton').removeClass('selected').trigger('selected');
        _config.parent.find('#playButton').removeClass('selected').trigger('selected');
        state = CONTROL_STATES.STOPPED;
    };

    var pause = function() {
        if (state === CONTROL_STATES.PLAYING) {
            _config.parent.find('#pauseButton').addClass('selected').trigger('selected');
            _config.parent.find('#playButton').removeClass('selected').trigger('selected');
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
        _config.parent.find('#timeFrom').text(values[0]);
        _config.parent.find('#timeTo').text(values[1]);
    };

    var _public = {

    };

    init(config);
    return _public;
};