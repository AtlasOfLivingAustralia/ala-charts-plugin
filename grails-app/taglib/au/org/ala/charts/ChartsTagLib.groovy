package au.org.ala.charts

import grails.converters.JSON
import grails.util.Metadata
import groovy.json.JsonSlurper

/**
 * Taglib for rendering charts
 */
class ChartsTagLib {

    static namespace = "charts"

    static chartsConfig = null

    /**
     * Render the specified charts
     */
    def biocache = { attrs ->

        def jsonConfig = [
            biocacheServiceUrl : attrs.biocacheServiceUrl,  // 'http://records-ws.als.scot'
            biocacheWebappUrl : attrs.biocacheWebappUrl,    // 'http://records.als.scot'
            query : attrs.q ?: '*:*',                       // 'lsid:\"${tc.taxonConcept.guid}\"'
            queryContext : attrs.qc ?: '',                  // 'cl2:Scotland'
            facetQueries : attrs.fq ?: [],
            charts : getChartConfig().biocache,
            chartControls : attrs.chartControls ?: false,
            chartControlsCallback: attrs.chartControlsCallback
        ]

        def chartVariableName = attrs.chartVariableName ?: 'chartConfig'

        out << "var ${chartVariableName} = ${(jsonConfig as JSON).toString()};"
        if (attrs?.autoLoad != 'false')
            out << "var charts = ALA.BiocacheCharts('charts', chartConfig);"
    }

    private Object getChartConfig() {
        if (chartsConfig == null) {
            def appName = Metadata.current.'info.app.name'
            def configPath = "/data/${appName}/config/charts.json"
            def js = new JsonSlurper()
            chartsConfig = js.parse(new FileReader(new File(configPath)))
        }
        chartsConfig
    }
}