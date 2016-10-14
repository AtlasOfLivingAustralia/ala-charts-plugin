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

    /**
     * Constructor for the Doughnut chart.
     *
     * @param query
     * @param facetQueries
     * @param queryContext
     * @param facet
     * @param chartConfig
     * @constructor
     */
    var Doughnut = function (query, facetQueries, queryContext, facet, valueRanges, valueType, valueFacet, chartConfig){

        var divId = createCanvasAndLegend(facet, chartConfig.title, chartConfig);

        if (chartConfig && !chartConfig.hideOnce) {
            wsCallAndRender(query, facet, valueRanges, valueType, valueFacet, facetQueries, queryContext, chartConfig.filter, divId, function(data, type){

                var items = [];
                $.each(data, function (key, result) {

                    var segmentColor = ALA.ChartConstants.colors[(key + 1) % (ALA.ChartConstants.colors.length - 1)];
                    var segmentHighlight = blendColors(segmentColor, "#FFFFFF", 85);

                    if (result.label == null) result.label = "";
                    if (!(chartConfig.hideEmptyValues && result.label == "") && result["count"] > 0) {
                        var prettifiedLabel = result.label.substring(0, 80);
                        if (result.label.trim() == "") {
                            prettifiedLabel = chartConfig.emptyValueMsg ? chartConfig.emptyValueMsg : 'Not available';
                        }
                        items.push({
                            value: result[type],
                            color: segmentColor,
                            highlight: segmentHighlight,
                            label: prettifiedLabel
                        });
                    }
                });

                var $canvas = $('#' + divId).find('canvas');

                if (items.length > 0) {
                    var ctx = $canvas.get(0).getContext("2d");

                    var doughnut = new Chart(ctx).Doughnut(items, {
                        responsive: true,
                        multiTooltipTemplate: chartConfig.title,
                        legendTemplate: ALA.ChartConstants.legendTemplate
                    });

                    $('#' + divId).find('.chart-legend').get(0).innerHTML = doughnut.generateLegend();

                    $canvas.click(
                        function (evt) {
                            var activePoints = doughnut.getSegmentsAtEvent(evt);
                            var url = chartOptions.biocacheWebappUrl + "/occurrences/search?q=" + query + "&fq=" + facet + ":" + activePoints[0].label;
                            window.location.href = url;
                        }
                    );
                } else {
                    $canvas.parent().append($("<label>No data to display</label>").addClass('chart-no-data-label'));

                    $canvas.parent().find('.chart-canvas').detach();
                    $canvas.parent().find('.chart-legend').detach();
                }
            });
        } else {
            delete chartConfig.hideOnce
        }
    }

    /**
     * Constructor for the horizontal bar chart
     *
     * @param query
     * @param facetQueries
     * @param queryContext
     * @param facet
     * @param chartConfig
     * @constructor
     */
    var HorizBar = function (query, facetQueries, queryContext, facet, valueRanges, valueType, valueFacet, chartConfig){

        var divId = createCanvasAndLegend(facet, chartConfig.title, chartConfig);

        if (chartConfig && !chartConfig.hideOnce) {
            wsCallAndRender(query, facet, valueRanges, valueType, valueFacet, facetQueries, queryContext, chartConfig.filter, divId, function (data, type) {
        
                var labelToFq = {};

                var datastructure = {
                    labels: [],
                    datasets: [{
                        label: chartConfig.title,
                        fillColor: "rgba(151,187,205,0.5)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(151,187,205,0.75)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: []
                    }]
                };

                $.each(data, function (key, result) {

                    if (result.label == null) result.label = "";
                    if (!(chartConfig.hideEmptyValues && result.label == "") && result["count"] > 0) {
                        var prettifiedLabel = result.label.substring(0, 80);
                        if (result.label.trim() == "") {
                            prettifiedLabel = chartConfig.emptyValueMsg ? chartConfig.emptyValueMsg : 'Not available';
                        }

                        datastructure.labels.push(prettifiedLabel);
                        datastructure.datasets[0].data.push(result[type]);

                        if (result.fq) {
                            labelToFq[prettifiedLabel] = result.fq;
                        } else {
                            labelToFq[prettifiedLabel] = facet + ":" + result.label;
                        }
                    }
                });

                var $canvas = $('#' + divId).find('canvas');

                if (datastructure.datasets[0].data.length > 0) {
                    var ctx = $canvas.get(0).getContext("2d");
                    var horizBar = new Chart(ctx).HorizontalBar(datastructure, {responsive: true});

                    $canvas.click(
                        function (evt) {
                            var activePoints = horizBar.getBarsAtEvent(evt);
                            var url = chartOptions.biocacheWebappUrl + "/occurrences/search?q=" + query + "&fq=" + labelToFq[activePoints[0].label];
                            window.location.href = url;
                        }
                    );
                } else {
                    $canvas.parent().append($("<label>No data to display</label>").addClass('chart-no-data-label'));

                    $canvas.parent().find('.chart-canvas').detach();
                    $canvas.parent().find('.chart-legend').detach();
                }
            });
        } else {
            delete chartConfig.hideOnce
        }
    };

    /**
     * Constructor for the Bar chart.
     *
     * @param query
     * @param facetQueries
     * @param queryContext
     * @param facet
     * @param chartConfig
     * @constructor
     */
    var Bar = function (query, facetQueries, queryContext, facet, valueRanges, valueType, valueFacet, chartConfig){

        var divId = createCanvasAndLegend(facet, chartConfig.title, chartConfig);

        if (chartConfig && !chartConfig.hideOnce) {

            wsCallAndRender(query, facet, valueRanges, valueType, valueFacet, facetQueries, queryContext, chartConfig.filter, divId, function (data, type) {

                var labelToFq = {};

                //prepare Chart.js data structure
                var datastructure = {
                    labels: [],
                    datasets: [{
                        label: chartConfig.title,
                        fillColor: "rgba(151,187,205,0.5)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(151,187,205,0.75)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: []
                    }]
                };

                //compile results from WS call
                $.each(data, function (key, result) {

                    if (result.label == null) result.label = "";
                    if (!(chartConfig.hideEmptyValues && result.label == "") && result["count"] > 0) {
                        var prettifiedLabel = result.label.substring(0, 80);
                        if (result.label.trim() == "") {
                            prettifiedLabel = chartConfig.emptyValueMsg ? chartConfig.emptyValueMsg : 'Not available';
                        }

                        datastructure.labels.push(prettifiedLabel);
                        datastructure.datasets[0].data.push(result[type]);

                        if (result.fq) {
                            labelToFq[prettifiedLabel] = result.fq;
                        } else {
                            labelToFq[prettifiedLabel] = facet + ":" + result.label;
                        }
                    }
                });

                var $canvas = $('#' + divId).find('canvas');

                if (datastructure.datasets[0].data.length > 0) {
                    var ctx = $canvas.get(0).getContext("2d");
                    var bar = new Chart(ctx).Bar(datastructure, {responsive: true});

                    $canvas.click(
                        function (evt) {
                            var activePoints = bar.getBarsAtEvent(evt);
                            var url = chartOptions.biocacheWebappUrl + "/occurrences/search?q=" + query + "&fq=" + labelToFq[activePoints[0].label];
                            window.location.href = url;
                        }
                    );
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
     * Function that wraps the WS call to retrieve a facet
     *
     * @param query
     * @param facet
     * @param valueType
     * @param valueFacet
     * @param facetQueries
     * @param queryContext
     * @param additionalFilter
     * @param dataCallback the callback function to use if data available
     */
    var wsCallAndRender = function(query, facet, valueRanges, valueType, valueFacet, facetQueries, queryContext, additionalFilter, divId, dataCallback){

        if(query == "" || query == undefined) {
            query = "*:*";
        }

        console.log('calling chart')
        var valueParam = "";
        if (valueType && valueType.length > 0 && valueType != "count") {
            valueParam = "&stats=" + valueFacet;
        } else {
            valueType = "count";
        }

        var xranges =  (valueRanges && valueRanges.length>0) ? "&xranges=" + valueRanges : ""

        //default search service
        var queryUrl = chartOptions.biocacheServiceUrl + "/chart?q=" + query +
            "&x=" + facet + xranges +"&qc=" + queryContext + valueParam;

        if(additionalFilter) {
            queryUrl = queryUrl + '&' + additionalFilter;
        }

        $('#' + divId).find('.chart-loading').show()

        $.ajax({
            url: queryUrl,
            type: 'GET',
            error: function(xhr, status, error) {
                alert("error");
            },
            success: function(data) {
                if(data && data.length > 0){
                    dataCallback(data, valueType, xranges != "" );
                }
            },
            complete: function() {
                $('#' + divId).find('.chart-loading').hide()
            }
        });
    }

    function blendColors(c0, c1, p) {
        var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
        return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
    }

    var chartCounter = 0;

    /**
     * Create the canvas and legend elements.
     *
     * @param facet
     * @param title
     * @returns {string}
     */
    var createCanvasAndLegend = function(facet, title, chartConfig){
        var divId = facet + '-chart-' + chartCounter;
        var $topDiv;
        if (chartConfig && chartConfig.divId && $('#' + chartConfig.divId).size() > 0) {
            //top div already exists, replace contents
            divId = chartConfig.divId;
            $topDiv = $('#' + divId);
            $topDiv.empty();
        } else {
            chartConfig.divId = divId;
            chartCounter++;
            $topDiv = $('<div/>').addClass('chart').attr('id', divId);
        }

        var $title = $('<h3/>').addClass('chart-title').html(title);
        var $canvas = $('<canvas/>').addClass('chart-canvas');
        var $legend = $('<div/>').addClass('chart-legend').addClass('ala-doughnut-legend');

        var $progress = $('<label>loading...</label>').addClass('chart-loading');

        if (chartOptions.chartControls) {
            var $delete = $('<button>delete</button>').addClass('btn').addClass('btn-xs').addClass('btn-mini').addClass('btn-danger').click(deleteChart);
            var $edit = $('<button>edit</button>').addClass('btn').addClass('btn-xs').addClass('btn-mini').click(editChart);
            var $hide = $('<button>hide</button>').addClass('btn').addClass('btn-xs').addClass('btn-mini').click(hideChart);
            var $show = $('<button>show</button>').addClass('btn').addClass('btn-xs').addClass('btn-mini').click(showChart);
            $topDiv.append($title).append($delete).append($edit).append($hide).append($show);
        } else {
            $topDiv.append($title)
        }
        
        if (chartConfig && !chartConfig.hideOnce) {
            $topDiv.append($canvas).append($legend).append($progress);
        }

        $('#' + chartsDivId).append($topDiv);
        return divId;
    }

    function deleteChart(event) {
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

    function hideChart(event) {
        var chart = $(event.target).closest('.chart');
        chart.children('.chart-canvas').hide()
        chart.children('.chart-legend').hide()
        chart.children('.chart-no-data-label').hide()

    }

    function showChart(event) {
        var chart = $(event.target).closest('.chart');

        if (chart.children('.chart-canvas').size() == 0 && chart.children('.chart-canvas').size() == 0) {
            //create chart
            var divId = chart.attr('id');
            for (var key in chartOptions.charts) {
                if (chartOptions.charts[key].divId == divId) {
                    createChart(chartOptions.charts[key].facet, chartOptions.charts[key]);
                }
            }
        } else {
            chart.children('.chart-canvas').show()
            chart.children('.chart-legend').show()
            chart.children('.chart-no-data-label').show()
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
                    createControl($(event.target).closest('.chart'), true, chartOptions.charts[key]);
                }

            }
        } else {
            showChart(event);
            chart.children('.chart-add').detach();
        }
    }

    var createChart = function(facet, chartConfig) {
        console.log(facet)
        console.log(chartConfig)
        if (chartConfig.chartType == "doughnut") {
            Doughnut(chartOptions.query, chartOptions.facetQueries, chartOptions.queryContext, facet, chartConfig.valueRanges, chartConfig.valueType, chartConfig.valueFacet, chartConfig);
        }
        if (chartConfig.chartType == "bar") {
            Bar(chartOptions.query, chartOptions.facetQueries, chartOptions.queryContext, facet, chartConfig.valueRanges, chartConfig.valueType, chartConfig.valueFacet, chartConfig);
        }
        if (chartConfig.chartType == "horizontal-bar") {
            HorizBar(chartOptions.query, chartOptions.facetQueries, chartOptions.queryContext, facet, chartConfig.valueRanges, chartConfig.valueType, chartConfig.valueFacet, chartConfig);
        }
    }

    //create add chart control
    var createControl = function(parent, editchart, defaults) {
        var control = $('<div/>').addClass('chart-add');

        var defaultTitle = 'My chart';
        if (defaults && defaults.title) defaultTitle = defaults.title;
        var title = $('<div/>').addClass('chart-add-group').
            append($('<label>Title</label>').addClass('chart-add-label')).
            append($('<input/>').addClass('chart-add-title').val(defaultTitle));

        var valueTypeSelect = $('<select/>').addClass('chart-add-value-type');
        var valueType =$('<div/>').addClass('chart-add-group').
            append($('<label>Value</label>').addClass('chart-add-label')).
            append(valueTypeSelect);
        $([ 'count', 'sum', 'max', 'min', 'mean', 'missing', 'stddev' ]).each(function (key, value) {
            valueTypeSelect.append($("<option/>").attr('value', value).text(value));
        });
        if (defaults && defaults.valueType) valueTypeSelect.val(defaults.valueType);

        var valueFacetSelect = $('<select/>').addClass('chart-add-value-facet');
        var valueFacet = $('<div/>').addClass('chart-add-group').
            append($('<label>Value facet (when not "count")</label>').addClass('chart-add-label')).
            append(valueFacetSelect);
        if (defaults && defaults.facet) valueFacetSelect.val(defaults.facet);

        var facetSelect = $('<select/>').addClass('chart-add-facet');
        var facet = $('<div/>').addClass('chart-add-group').
            append($('<label>Facet</label>').addClass('chart-add-label')).
            append(facetSelect);

        var valueRanges = $('<div/>').addClass('chart-add-group').
        append($('<label>Value ranges</label>').addClass('chart-add-label')).
        append($('<input/>').addClass('chart-add-value-ranges').val(''));
        if (defaults && defaults.valueRanges) valueFacetSelect.val(defaults.valueRanges);

        var button = $('<button>Add new chart</button>').addClass('chart-add-button').click(addChart);

        var chartTypeSelect = $('<select/>').addClass('chart-add-chart-type');
        var chartType =$('<div/>').addClass('chart-add-group').
            append($('<label>Chart type</label>').addClass('chart-add-label')).
            append(chartTypeSelect);
        $([ 'bar', 'horizontal-bar', 'doughnut' ]).each(function (key, value) {
            chartTypeSelect.append($("<option/>").attr('value', value).text(value));
        });
        if (defaults && defaults.chartType) chartTypeSelect.val(defaults.chartType);

        var defaultEmptyValueMsg = 'Unknown'
        if (defaults && defaults.emptyValueMsg) defaultEmptyValueMsg = defaults.emptyValueMsg;
        var emptyValueMsg = $('<div/>').addClass('chart-add-group').
            append($('<label>Empty value message</label>').addClass('chart-add-label')).
            append($('<input/>').addClass('chart-add-empty-value-msg').val(defaultEmptyValueMsg));

        var defaultHideEmptyValues = true
        if (defaults && defaults.hideEmptyValues) defaultHideEmptyValues = defaults.hideEmptyValues;
        var hideEmptyValues = $('<div/>').addClass('chart-add-group').
            append($('<label>Hide empty values</label>').addClass('chart-add-label')).
            append($('<input/>').addClass('chart-hide-empty-values').attr('type', 'checkbox').prop('checked', defaultHideEmptyValues));

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
        control.append(facet);
        control.append(valueType);
        control.append(valueRanges);
        control.append(valueFacet);
        control.append(button);
        control.append(hideEmptyValues);
        control.append(emptyValueMsg);
        control.append(button);

        parent.append(control);

        $.ajax({
            url: chartOptions.biocacheServiceUrl + '/index/fields',
            type: 'GET',
            error: function(xhr, status, error) {
                alert("error");
            },
            success: function(data) {
                if(data && data.length > 0){

                    $(data).each(function (key, value) {
                        if (value.indexed) {
                            facetSelect.append($("<option/>").attr('value', value.name).text(value.name));

                            if (value.dataType == 'int' || value.dataType == 'double') {
                                valueFacetSelect.append($("<option/>").attr('value', value.name).text(value.name));
                            }
                        }
                    });

                    if (defaults && defaults.facet) facetSelect.val(defaults.facet);
                    if (defaults && defaults.valueFacet) valueFacetSelect.val(defaults.valueFacet);
                }
            }
        });
    }

    var addChart = function(event) {
        var options = {
            title: $('.chart-add-title').val(),
            facet: $('.chart-add-facet').val(),
            valueFacet: $('.chart-add-value-facet').val(),
            valueType: $('.chart-add-value-type').val(),
            chartType: $('.chart-add-chart-type').val(),
            emptyValueMsg: $('.chart-add-empty-value-msg').val(),
            hideEmptyValues: $('.chart-hide-empty-values').val() == 'on',
            valueRanges: $('.chart-add-value-ranges').val()
        }

        console.log(options);

        createChart(options.facet, options);

        //save with a unique name
        var i = 0;
        while (chartOptions.charts[i + '*' + options.facet] !== undefined) i++;
        chartOptions.charts[i + '*' + options.facet] = options;

        if (chartOptions.chartControlsCallback) {
            chartOptions.chartControlsCallback(chartOptions);
        }
    };

    var applyChartChanges = function(event) {
        var divId = $(event.target).closest('.chart').attr('id');
        var $topDiv = $('#' + divId);
        for (var key in chartOptions.charts) {
            if (chartOptions.charts[key].divId == divId) {
                var options = {
                    title: $topDiv.find('.chart-add-title').val(),
                    facet: $topDiv.find('.chart-add-facet').val(),
                    valueFacet: $topDiv.find('.chart-add-value-facet').val(),
                    valueType: $topDiv.find('.chart-add-value-type').val(),
                    chartType: $topDiv.find('.chart-add-chart-type').val(),
                    emptyValueMsg: $topDiv.find('.chart-add-empty-value-msg').val(),
                    hideEmptyValues: $topDiv.find('.chart-hide-empty-values').val() == 'on',
                    divId: divId
                };

                chartOptions.charts[key] = options;

                if (chartOptions.chartControlsCallback) {
                    chartOptions.chartControlsCallback(chartOptions);
                }

                //create new chart
                createChart(options.facet, options);
            }
        }
    };

    var toggleAddControls = function(event) {
        $(event.target).parent().children('.chart-add:first').toggle();
    }

    if (chartOptions.chartControls) {
        $('#' + chartsDivId).append($('<button>Toggle Chart Controls</button>').addClass('chart-controls-toggle').addClass('btn').click(toggleAddControls));
        createControl( $('#' + chartsDivId) );

        //hide controls
        $('#' + chartsDivId).children('.chart-add:first').toggle();
    }

    //create the charts
    $.each(chartOptions.charts, function(facet, chartConfig){
        //support charts where facet is defined in chartConfig
        if (chartConfig.facet === undefined) {
            createChart(facet, chartConfig)
        } else {
            createChart(chartConfig.facet, chartConfig)
        }
    });
};