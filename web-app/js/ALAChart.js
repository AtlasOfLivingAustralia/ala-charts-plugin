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
    Doughnut = function (query, facetQueries, queryContext, facet, chartConfig){

        var divId = createCanvasAndLegend(facet, chartConfig.title);

        wsCallAndRender(query, facet, facetQueries, queryContext, chartConfig.filter, function(data){

            var items = [];
            $.each( data.facetResults[0].fieldResult, function(key, result) {

                var segmentColor = ALA.ChartConstants.colors[(key + 1) % (ALA.ChartConstants.colors.length-1)];
                var segmentHighlight = blendColors(segmentColor, "#FFFFFF", 85);

                if(!(chartConfig.hideEmptyValues && result.label == "")){
                    items.push({
                        value: result.count,
                        color: segmentColor,
                        highlight: segmentHighlight,
                        label: result.label
                    });
                }
            });

            var $canvas = $('#' + divId).find('canvas');
            var ctx = $canvas.get(0).getContext("2d");

            var doughnut = new Chart(ctx).Doughnut(items, {
                responsive: true,
                multiTooltipTemplate: chartConfig.title,
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
    HorizBar = function (query, facetQueries, queryContext, facet, chartConfig){

        var divId = createCanvasAndLegend(facet, chartConfig.title);

        wsCallAndRender(query, facet, facetQueries, queryContext, chartConfig.filter, function(data){

            var labelToFq = {};

            var datastructure = {
                labels : [],
                datasets : [{
                    label: chartConfig.title,
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: []
                }]
            };

            $.each( data.facetResults[0].fieldResult, function(key, result) {

                if(!(chartConfig.hideEmptyValues && result.label == "")){
                    var prettifiedLabel = result.label.substring(0, 80);
                    if(result.label.trim() == "")   {
                        prettifiedLabel = chartConfig.emptyValueMsg ? chartConfig.emptyValueMsg : 'Not available';
                    }

                    datastructure.labels.push(prettifiedLabel);
                    datastructure.datasets[0].data.push(result.count);

                    if(result.fq){
                        labelToFq[prettifiedLabel] = result.fq;
                    } else {
                        labelToFq[prettifiedLabel] = facet + ":" + result.label;
                    }
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
    Bar = function (query, facetQueries, queryContext, facet, chartConfig){

        var divId = createCanvasAndLegend(facet, chartConfig.title);

        wsCallAndRender(query, facet, facetQueries, queryContext, chartConfig.filter, function(data){

            var labelToFq = {};

            //prepare Chart.js data structure
            var datastructure = {
                labels : [],
                datasets : [{
                    label: chartConfig.title,
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: []
                }]
            };

            //compile results from WS call
            $.each( data.facetResults[0].fieldResult, function(key, result) {

                if(!(chartConfig.hideEmptyValues && result.label == "")){
                    var prettifiedLabel = result.label.substring(0, 80);
                    if(result.label.trim() == "")   {
                        prettifiedLabel = chartConfig.emptyValueMsg ? chartConfig.emptyValueMsg : 'Not available';
                    }

                    datastructure.labels.push(prettifiedLabel);
                    datastructure.datasets[0].data.push(result.count);

                    if(result.fq){
                        labelToFq[prettifiedLabel] = result.fq;
                    } else {
                        labelToFq[prettifiedLabel] = facet + ":" + result.label;
                    }
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

    /**
     * Function that wraps the WS call to retrieve a facet
     *
     * @param query
     * @param facet
     * @param facetQueries
     * @param queryContext
     * @param additionalFilter
     * @param dataCallback the callback function to use if data available
     */
    function wsCallAndRender(query, facet, facetQueries, queryContext, additionalFilter, dataCallback){

        if(query == "" || query == undefined) {
            query = "*:*";
        }

        var queryUrl = chartOptions.biocacheServiceUrl + "/occurrences/search.json?q=" +
            query + "&pageSize=0&flimit=-1&fsort=index&facets=" +
            facet + "&qc=" + queryContext;

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
                if(data && data.facetResults && data.facetResults.length > 0){
                    dataCallback(data);
                }
            }
        });
    }

    function blendColors(c0, c1, p) {
        var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
        return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
    }

    /**
     * Create the canvas and legend elements.
     *
     * @param facet
     * @param title
     * @returns {string}
     */
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
            Doughnut(chartOptions.query, chartOptions.facetQueries, chartOptions.queryContext, facet, chartConfig);
        }
        if(chartConfig.chartType == "bar"){
            Bar(chartOptions.query, chartOptions.facetQueries, chartOptions.queryContext, facet, chartConfig);
        }
        if(chartConfig.chartType == "horizontal-bar"){
            HorizBar(chartOptions.query, chartOptions.facetQueries, chartOptions.queryContext, facet, chartConfig);
        }
    });
}