###    [![Build Status](https://travis-ci.org/AtlasOfLivingAustralia/ala-charts-plugin.svg?branch=master)](https://travis-ci.org/AtlasOfLivingAustralia/ala-charts-plugin)

## Usage instructions

To use the plugin you need to set up a external JSON configuration file for the charts.
Heres an example

```
{ biocache : {
    "cl1000" : {
        "title": "By habitat",
        "chartType": "doughnut",
        "emptyValueMsg": "Habitat not specified",
        "hideEmptyValues" : true
    },
    "month" : {
        "title": "By month",
        "chartType": "bar",
        "emptyValueMsg": "Month not specified",
        "hideEmptyValues" : true
    },
    "year" : {
        "title": "Since 1990",
        "chartType": "bar",
        "emptyValueMsg": "Year not specified",
        "hideEmptyValues" : true,
        "filter": "fq=year:[1990 TO *]"
    },
    "decade" : {
        "title": "By decade",
        "chartType": "bar",
        "emptyValueMsg": "Year not specified",
        "hideEmptyValues" : true
    },
    "data_resource_uid" : {
        "title": "By dataset",
        "chartType": "horizontal-bar"
    },
    "data_provider_uid" : {
        "title": "By data partner",
        "chartType": "horizontal-bar",
        "emptyValueMsg": "Partner not specified",
        "hideEmptyValues" : true
    }
}}
```

## Configuration options

* title: The title to display over the top of this chart
* chartType: one of "horizontal-bar", "bar" or "doughnut"
* emptyValueMsg: What to display for a field name if non available,
* hideEmptyValues : Whether to hide empty values e.g. month not supplied

For biocache charts, the name of the chart must be an indexed and public field.

## Rendering the charts

To use the grails taglib to render the charts:

```
<r:script>
    <charts:biocache
        biocacheServiceUrl="http://biocache.ala.org.au/ws"
        biocacheWebappUrl="http://biocache.ala.org.au"
        q="Macropus rufus"
        qc=""
        fq=""
    />    
</r:script>

```
