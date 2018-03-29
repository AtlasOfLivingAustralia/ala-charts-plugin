/**
 * @namespace
 */
var ALA = {};

/**
 * @class
 * @memberOf ALA
 */
ALA.ChartConstants = {
    highlightColor: '#FF0000',
    colors: [
        "#000000", "#FFFF00", "#1CE6FF", "#FF34FF", "#FF4A46", "#008941", "#006FA6", "#A30059",
        "#FFDBE5", "#7A4900", "#0000A6", "#63FFAC", "#B79762", "#004D43", "#8FB0FF", "#997D87",
        "#5A0007", "#809693", "#FEFFE6", "#1B4400", "#4FC601", "#3B5DFF", "#4A3B53", "#FF2F80",
        "#61615A", "#BA0900", "#6B7900", "#00C2A0", "#FFAA92", "#FF90C9", "#B903AA", "#D16100",
        "#DDEFFF", "#000035", "#7B4F4B", "#A1C299", "#300018", "#0AA6D8", "#013349", "#00846F",
        "#372101", "#FFB500", "#C2FFED", "#A079BF", "#CC0744", "#C0B9B2", "#C2FF99", "#001E09",
        "#00489C", "#6F0062", "#0CBD66", "#EEC3FF", "#456D75", "#B77B68", "#7A87A1", "#788D66",
        "#885578", "#FAD09F", "#FF8A9A", "#D157A0", "#BEC459", "#456648", "#0086ED", "#886F4C",

        "#34362D", "#B4A8BD", "#00A6AA", "#452C2C", "#636375", "#A3C8C9", "#FF913F", "#938A81",
        "#575329", "#00FECF", "#B05B6F", "#8CD0FF", "#3B9700", "#04F757", "#C8A1A1", "#1E6E00",
        "#7900D7", "#A77500", "#6367A9", "#A05837", "#6B002C", "#772600", "#D790FF", "#9B9700",
        "#549E79", "#FFF69F", "#201625", "#72418F", "#BC23FF", "#99ADC0", "#3A2465", "#922329",
        "#5B4534", "#FDE8DC", "#404E55", "#0089A3", "#CB7E98", "#A4E804", "#324E72", "#6A3A4C",
        "#83AB58", "#001C1E", "#D1F7CE", "#004B28", "#C8D0F6", "#A3A489", "#806C66", "#222800",
        "#BF5650", "#E83000", "#66796D", "#DA007C", "#FF1A59", "#8ADBB4", "#1E0200", "#5B4E51",
        "#C895C5", "#320033", "#FF6832", "#66E1D3", "#CFCDAC", "#D0AC94", "#7ED379", "#012C58",

        "#7A7BFF", "#D68E01", "#353339", "#78AFA1", "#FEB2C6", "#75797C", "#837393", "#943A4D",
        "#B5F4FF", "#D2DCD5", "#9556BD", "#6A714A", "#001325", "#02525F", "#0AA3F7", "#E98176",
        "#DBD5DD", "#5EBCD1", "#3D4F44", "#7E6405", "#02684E", "#962B75", "#8D8546", "#9695C5",
        "#E773CE", "#D86A78", "#3E89BE", "#CA834E", "#518A87", "#5B113C", "#55813B", "#E704C4",
        "#00005F", "#A97399", "#4B8160", "#59738A", "#FF5DA7", "#F7C9BF", "#643127", "#513A01",
        "#6B94AA", "#51A058", "#A45B02", "#1D1702", "#E20027", "#E7AB63", "#4C6001", "#9C6966",
        "#64547B", "#97979E", "#006A66", "#391406", "#F4D749", "#0045D2", "#006C31", "#DDB6D0",
        "#7C6571", "#9FB2A4", "#00D891", "#15A08A", "#BC65E9", "#FFFFFE", "#C6DC99", "#203B3C",

        "#671190", "#6B3A64", "#F5E1FF", "#FFA0F2", "#CCAA35", "#374527", "#8BB400", "#797868",
        "#C6005A", "#3B000A", "#C86240", "#29607C", "#402334", "#7D5A44", "#CCB87C", "#B88183",
        "#AA5199", "#B5D6C3", "#A38469", "#9F94F0", "#A74571", "#B894A6", "#71BB8C", "#00B433",
        "#789EC9", "#6D80BA", "#953F00", "#5EFF03", "#E4FFFC", "#1BE177", "#BCB1E5", "#76912F",
        "#003109", "#0060CD", "#D20096", "#895563", "#29201D", "#5B3213", "#A76F42", "#89412E",
        "#1A3A2A", "#494B5A", "#A88C85", "#F4ABAA", "#A3F3AB", "#00C6C8", "#EA8B66", "#958A9F",
        "#BDC9D2", "#9FA064", "#BE4700", "#658188", "#83A485", "#453C23", "#47675D", "#3A3F00",
        "#061203", "#DFFB71", "#868E7E", "#98D058", "#6C8F7D", "#D7BFC2", "#3C3E6E", "#D83D66",

        "#2F5D9B", "#6C5E46", "#D25B88", "#5B656C", "#00B57F", "#545C46", "#866097", "#365D25",
        "#252F99", "#00CCFF", "#674E60", "#FC009C", "#92896B"
    ],
    legendTemplate: "<ul style=\"list-style-type:none;\" class=\"ala-<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
};

/**
 * Entry point for creating charts based on biocache webservices.
 *
 * <p/>
 * <b>chartOptions</b>
 * <ul>
 * <li><code>biocacheServiceUrl</code> URL for biocache web services endpoint</li>
 * <li><code>biocacheWebappUrl</code> URL for biocache front end endpoint</li>
 * <li><code>query</code> URL for biocache front end endpoint</li>
 * <li><code>queryContext</code> URL for biocache front end endpoint</li>
 * <li><code>facetQueries</code> URL for biocache front end endpoint</li>
 * <li><code>charts</code> The charts configuration which includes a list of charts to render</li>
 *</ul>
 *
 * @param chartsDivId the ID of the div to populate with charts.
 * @param chartOptions
 * @constructor
 */
