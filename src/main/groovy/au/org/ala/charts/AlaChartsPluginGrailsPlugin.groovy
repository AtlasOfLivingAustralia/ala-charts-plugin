package au.org.ala.charts

import grails.plugins.Plugin

class AlaChartsPluginGrailsPlugin extends Plugin{
    def grailsVersion = "3.2.11 > *"
    def pluginExcludes = [
            "grails-app/views/error.gsp"
    ]
    def title = "ALA Charts Plugin"
    def author = "AtlasOfLivingAustralia"
    def authorEmail = "support@ala.org.au"
    def description = "Standard ALA Charts implementation"
}