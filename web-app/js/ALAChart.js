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

                console.log("key: " + key  + " = " + ( (key + 1) % (ALA.ChartConstants.colors.length-1) )) ;
                var segmentColor = ALA.ChartConstants.colors[(key + 1) % (ALA.ChartConstants.colors.length-1)];
                var segmentHighlight = blendColors(segmentColor, "#FFFFFF", 85);
                console.log("key: " + key + " " + segmentColor + " " + segmentHighlight);

                items.push({
                    value: result.count,
                    color: segmentColor,
                    highlight: segmentHighlight,
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
                    label: title,
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: []
                }]
            };

            $.each( data.facetResults[0].fieldResult, function(key, result) {

                var prettifiedLabel = result.label.substring(0, 80);
                if(result.label.trim() == "")   {
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
                    label: title,
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
                if(result.label.trim() == "")   {
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

    function blendColors(c0, c1, p) {
        var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
        return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
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