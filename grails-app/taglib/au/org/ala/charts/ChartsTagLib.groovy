package au.org.ala.charts

import grails.converters.JSON
import grails.util.Metadata
import groovy.json.JsonSlurper
import org.springframework.context.i18n.LocaleContextHolder
import org.springframework.context.MessageSource

/**
 * Taglib for rendering charts
 */
class ChartsTagLib {
    MessageSource messageSource

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
            chartControlsCallback: attrs.chartControlsCallback,
            chartNoDataLabel: messageSource.getMessage("charts.biocache.noDataLabel",null, "No data to display", LocaleContextHolder.getLocale())
        ]

        def chartVariableName = attrs.chartVariableName ?: 'chartConfig'

        out << "var ${chartVariableName} = ${(jsonConfig as JSON).toString()};"
        if (attrs?.autoLoad != 'false')
            out << "var charts = ALA.BiocacheCharts('charts', chartConfig);"
    }

    private Object getChartConfig() {
        if (chartsConfig == null) {
            def appName = Metadata.current.'info.app.name'
            def pref = grailsApplication.config.charts.uriPrefix?:''

            def configPath = "${pref}/data/${appName}/config/charts.json"
            //def configPath = "/data/${appName}/config/charts.json"
            def js = new JsonSlurper()
            chartsConfig = js.parse(new FileReader(new File(configPath)))
        }

        for (recList in chartsConfig) {
            for (rec in recList.value) {
                if (rec.value?.title) {
                    def i18nKey = "charts.${recList.key}.${rec.key}"
                    def msg = messageSource.getMessage("$i18nKey",null, "${rec.value.title}", LocaleContextHolder.getLocale())
                    rec.value.title = msg
                    def i18nKeyNo = "charts.${recList.key}.${rec.key}.novalue"
                    def msgNo = messageSource.getMessage("$i18nKeyNo",null, "${rec.value.emptyValueMsg}", LocaleContextHolder.getLocale())
                    rec.value.emptyValueMsg = msgNo
                }
            }
        }
        chartsConfig
    }
}