ALA.BiocacheCharts = function (chartsDivId, chartOptions) {

    var _facets = [];

    var getColor = function (keySeries, chartConfig, data) {
        var segmentColor = ALA.ChartConstants.colors[(keySeries + 1) % (ALA.ChartConstants.colors.length - 1)];

        //data item colour for pie/doughnut charts
        if (chartConfig.chartType == 'pie' || chartConfig.chartType == 'doughnut') {
            segmentColor = [];
            $.each(data, function (key, result) {
                if (result.label == null) result.label = "";
                if (!(chartConfig.hideEmptyValues && result.label == "")/* && result["count"] > 0*/) {
                    segmentColor.push(ALA.ChartConstants.colors[(key + 1) % (ALA.ChartConstants.colors.length - 1)]);
                }
            })
        }

        return segmentColor;
    };

    /**
     * create datastructure for a chart
     *
     * includes non-datastructure value maxValue in the returned value
     * includes non-datastructure mapping labelToFq in the returned value
     *
     * @param data
     * @param chartConfig
     * @param facet
     * @returns {{labels: Array, datasets: Array, maxValue: undefined, labelToFq: Map}}
     */
    var createDatastructure = function(data, chartConfig, facet) {
        //workaround for bug where valueFacet is undefined and valueType != count
        var type = (chartConfig.valueType && chartConfig.valueFacet) ? chartConfig.valueType : 'count';

        var datastructure = {
            labels: [],
            datasets: [],
            maxValue: undefined,
            labelToFq: {}
        };

        $.each(data, function (keySeries, resultSeries) {
            //series colour
            var segmentColor = getColor(keySeries, chartConfig, resultSeries.data);
            //use a different color for single series charts
            var overrideColor = data.length == 1 && chartConfig.chartType != 'pie' && chartConfig.chartType != 'doughnut';
            if (overrideColor) segmentColor = "#97BBCD";

            datastructure.datasets[keySeries] = {
                label: jQuery.i18n.prop(chartConfig.title),
                backgroundColor: transparentColors(segmentColor,50),
                data: []
            };

            //set additional colors for bar horizontal-bar
            if ($.inArray(chartConfig.chartType, ['bar', 'horizontal-bar', 'horizontalBar']) >= 0) {
                datastructure.datasets[keySeries].borderColor = transparentColors(segmentColor, 85);
                datastructure.datasets[keySeries].hoverBackgroundColor = transparentColors(segmentColor, 100);
                datastructure.datasets[keySeries].hoverBorderColor = transparentColors(segmentColor, 85);
                datastructure.datasets[keySeries].borderWidth = 1;
            }

            if (chartConfig.facet != resultSeries.label) datastructure.datasets[keySeries].label = resultSeries.label

            $.each(resultSeries.data, function (key, result) {

                if (result.label == null) result.label = "";
                if (!(chartConfig.hideEmptyValues && result.label == "")/* && result["count"] > 0*/) {

                    var i18n = jQuery.i18n.prop(result.label)
                    if(i18n.includes("[")){
                        i18n = result.label
                    }

                    var prettifiedLabel = i18n.substring(0, 80);
                    if (result.label.trim() == "") {
                        prettifiedLabel = chartConfig.emptyValueMsg ? chartConfig.emptyValueMsg : 'Not available';
                    }

                    if (datastructure.labels.length < data[0].data.length) datastructure.labels.push(prettifiedLabel);
                    datastructure.datasets[keySeries].data.push(result[type]);

                    if (!datastructure.maxValue || datastructure.maxValue < result[type]) datastructure.maxValue = result[type];

                    datastructure.labelToFq[prettifiedLabel] = (result.fq) ? result.fq : facet + ":" + result.label;
                }
            });
        });

        return datastructure;
    };

    /**
     * updates values in an existing datastructure
     *
     * @param datastructure
     * @param data
     * @param chartConfig
     * @returns {*}
     */
    var updateDatastructure = function(datastructure, data, chartConfig) {
        //workaround for bug where valueFacet is undefined and valueType != count
        var type = (chartConfig.valueType && chartConfig.valueFacet) ? chartConfig.valueType : 'count';

        $.each(data, function (keySeries, resultSeries) {
            var labelFound = new Array(datastructure.labels.length);

            $.each(resultSeries.data, function (key, result) {

                if (result.label == null) result.label = "";
                if (!(chartConfig.hideEmptyValues && result.label == "")/* && result["count"] > 0*/) {
                    var prettifiedLabel = result.label.substring(0, 80);
                    if (result.label.trim() == "") {
                        prettifiedLabel = chartConfig.emptyValueMsg ? chartConfig.emptyValueMsg : 'Not available';
                    }

                    //find existing entry
                    for (var i = 0; i < datastructure.labels.length; i++) {
                        if (datastructure.labels[i] == prettifiedLabel) {
                            labelFound[i] = true;

                            datastructure.datasets[keySeries].data[i] = result[type];

                            i = datastructure.labels.length;
                        }
                    }
                }
            });
            for (var i = 0; i < datastructure.labels.length; i++) {
                if (!labelFound[i]) {
                    datastructure.datasets[keySeries].data[i] = 0;
                }
            }
        });

        return datastructure;
    };

    /**
     * Constructor for charts.
     *
     * @param facet
     * @param chartConfig
     * @param redraw
     * @constructor
     */
    var createChart = function (facet, chartConfig, redraw){

        var divId = (redraw) ? chartConfig.divId : createCanvasAndLegend(facet, chartConfig.title, chartConfig);

        if (chartConfig && !chartConfig.hideOnce) {
            if (chartConfig.sliderEnabled) {
                $('#' + divId).find('#controlsMapTab').show()
            } else {
                $('#' + divId).find('#controlsMapTab').hide()
            }

            wsCallAndRender(chartConfig, chartOptions.query, facet, chartOptions.facetQueries, chartOptions.queryContext, chartConfig.filter, divId, function (data) {

                if (!chartConfig.slider) {
                    getMinMax(chartConfig, chartConfig.sliderFacet, function(minMax) {
                        var options = {
                            parent: $('#' + divId),
                            range: minMax,
                            date: facetLookup(chartConfig.sliderFacet).dataType == 'tdate',
                            callback: function (value) {
                                if (facetLookup(chartConfig.sliderFacet).dataType == 'tdate') {
                                    var d1 = new Date(value[0]).toISOString();
                                    var d2 = new Date(value[1]).toISOString();
                                    chartConfig.sliderFq = '&fq=' + encodeURIComponent(chartConfig.sliderFacet + ':[' + d1 + ' TO ' + d2 + ']');
                                } else {
                                    chartConfig.sliderFq = '&fq=' + chartConfig.sliderFacet + ':[' + value[0] + '%20TO%20' + value[1] + ']';
                                }
                                createChart(facet, chartConfig, true)
                            }
                        };
                        chartConfig.slider = new RegionTimeControls(options);
                    });
                }

                var datastructure;

                //prepare Chart.js data structure
                if (!chartConfig.sliderFq) {

                    //compile results from WS call
                    datastructure = createDatastructure(data, chartConfig, facet)

                    chartConfig.maxValue = datastructure.maxValue;
                    chartConfig.datastructure = datastructure;
                } else {
                    datastructure = updateDatastructure(chartConfig.datastructure, data, chartConfig);
                }

                var labelToFq = datastructure.labelToFq;

                var $canvas = $('#' + divId).find('canvas');

                if (datastructure.datasets[0].data.length > 0) {
                    chartConfig.chart = drawChart(datastructure, labelToFq, $canvas, chartConfig, divId);
                } else {
                    $canvas.parent().append($("<label>No data to display</label>").addClass('chart-no-data-label'));

                    $canvas.parent().find('.chart-canvas').detach();
                    $canvas.parent().find('.chart-legend').detach();
                }
            });
        } else {
            delete chartConfig.hideOnce;
        }
    };

    /**
     * Estimate no. of characters in labels for horizontal- / bar / line charts that will prevent initial characters running
     * off left / bottom of canvas area
     *
     * @param chart
     * @param chartType
     */
    var getChartLabelMaxLen = function(chart, chartType) {
        //allow up to 45% for legend; more than 50% means it gets trimmed
        if (chartType == 'horizontalBar') {
            var maxPx = chart.chart.width * 0.45; 
        } else if (chartType == 'bar' || chartType == 'line') {
            var maxPx = chart.chart.height * 0.45;
        }
        var fontSizePx = chart.options.defaultFontSize; //might need to get pixel size out of chart.legend.ctx.font string

        var chars = (maxPx / fontSizePx)*2; // more accurate would be to take the actual label text and append it
                                            // char by char to a div of the right width until the div grows in height
                                            // but that seems a little over the top
        return chars;
    }

    /**
     * Estimate space needed (px) that will accommodate a list of labels
     *
     * @param chart
     */
    var getChartLabelSpace = function(chart) {
        var noSeries = chart.data.labels.length;
        var fontSizePx = chart.options.defaultFontSize; //might need to get pixel size out of chart.legend.ctx.font string
        return noSeries * fontSizePx * 1.5;
    }

    /**
     * Adjust horizontal- / bar / line charts by trimming labels and resizing as needed
     * Driven by optional charts.json bool settings "growToFit" and "trimLabels"
     *
     * @param datastructure
     * @param chartType
     * @param chartConfig
     * @param chart
     * @param divId
     */
    var adjustChartLabelsAndSize = function(datastructure, chartType, chartConfig, chart, divId) {
        if (chartType == 'horizontalBar' || chartType == 'bar' || chartType == 'line') {
            if (chartConfig.trimLabels) {
                var maxLen = getChartLabelMaxLen(chart, chartType);
                for (var i = 0; i < datastructure.labels.length; i++) {
                    if (datastructure.labels[i].length > maxLen)
                        datastructure.labels[i] = datastructure.labels[i].substring(0, maxLen - 3) + '...';
                }
            }
            if (chartConfig.growToFit) {
                var reSize = getChartLabelSpace(chart);
                if (chartType == 'horizontalBar') {
                    if ($('#' + divId).height() < reSize) {
                        chart.options.maintainAspectRatio = false;
                        $('#' + divId).height(reSize);
                        chart.resize();
                    }
                } else if (chartType == 'bar' || chartType == 'line') {
                    if ($('#' + divId).width() < reSize) {
                        chart.options.maintainAspectRatio = false;
                        chart.scales["x-axis-0"].options.ticks.autoSkip = false;
                        chart.scales["x-axis-0"].options.ticks.stepSize = 1;
                        $('#' + divId).width(reSize);
                        chart.resize();
                    }
                }
            }
            //update current chart data
            chart.data = datastructure;
            chart.update();
        }
        return 0;
    }
    
    var drawChart = function (datastructure, labelToFq, $canvas, chartConfig, divId) {
        var chart;
        // remain compatible with older config
        var chartType = (chartConfig.chartType == 'horizontal-bar') ? 'horizontalBar' : chartConfig.chartType;
        
        if (chartConfig.chart) {
            adjustChartLabelsAndSize(datastructure, chartType, chartConfig, chartConfig.chart, divId);
            //update current chart data
            chartConfig.chart.data = datastructure;
            chartConfig.chart.update();
            chart = chartConfig.chart;
        } else {
            var ctx = $canvas.get(0).getContext("2d");

            
            var scales = getScales(chartType, chartConfig.maxValue, chartConfig.logarithmic);

            chart = new Chart(ctx, {
                type: chartType,
                data: datastructure,
                options: {
                    responsive: true,
                    scales: scales,
                    legend: {
                        display: false
                    }
                }
            });

            if (chartType == 'pie' || chartType == 'doughnut' || chartConfig.seriesEnabled) {
                $('#' + divId).find('.chart-legend').get(0).innerHTML = chart.generateLegend();
            }
            
            adjustChartLabelsAndSize(datastructure, chartType, chartConfig, chart, divId);

            $canvas.click(
                function (evt) {
                    var activePoints = chart.getElementsAtEvent(evt);
                    var chartLabels = Object.keys(labelToFq);
                    var selectedKey = chartLabels[activePoints[0]._index];
                    var url = chartOptions.biocacheWebappUrl + "/occurrences/search?q=" + chartOptions.query + "&fq=" + labelToFq[selectedKey];
                    window.location.href = url;
                }
            );
        }

        return chart;
    };

    var getScales = function (chartType, maxValue, logarithmic) {
        var scales = {};
        if (logarithmic) {
            if (chartType == 'bar' || chartType == 'line') {
                scales = {
                    yAxes: [{
                        type: 'logarithmic',
                        ticks: {
                            //fixed chart maximum even when slider changes
                            max: maxValue
                        }
                    }]
                }
            } else if (chartType == 'horizontalBar') {
                scales = {
                    xAxes: [{
                        type: 'logarithmic',
                        ticks: {
                            //fixed chart maximum even when slider changes
                            max: maxValue
                        }
                    }]
                }
            }
        } else {
            if (chartType == 'bar' || chartType == 'line') {
                scales = {
                    yAxes: [{
                        ticks: {
                            //fixed chart maximum even when slider changes
                            max: maxValue
                        }
                    }]
                }
            } else if (chartType == 'horizontalBar') {
                scales = {
                    xAxes: [{
                        ticks: {
                            //fixed chart maximum even when slider changes
                            max: maxValue
                        }
                    }]
                }
            }
        }

        return scales;
    };

    /**
     * Function that wraps the WS call to retrieve data for a chart
     *
     * @param chartConfig
     * @param query
     * @param facet
     * @param facetQueries
     * @param queryContext
     * @param additionalFilter
     * @param divId
     * @param dataCallback the callback function to use if data available
     */
    var wsCallAndRender = function(chartConfig, query, facet, facetQueries, queryContext, additionalFilter, divId, dataCallback){

        if(query == "" || query == undefined) {
            query = "*:*";
        }

        //when there is a sliderFacet, exclude sliderFacet unknowns
        if (chartConfig.sliderEnabled) query += "&fq=" + encodeURIComponent(chartConfig.sliderFacet + ":*");

        var valueParam = "";
        if (chartConfig.valueType && chartConfig.valueType.length > 0 && chartConfig.valueType != "count" && chartConfig.valueFacet) {
            valueParam = "&stats=" + chartConfig.valueFacet;
        }

        var xranges = (chartConfig.valueRanges && chartConfig.valueRanges.length>0) ? "&xranges=" + formatRange(facet, chartConfig.valueRanges) : "";
        var seriesRanges = (chartConfig.seriesRanges && chartConfig.seriesRanges.length>0) ? "&seriesranges=" + formatRange(chartConfig.seriesFacet, chartConfig.seriesRanges) : "";
        var series = (chartConfig.seriesEnabled && chartConfig.seriesFacet && chartConfig.seriesFacet.length>0) ? "&series=" + chartConfig.seriesFacet : "";
        var seriesFq = "";
        if (chartConfig.seriesEnabled && chartConfig.seriesFq && chartConfig.seriesFq.length > 0) {
            seriesFq = "&fq="
            $.each(chartConfig.seriesFq, function (key, value) {
                if (seriesFq.length > 4) seriesFq += "%20OR%20";
                seriesFq += '(' + encodeURIComponent(value) + ')';
            });
        }

        if (!chartConfig.sliderFq) chartConfig.sliderFq = '';

        var includeOther = (chartConfig.includeOther) ? "&xother=" + chartConfig.includeOther : "";
        var includeOtherSeries = (chartConfig.includeOtherSeries) ? "&seriesother=" + chartConfig.includeOtherSeries : "";
        var includeMissing = (chartConfig.hideEmptyValues) ? "&xmissing=" + (!chartConfig.hideEmptyValues) : "";

        var x = (facet) ? "&x=" + facet : "";

        //default search service
        var queryUrl = chartOptions.biocacheServiceUrl + "/chart.json?q=" + query +
            x + xranges +"&qc=" + queryContext + valueParam + chartConfig.sliderFq + seriesRanges + series + seriesFq +
            includeOther + includeOtherSeries + includeMissing;

        if(additionalFilter) {
            queryUrl = queryUrl + '&' + additionalFilter;
        }

        //console.log(queryUrl);

        if (divId) $('#' + divId).find('.chart-loading').show();

        $.ajax({
            url: queryUrl,
            type: 'GET',
            error: function(xhr, status, error) {
                alert("error");
            },
            success: function(data) {
                dataCallback(data.data);
            },
            error: function(data) {
                //return no data instead of error
                dataCallback([]);
            },
            complete: function() {
                if (divId) $('#' + divId).find('.chart-loading').hide();
            }
        });
    };

    var formatRange = function(facet, range) {
        if (facetLookup(facet).dataType == 'tdate') {
            var newRange = [];
            $.each(range.split(','), function (key, value) {
                newRange.push(new Date(Date.parse(value)).toISOString());
            });
            return newRange.join(',');
        } else {
            return range;
        }
    }

    function transparentColors(_c0, p) {
        if (_c0 instanceof Array) {
            var c = [];
            $.each(_c0, function (key, c0) {
                c.push(singleTransparentColors(c0, p))
            });
            return c;
        } else {
            return singleTransparentColors(_c0, p);
        }
    }

    function singleTransparentColors(c0, p) {
        return "rgba(" + parseInt(c0.slice(1,3),16) + "," + parseInt(c0.slice(3,5),16) + "," + parseInt(c0.slice(5,7),16) + "," + (p/100.0) + ")";
    }

    function blendColors(_c0, c1, p) {
        if (_c0 instanceof Array) {
            var c = [];
            $.each(_c0, function (key, c0) {
                c.push(singleBlendColors(c0, c1, p))
            });
            return c;
        } else {
            return singleBlendColors(_c0, c1, p);
        }
    }

    function singleBlendColors(c0, c1, p) {
        var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
        return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
    }

    var chartCounter = 0;

    /**
     * Create the canvas and legend elements.
     *
     * @param facet
     * @param title
     * @param chartConfig
     * @returns {string}
     */
    var createCanvasAndLegend = function(facet, title, chartConfig){
        //console.log("createCanvasAndLegend",title,chartConfig.divId);
        var divId = facet + '-chart-' + chartCounter;
        var divIdWithoutCounter = facet + '-chart';
        var $topDiv;
        var checked = "";
        var exists = false;
        if (chartConfig && chartConfig.divId && $('#' + chartConfig.divId).size() > 0) {
            //console.log("div exists");
            //top div already exists, replace contents
            divId = chartConfig.divId;
            $topDiv = $('#' + divId);
            $topDiv.empty();
            checked = "checked";
            exists = true;
        } else {
            //console.log("div NOT exists");
            chartConfig.divId = divId;
            chartCounter++;
            $topDiv = $('<div/>').addClass('chart').addClass(divIdWithoutCounter).attr('id', divId);
        }

        if (chartConfig.large) {
            $topDiv.width('100%');
        }

        var $title = $('<h3/>').addClass('chart-title').html(title);
        var $canvas = $('<canvas/>').addClass('chart-canvas');
        var $legend = $('<div/>').addClass('chart-legend').addClass('ala-doughnut-legend');

        var $progress = $('<label>loading...</label>').addClass('chart-loading');

        if (chartOptions.chartControls) {
            var $delete = $('<button>delete</button>').addClass('btn').addClass('btn-xs').addClass('btn-mini').addClass('btn-danger').click(deleteChart);
            var $edit = $('<button>edit</button>').addClass('btn').addClass('btn-xs').addClass('btn-mini').click(editChart);
            var $showHide = $('<input type="checkbox" name="show-hide-chart" class="bootToggle" ' + checked + '>').change(toggleChart);
            $topDiv.append($title).append($delete).append($edit).append($showHide);
        } else {
            $topDiv.append($title);
        }

        //slider controls
        $topDiv.append($('<ul class="nav nav-tabs" id="controlsMapTab">\
                <div id="timeControls" class="text-center"> \
                    <div id="timeButtons">\
                        <span class="timeControl link" id="playButton" title="Play" alt="Play"></span>\
                        <span class="timeControl link" id="pauseButton" title="Pause play" alt="Pause play"></span>\
                        <span class="timeControl link" id="stopButton" title="Stop" alt="Stop"></span>\
                        <span class="timeControl link" id="resetButton" title="Reset" alt="Reset"></span>\
                        <input class="timeControl link" id="stepSize" title="Step size" alt="Step size">\
                    </div>\
                    <div id="timeSlider">\
                        <div id="timeRange"><span id="timeFrom"></span> - <span id="timeTo"></span></div>\
                    </div>\
                </div>\
            </ul>').hide());

        if (chartConfig && !chartConfig.hideOnce) {
            $topDiv.append($canvas).append($legend).append($progress);
        }

        if (!exists) {
            $('#' + chartsDivId).append($topDiv);
        }

        $topDiv.find('.bootToggle').bootstrapToggle({
            on: 'hide',
            off: 'show',
            size: 'mini',
            onstyle: 'default'
        });

        return divId;
    };

    function deleteChart(event) {
        if (confirm("Are you sure you want to delete this chart?")) {
            var divId = $(event.target).closest('.chart').attr('id');
            for (var key in chartOptions.charts) {
                if (chartOptions.charts[key].divId == divId) {
                    delete chartOptions.charts[key];
                }
            }

            if (chartOptions.chartControlsCallback) {
                chartOptions.chartControlsCallback(chartOptions);
            }

            $(event.target).parent().detach();
        }
    }

    function toggleChart(event) {
        //console.log("toggleChart",$(event.target),$(event.target).is(":checked"));
        if ($(event.target).is(":checked")) {
            showChart(event);
        } else {
            hideChart(event);
        }
    }

    function hideChart(event) {
        var chart = $(event.target).closest('.chart');
        chart.children('.chart-canvas').hide()
        chart.children('.chart-legend').hide()
        chart.children('.chart-no-data-label').hide()
        chart.find('#controlsMapTab').hide()
    }

    function showChart(event) {
        var chart = $(event.target).closest('.chart');

        if (chart.children('.chart-canvas').size() == 0 && chart.children('.chart-canvas').size() == 0) {
            //create chart
            //console.log("create chart");
            var divId = chart.attr('id');
            for (var key in chartOptions.charts) {
                if (chartOptions.charts[key].divId == divId) {
                    createChart(chartOptions.charts[key].facet, chartOptions.charts[key]);
                }
            }
        } else {
            //console.log("just show chart");
            chart.children('.chart-canvas').show()
            chart.children('.chart-legend').show()
            chart.children('.chart-no-data-label').show()

            var divId = chart.attr('id');
            for (var key in chartOptions.charts) {
                if (chartOptions.charts[key].divId == divId && chartOptions.charts[key].sliderEnabled) {
                    $('#' + divId).find('#controlsMapTab').show()
                }
            }
        }
    }

    function editChart(event) {
        var chart = $(event.target).closest('.chart');

        //toggle
        if (chart.children('.chart-add').size() == 0) {
            hideChart(event);

            var divId = $(event.target).closest('.chart').attr('id');
            for (var key in chartOptions.charts) {
                if (chartOptions.charts[key].divId == divId) {
                    createControl($(event.target).closest('.chart'), true, chartOptions.charts[key], chartConfig);
                }

            }
        } else {
            showChart(event);
            chart.children('.chart-add').detach();
        }
    }

    var createTextInput = function(label, clas, value, hint) {
        return $('<div/>').addClass('chart-add-group').
            append($('<label>' + jQuery.i18n.prop(label) + '</label>').addClass('chart-add-label').append(createHintIcon(hint))).
            append($('<input/>').addClass('chart-add-' + clas).val(value));
    };

    var createSelectInput = function(label, clas, values, defaultValue, hint) {
        var select = $('<select/>').addClass('chart-add-' + clas);
        $(values).each(function (key, value) {
            select.append($("<option/>").attr('value', value).text(value));
        });
        select.val(defaultValue);

        return $('<div/>').addClass('chart-add-group').
            append($('<label>' + jQuery.i18n.prop(label) + '</label>').addClass('chart-add-label').append(createHintIcon(hint))).
            append(select);
    };

    var createCheckboxInput = function (label, clas, value, hint) {
        return $('<div/>').addClass('chart-add-group').
            append($('<label>' + jQuery.i18n.prop(label) + '</label>').addClass('chart-add-label').append(createHintIcon(hint))).
            append($('<input/>').addClass('chart-add-' + clas).attr('type', 'checkbox').prop('checked', value));
    };

    var createHintIcon = function(hint) {
        return $('<i/>').addClass('fa fa-question-circle hint').attr('title', hint);
    };

    /**
     * Create controls for creating/editing a chart
     *
     * @param parent
     * @param editchart
     * @param defaults
     * @param chartConfig
     */
    var createControl = function(parent, editchart, defaults) {
        var control = $('<div/>').addClass('chart-add');

        var title = createTextInput('Title', 'title',
            (defaults && defaults.title) ? defaults.title : 'My chart', 'Text will appear above the chart');

        var valueType = createSelectInput('Value', 'value-type', [ 'count', 'sum', 'max', 'min', 'mean', 'missing', 'stddev' ],
            (defaults && defaults.valueType) ? defaults.valueType : 'count', 'Secondary axis "value", default is record count');

        var seriesEnabled = createCheckboxInput('Series enabled', 'series-enabled',
            (defaults && defaults.seriesEnabled) ? defaults.seriesEnabled : false, 'Include additional data series on the chart.');

        var sliderEnabled = createCheckboxInput('Slider enabled', 'slider-enabled',
            (defaults && defaults.sliderEnabled) ? defaults.sliderEnabled : false, 'Add a slider to change the 3rd axis (usually date)');

        var seriesRanges = createTextInput('Series ranges', 'series-ranges',
            (defaults && defaults.seriesRanges) ? defaults.seriesRanges : '', 'Enter comma delimited list to group selected series values. The list should begin with the min value and end with the max value. e.g. "0,0.2,1" will produce the groups "0 to 0.2", "0.2 to 1".');

        var valueRanges = createTextInput('Facet ranges', 'value-ranges',
            (defaults && defaults.valueRanges) ? defaults.valueRanges : '', 'Enter comma delimited list to group selected facet values. The list should begin with the min value and end with the max value. e.g. "0,0.2,1" will produce the groups "0 to 0.2", "0.2 to 1".');

        var chartType = createSelectInput('Chart type', 'chart-type', [ 'bar', 'horizontalBar', 'doughnut', 'pie', 'line' ],
            (defaults && defaults.chartType) ? defaults.chartType : 'bar', 'chart type is self explanatory');

        var emptyValueMsg = createTextInput('Empty value message', 'empty-value-msg',
            (defaults && defaults.emptyValueMsg) ? defaults.emptyValueMsg : 'Unknown', 'This text will appear when no value is present in the data');

        var hideEmptyValues = createCheckboxInput('Hide empty values', 'hide-empty-values',
            (defaults && defaults.hideEmptyValues !== undefined) ? defaults.hideEmptyValues : true, 'empty value will be removed from chart');

        var includeOther = createCheckboxInput('Include "Other".', 'include-other',
            (defaults && defaults.includeOther) ? defaults.includeOther : false, 'Charts have a limit on the number of facets that will be displayed. Including "Other" will group all the excluded facets together.');

        var includeOtherSeries = createCheckboxInput('Include "Other" for the series.', 'include-other-series',
            (defaults && defaults.includeOtherSeries) ? defaults.includeOtherSeries : false, 'Charts have a limit on the number of series that will be displayed. Including "Other" will group all the excluded series together.');

        var largeChart = createCheckboxInput('Large chart', 'large',
            (defaults && defaults.large) ? defaults.large : false, 'Chart will take up the full width of the surrounding block');

        var logarithmic = createCheckboxInput('Logarithmic', 'logarithmic',
            (defaults && defaults.logarithmic) ? defaults.logarithmic : false, 'Value axis will show logarithmic scale - use for large range of values in data');

        var facet = createSelectInput('Facet', 'facet', [] , '', 'Choose a facet field for the first axis of the chart - see the filter column for facets that have values in your data');
        var valueFacet = createSelectInput('Value facet', 'value-facet', [] , '', 'Choose a facet field for the secondary axis of the chart - values are computed using the "Value" type chosen');
        var seriesFacet = createSelectInput('Series facet', 'series-facet', [] , '', 'Choose a facet field for the "series" axis of the chart');
        var sliderFacet = createSelectInput('Slider facet', 'slider-facet', [] , '', 'Choose a facet field for the "slider" axis of the chart');
        $(_facets).each(function (key, value) {
            if (value.indexed) {
                var displayValue = (value.description) ? value.description : value.name;
                facet.find('select').append($("<option/>").attr('value', value.name).text(displayValue));
                seriesFacet.find('select').append($("<option/>").attr('value', value.name).text(displayValue));

                if (value.dataType == 'int' || value.dataType == 'double' || value.dataType == 'long' ||
                    value.dataType == 'tint' || value.dataType == 'tdouble' || value.dataType == 'tlong') {
                    valueFacet.find('select').append($("<option/>").attr('value', value.name).text(displayValue));
                }

                if (value.dataType == 'int' || value.dataType == 'double' || value.dataType == 'tdate') {
                    sliderFacet.find('select').append($("<option/>").attr('value', value.name).text(displayValue));
                }
            }
        });
        if (defaults && defaults.facet) facet.find('select').val(defaults.facet);
        if (defaults && defaults.valueFacet) valueFacet.find('select').val(defaults.valueFacet);
        if (defaults && defaults.seriesFacet) seriesFacet.find('select').val(defaults.seriesFacet);
        if (defaults && defaults.sliderFacet) sliderFacet.find('select').val(defaults.sliderFacet);

        var seriesFq = createSelectInput('Series facet', 'series-fq', [] , '', 'Restrict which series values to include.');

        var button;
        if (editchart) {
            button = $('<div/>').
            append($('<button>Apply changes</button>').addClass('chart-add-button').addClass('btn').addClass('btn-xs').addClass('btn-mini').click(applyChartChanges)).
            //toggle edit controls
            append($('<button>Cancel</button>').addClass('chart-add-cancel').addClass('btn').addClass('btn-xs').addClass('btn-mini').click(editChart));
        } else {
            button = $('<button>Add new chart</button>').addClass('chart-add-button').addClass('btn').click(addChart);
        }

        control.append(title);
        control.append(chartType);
        control.append(largeChart);
        control.append(facet);
        control.append(valueRanges);
        control.append(valueType);
        control.append(valueFacet);
        control.append(button);
        control.append(hideEmptyValues);
        control.append(emptyValueMsg);
        control.append(includeOther);
        control.append(logarithmic);
        control.append(sliderEnabled);
        control.append(sliderFacet);
        control.append(seriesEnabled);
        control.append(seriesFacet);
        control.append(seriesRanges);
        control.append(seriesFq);
        control.append(includeOtherSeries);
        control.append(button);

        parent.append(control);

        applyControlBehaviour(control, defaults);
    };

    /**
     * Show/hide chart control items depending on chartConfig and control changes.
     *
     * @param control
     * @param chartConfig
     */
    var applyControlBehaviour = function (control, chartConfig) {

        control.find('.chart-add-chart-type').change(function (evt) {
            var show = control.find('.chart-add-chart-type').val() != 'pie' && control.find('.chart-add-chart-type').val() != 'doughnut';
            controlVisible(control, ['logarithmic', 'slider-facet', 'series-enabled', 'series-facet', 'series-ranges', 'include-other-series'], show);
            if (show) {
                //show controls that are enabled and apply to charts that are not pie or doughnut
                control.find('.chart-add-slider-enabled').change();
                control.find('.chart-add-value-type').change();
                control.find('.chart-add-series-facet').change();
                control.find('.chart-add-series-enabled').change();
            }
        });
        control.find('.chart-add-chart-type').change();

        control.find('.chart-add-series-enabled').change(function (evt) {
            var show = control.find('.chart-add-series-enabled').prop('checked');
            controlVisible(control, ['series-facet', 'series-ranges', 'series-fq', 'include-other-series'], show);
            if (show) {
                control.find('.chart-add-series-facet').change();
            }
        });
        control.find('.chart-add-series-enabled').change();

        control.find('.chart-add-slider-enabled').change(function (evt) {
            controlVisible(control, ['slider-facet'], control.find('.chart-add-slider-enabled').prop('checked'));
        });
        control.find('.chart-add-slider-enabled').change();

        control.find('.chart-add-hide-empty-values').change(function (evt) {
            controlVisible(control, ['empty-value-msg'], !control.find('.chart-add-hide-empty-values').prop('checked'));
        });
        control.find('.chart-add-hide-empty-values').change();

        control.find('.chart-add-value-type').change(function (evt) {
            controlVisible(control, ['value-facet'], control.find('.chart-add-value-type').val() != 'count');
        });
        control.find('.chart-add-value-type').change();

        control.find('.chart-add-facet').change(function (evt) {
            var show = $.inArray(facetLookup(control.find('.chart-add-facet').val()).dataType, ['long', 'tlong', 'int', 'tint', 'double', 'tdouble', 'date', 'tdate']) >= 0;
            controlVisible(control, ['value-ranges'], show);
            if (show) {
                getMinMax(chartConfig, control.find('.chart-add-facet').val(), function (minMax) {
                    if (facetLookup(control.find('.chart-add-facet').val()).dataType == 'tdate') {
                        var d1 = new Date(minMax[0]).toISOString().slice(0,10);
                        var d2 = new Date(minMax[1]).toISOString().slice(0,10);
                        var label = d1 + ' to ' + d2;
                        control.find('.chart-add-value-ranges').attr("placeholder", label);
                        control.find('.chart-add-value-ranges').attr("title", label);
                    } else {
                        control.find('.chart-add-value-ranges').attr("placeholder", minMax[0] + ' to ' + minMax[1]);
                        control.find('.chart-add-value-ranges').attr("title", minMax[0] + ' to ' + minMax[1]);
                    }
                });
            } else {
                control.find('.chart-add-value-ranges').val('');
            }
        });
        control.find('.chart-add-facet').change();

        control.find('.chart-add-series-facet').change(function (evt) {
            if (control.find('.chart-add-series-enabled').prop('checked')) {
                var show = $.inArray(facetLookup(control.find('.chart-add-series-facet').val()).dataType, ['long', 'tlong', 'int', 'tint', 'double', 'tdouble', 'date', 'tdate']) >= 0;
                controlVisible(control, ['series-ranges'], show);
                controlVisible(control, ['series-fq', 'include-other-series'], !show);
                if (show) {
                    var select = control.find('.chart-add-series-fq').multiselect('destroy');
                    select.empty();
                    control.find('.chart-add-series-fq').val('');

                    getMinMax(chartConfig, control.find('.chart-add-series-facet').val(), function (minMax) {
                        if (facetLookup(control.find('.chart-add-series-facet').val()).dataType == 'tdate') {
                            var d1 = new Date(minMax[0]).toISOString().slice(0,10);
                            var d2 = new Date(minMax[1]).toISOString().slice(0,10);
                            var label = d1 + ' to ' + d2;
                            control.find('.chart-add-series-ranges').attr("placeholder", label);
                            control.find('.chart-add-series-ranges').attr("title", label);
                        } else {
                            control.find('.chart-add-series-ranges').attr("placeholder", minMax[0] + ' to ' + minMax[1]);
                            control.find('.chart-add-series-ranges').attr("title", minMax[0] + ' to ' + minMax[1]);
                        }
                    });
                } else {
                    control.find('.chart-add-series-ranges').val('');

                    getFacetValues(chartOptions.query, chartOptions.facetQueries, chartOptions.queryContext, chartConfig.filter,
                        control.find('.chart-add-series-facet').val(), function (list) {
                            //rebuild select
                            var select = control.find('.chart-add-series-fq').multiselect('destroy');
                            select.empty();
                            select.attr('multiple', true);
                            $.each(list, function (key, value) {
                                //hide empty label item because we cannot OR with fqs like -facet:*
                                if (value.count > 0 && value.label && value.label.length > 0) {
                                    var item = $("<option/>").attr('value', value.fq).text(value.label);
                                    if ($.inArray(value.fq, chartConfig.seriesFq) >= 0) item.attr('selected', true);
                                    select.append(item);
                                }
                            });
                            select.multiselect({
                                maxHeight: 300,
                                numberDisplayed: 1
                            });

                        });
                }
            } else {
                controlVisible(control, ['series-ranges', 'series-fq', 'include-other-series'], false);
            }
        });
        control.find('.chart-add-series-facet').change();
    };

    var getFacetValues = function(query, facetQueries, queryContext, additionalFilter, facet, callback) {

        //default search service
        var queryUrl = chartOptions.biocacheServiceUrl + "/occurrences/search.json?q=" + query + "&qc=" + queryContext +
            "&pageSize=0&flimit=100&facet=true&facets=" + facet;

        if(additionalFilter) {
            queryUrl = queryUrl + '&' + additionalFilter;
        }

        $.ajax({
            url: queryUrl,
            type: 'GET',
            error: function(xhr, status, error) {
                alert("error");
            },
            success: function(data) {
                callback(data.facetResults[0].fieldResult);
            },
            error: function(data) {
                //return no data instead of error
                callback([]);
            }
        });
    };

    /**
     * Set the visibility of a chart control.
     *
     * @param control
     * @param list
     * @param visible
     */
    var controlVisible = function (control, list, visible) {
        $.each (list, function (key, value) {
            var g = control.find('.chart-add-' + value).closest('.chart-add-group');
            if (visible) g.show();
            else g.hide();
        })
    };

    /**
     * Get a facet definition. This is sourced from biocache-service /index/fields.
     *
     * @param facet
     * @returns {*}
     */
    var facetLookup = function (facet) {
        for (var key in _facets) {
            if (_facets[key].name == facet) {
                return _facets[key];
            }
        }
        return {};
    };

    /**
     * Add a new chart.
     *
     * @param event
     */
    var addChart = function(event) {
        var options = getChartConfig($(event.target).closest('.chart-add'));

        createChart(options.facet, options);

        //save with a unique name
        var i = 0;
        while (chartOptions.charts[i + '*' + options.facet] !== undefined) i++;
        chartOptions.charts[i + '*' + options.facet] = options;

        if (chartOptions.chartControlsCallback) {
            chartOptions.chartControlsCallback(chartOptions);
        }
    };

    /**
     * Update config of an existing chart.
     *
     * @param event
     */
    var applyChartChanges = function(event) {
        var divId = $(event.target).closest('.chart').attr('id');
        var $topDiv = $('#' + divId);
        for (var key in chartOptions.charts) {
            if (chartOptions.charts[key].divId == divId) {
                var options = getChartConfig($topDiv);

                options.divId = divId;

                chartOptions.charts[key] = options;

                if (chartOptions.chartControlsCallback) {
                    chartOptions.chartControlsCallback(chartOptions);
                }

                //create new chart
                createChart(options.facet, options);
            }
        }
    };

    /**
     * Get chart config from chart controls.
     *
     * @param $topDiv
     * @returns {{title: *, facet: *, valueFacet: *, valueType: *, chartType: *, emptyValueMsg: *, hideEmptyValues: *, seriesEnabled: *, sliderEnabled: *, valueRanges: *, seriesFacet: *, seriesRanges: *, sliderFacet: *, logarithmic: *}}
     */
    var getChartConfig = function ($topDiv) {
        return  {
            title: $topDiv.find('.chart-add-title').val(),
            large: $topDiv.find('.chart-add-large').prop('checked'),
            facet: $topDiv.find('.chart-add-facet').val(),
            valueFacet: $topDiv.find('.chart-add-value-facet').val(),
            valueType: $topDiv.find('.chart-add-value-type').val(),
            chartType: $topDiv.find('.chart-add-chart-type').val(),
            emptyValueMsg: $topDiv.find('.chart-add-empty-value-msg').val(),
            hideEmptyValues: $topDiv.find('.chart-add-hide-empty-values').prop('checked'),
            seriesEnabled: $topDiv.find('.chart-add-series-enabled').prop('checked'),
            sliderEnabled: $topDiv.find('.chart-add-slider-enabled').prop('checked'),
            valueRanges: $topDiv.find('.chart-add-value-ranges').val(),
            seriesFacet: $topDiv.find('.chart-add-series-facet').val(),
            seriesRanges: $topDiv.find('.chart-add-series-ranges').val(),
            sliderFacet: $topDiv.find('.chart-add-slider-facet').val(),
            logarithmic: $topDiv.find('.chart-add-logarithmic').prop('checked'),
            seriesFq: $topDiv.find('.chart-add-series-fq').val(),
            includeOtherSeries: $topDiv.find('.chart-add-include-other-series').prop('checked'),
            includeOther: $topDiv.find('.chart-add-include-other').prop('checked')
        };
    };

    /**
     * Get the min and max values for a facet.
     *
     * @param chartConfig
     * @param facet
     * @param successCallback executes when a min/max is found with input array [min, max]
     * @param failureCallback executes when there is no data in the query.
     */
    var getMinMax = function(chartConfig, facet, successCallback, failureCallback) {

        if (facet) {
            //setup chart config to fetch min/max of facet
            var config = jQuery.extend(true, {}, chartConfig);
            config.valueType = 'max';
            config.valueFacet = facet;
            config.facet = null;
            config.seriesEnabled = false;
            config.sliderFq = '';
            config.valueRanges = [];

            wsCallAndRender(config, chartOptions.query, config.facet, chartOptions.facetQueries, chartOptions.queryContext, config.filter, config.divId, function (data) {
                if (data.length > 0 && data[0].data.length > 0) {
                    successCallback([data[0].data[0]['min'], data[0].data[0]['max']]);
                } else if (failureCallback) {
                    failureCallback();
                }
            });
        } else {
            if (failureCallback) failureCallback();
        }
    };

    /**
     * Toggle visibility of add chart controls.
     *
     * @param event
     */
    var toggleAddControls = function(event) {
        // $(event.target).parent().find('#chartControls').children('.chart-add:first').toggle();
        $(event.target).parent().children('.chart-add:first').toggle();
    };

    //init facets before controls
    $.ajax({
        url: chartOptions.biocacheServiceUrl + '/index/fields.json',
        type: 'GET',
        error: function(xhr, status, error) {
            console.log('unable to get index/fields')
        },
        success: function(data) {
            _facets = data.sort(function(o1, o2) {
                var name1 = ((o1.description)?o1.description: o1.name).toLowerCase();
                var name2 = ((o2.description)?o2.description: o2.name).toLowerCase();
                return (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0;
            });

            //console.log('init chart controls');

            if (chartOptions.chartControls) {
                var ctrl = $('<div/>').append($('<button>Toggle Chart Controls</button>').addClass('chart-controls-toggle').addClass('btn').click(toggleAddControls))
                $('#' + chartsDivId).prepend(ctrl);
                createControl( ctrl, false, {}, {});
                //$('#' + chartsDivId).parent().prepend(btn); // place outside the row-fluid div so charts don't get moved/nudged

                //hide controls
                ctrl.children('.chart-add:first').toggle();
            }
        }
    });

    //create the charts
    $.each(chartOptions.charts, function(facet, chartConfig){
        //support charts where facet is defined in chartConfig
        if (chartConfig.facet === undefined) {
            createChart(facet, chartConfig)
        } else {
            createChart(chartConfig.facet, chartConfig)
        }
    });

    // activate BS tooltip (will work for dynamically generated content)
    $('body').tooltip({
        selector: '.hint'
    });
};
