package au.org.ala.charts

import grails.converters.JSON
import groovy.json.JsonSlurper

class BiocacheChartsTagLib {

    static namespace = "charts"

    /**
     * Render the specified charts
     */
    def biocache = { attrs ->

        def appName = grails.util.Metadata.current.'app.name'

        def configPath = "/data/${appName}/config/charts.json"

        def js  = new JsonSlurper()
        def chartsConfig = js.parse(new FileReader(new File(configPath)))

        def jsonConfig = [
            biocacheServiceUrl : attrs.biocacheServiceUrl,  // 'http://records-ws.als.scot'
            biocacheWebappUrl : attrs.biocacheWebappUrl,    // 'http://records.als.scot'
            query : attrs.q ?: '*:*',                       // 'lsid:\"${tc.taxonConcept.guid}\"'
            queryContext : attrs.qc ?: '',                  // 'cl2:Scotland'
            facetQueries : attrs.fq ?: [],
            charts : chartsConfig
        ]

        out << "var chartConfig = ${(jsonConfig as JSON).toString()};"
        out << "var charts = ALA.BiocacheCharts('charts', chartConfig);"
    }
}