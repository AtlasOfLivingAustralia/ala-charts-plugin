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
    var isDate;

    var callback;
    var _config;

    var formatDate = function (data) {
        return new Date(data).toISOString().slice(0, 10);
    }

    var init = function(config) {
        callback = config.callback;
        _config = config;

        minValue = from = config.range[0];
        maxValue = to = config.range[1];

        isDate = config.date;

        updateTimeRange(config.range)

        //default step size is 1/10 of range
        if (isDate) {
            var diffDays = (maxValue - minValue) / (1000.0*60*60*24);
            if (diffDays < 30*5) {
                config.parent.find('#stepSize').val(Math.ceil(diffDays/10) + 'days')
            } else if(diffDays <= 365*5) {
                config.parent.find('#stepSize').val(Math.ceil(diffDays/300) + 'months')
            } else {
                config.parent.find('#stepSize').val(Math.ceil(diffDays/3650) + 'years')
            }
        } else {
            config.parent.find('#stepSize').val((maxValue - minValue) / 10.0);
        }

        var sliderOptions = {
            tooltip: "hide",
            min: minValue,
            max: maxValue,
            range: true,
            value: [from, to]
        };
        if (isDate) {
            sliderOptions.formatter = formatDate
        }

        timeSlider = config.parent.find('#timeSlider')
            .slider(sliderOptions).on('slideStop', function(event, ui) {
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

    var stepSize = function(current) {
        if (isDate) {
            var step = config.parent.find('#stepSize').val().trim();
            var value = parseInt(step.replace(/[^\d]/g, ''));
            var dt = moment(current);
            if (step.endsWith('d') || step.endsWith('day') || step.endsWith('days')) {
                return dt.add(value, 'days');
            } else if (step.endsWith('m') || step.endsWith('month') || step.endsWith('months')) {
                return dt.add(value, 'months');
            } else {
                return dt.add(value, 'years');
            }
        } else {
            return parseInt(config.parent.find('#stepSize').val()) + current;
        }
    };

    var increaseTimeRangeByADecade = function() {
        var step = stepSize(playTimeRange[1]);
        var incrementTo = step < maxValue ? step : maxValue;
        var incrementFrom = stepSize(playTimeRange[0]);
        if (incrementFrom < maxValue) {
            timeSlider.setValue([incrementFrom, incrementTo], false, true);
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
                timeSlider.setValue([minValue, stepSize(minValue)], false, true);
                callback(timeSlider.getValue())
                break;
            case CONTROL_STATES.PAUSED:
                // Resume playing
                // Update state before updating slider values
                state = CONTROL_STATES.PLAYING;
                timeSlider.setValue([playTimeRange[0], playTimeRange[1]], false, true);
                callback(timeSlider.getValue())
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

        callback([minValue, maxValue]);
        updateTimeRange([minValue, maxValue]);
    };

    var updateTimeRange = function(values) {
        if (isDate) {
            _config.parent.find('#timeFrom').text(formatDate(values[0]));
            _config.parent.find('#timeTo').text(formatDate(values[1]));
        } else {
            _config.parent.find('#timeFrom').text(values[0]);
            _config.parent.find('#timeTo').text(values[1]);
        }
    };

    var _public = {

    };

    init(config);
    return _public;
};