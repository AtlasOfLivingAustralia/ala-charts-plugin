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
    colors : [
        "#8B2635",
        "#D2D4C8", 
        "#D3EFBD",
        "#BCE784",
        "#5DD39E",
        "#348AA7", 
        "#525174",
        "#513B56",
        "#656839",
        "#26547C",
        "#8A8E91",
        "#BDD9BF"
    ],
    legendTemplate: "<ul style=\"list-style-type:none;\" class=\"ala-<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
};

ALA.BiocacheCharts = function (chartsDivId, chartOptions) {

    Doughnut = function (query, facetQueries, queryContext, facet, title){

        var divId = createCanvasAndLegend(facet, title);

        wsCallAndRender(query, facet, facetQueries, queryContext, function(data){

            var items = [];
            $.each( data.facetResults[0].fieldResult, function(key, result) {
                items.push({
                    value: result.count,
                    color: ALA.ChartConstants.colors[(key + 1) % ALA.ChartConstants.colors.length-1],
                    highlight: ALA.ChartConstants.highlightColor,
                    label: result.label
                });
            });

            var $canvas = $('#' + divId).find('canvas');
            var ctx = $canvas.get(0).getContext("2d");

            var doughnut = new Chart(ctx).Doughnut(items, {
                responsive: true,
                multiTooltipTemplate: "Chart title",
                legendTemplate: ALA.ChartConstants.legendTemplate
            });

            $('#' + divId).find('.chart-legend').get(0).innerHTML = doughnut.generateLegend();

            $canvas.click (
                function(evt){
                    var activePoints = doughnut.getSegmentsAtEvent(evt);
                    var url = chartOptions.biocacheWebappUrl + "/occurrences/search?q=" + query + "&fq=" + facet + ":" + activePoints[0].label;
                    window.location.href = url;
                }
            );
        });
    }

    HorizBar = function (query, facetQueries, queryContext, facet, title){

        var divId = createCanvasAndLegend(facet, title);

        wsCallAndRender(query, facet, facetQueries, queryContext, function(data){

            var labelToFq = {};

            var datastructure = {
                labels : [],
                datasets : [{
                    label: "My dataset",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: []
                }]
            };

            $.each( data.facetResults[0].fieldResult, function(key, result) {

                var prettifiedLabel = result.label.substring(0, 80);
                if(result.label.trim() == "")	{
                    prettifiedLabel = "Not available";
                }

                datastructure.labels.push(prettifiedLabel);
                datastructure.datasets[0].data.push(result.count);

                if(result.fq){
                    labelToFq[prettifiedLabel] = result.fq;
                } else {
                    labelToFq[prettifiedLabel] = facet + ":" + result.label;
                }
            });

            var $canvas = $('#' + divId).find('canvas');
            var ctx = $canvas.get(0).getContext("2d");
            var horizBar = new Chart(ctx).HorizontalBar(datastructure, {responsive: true});

            $canvas.click (
                function(evt){
                    var activePoints = horizBar.getBarsAtEvent(evt);
                    var url = chartOptions.biocacheWebappUrl + "/occurrences/search?q=" + query + "&fq=" + labelToFq[activePoints[0].label];
                    window.location.href = url;
                }
            );
        });
    }

    Bar = function (query, facetQueries, queryContext, facet, title){

        var divId = createCanvasAndLegend(facet, title);

        wsCallAndRender(query, facet, facetQueries, queryContext, function(data){

            var labelToFq = {};

            //prepare Chart.js data structure
            var datastructure = {
                labels : [],
                datasets : [{
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: []
                }]
            };

            //compile results from WS call
            $.each( data.facetResults[0].fieldResult, function(key, result) {

                var prettifiedLabel = result.label.substring(0, 80);
                if(result.label.trim() == "")	{
                    prettifiedLabel = "Not available";
                }

                datastructure.labels.push(prettifiedLabel);
                datastructure.datasets[0].data.push(result.count);

                if(result.fq){
                    labelToFq[prettifiedLabel] = result.fq;
                } else {
                    labelToFq[prettifiedLabel] = facet + ":" + result.label;
                }
            });

            var $canvas = $('#' + divId).find('canvas');
            var ctx = $canvas.get(0).getContext("2d");
            var bar = new Chart(ctx).Bar(datastructure, { responsive: true });

            $canvas.click (
                function(evt){
                    var activePoints = bar.getBarsAtEvent(evt);
                    var url = chartOptions.biocacheWebappUrl + "/occurrences/search?q=" + query + "&fq=" + labelToFq[activePoints[0].label];
                    window.location.href = url;
                }
            );
        });
    }

    function wsCallAndRender(query, facet, facetQueries, queryContext, dataCallback){

        var queryUrl = chartOptions.biocacheServiceUrl + "/occurrences/search.json?q=" + 
            query + "&pageSize=0&fsort=index&facets=" +
            facet + "&qc=" + queryContext;
        $.ajax({
            url: queryUrl,
            type: 'GET',
            error: function(xhr, status, error) {
                alert("error");
            },
            success: function(data) {
                dataCallback(data);
            }
        });
    }

    function createCanvasAndLegend(facet, title){
        var divId = facet + '-chart';
        var $topDiv = $('<div/>').addClass('chart').attr('id', divId);
        var $title = $('<h3/>').addClass('chart-title').html(title);
        var $canvas = $('<canvas/>').addClass('chart-canvas');
        var $legend = $('<div/>').addClass('chart-legend').addClass('ala-doughnut-legend');
        $topDiv.append($title).append($canvas).append($legend);
        $('#' + chartsDivId).append($topDiv);
        return divId;
    }

    //create the charts    
    $.each(chartOptions.charts, function(facet, chartConfig){
        if(chartConfig.chartType == "doughnut"){
            Doughnut(chartOptions.query, "", chartOptions.queryContext, facet, chartConfig.title);
        }
        if(chartConfig.chartType == "bar"){
            Bar(chartOptions.query, "", chartOptions.queryContext, facet, chartConfig.title);
        }
        if(chartConfig.chartType == "horizontal-bar"){
            HorizBar(chartOptions.query, "", chartOptions.queryContext, facet, chartConfig.title);
        }
    });
}