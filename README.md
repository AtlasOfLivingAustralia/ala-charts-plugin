###    [![Build Status](https://travis-ci.org/AtlasOfLivingAustralia/ala-charts-plugin.svg?branch=master)](https://travis-ci.org/AtlasOfLivingAustralia/ala-charts-plugin)

## Why ?

Charts are used in multiple places within the Atlas.
This is an attempt to standardise the display of chart information
across the ALA. This plugin is currently only supporting charts
on top of biocache services but could be extended to include other
services (e.g. logger services, ecodata services).

## Usage instructions

To use the plugin you need to set up a external JSON configuration file for the charts.
The configuration file should be placed in the location:

```
/data/{appName}/config/charts.json
```

Heres an example:

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
* filter: An additional query filter to be used in the search

For biocache charts, the name of the chart must be an indexed and public field.

## Rendering the charts

To use the grails taglib to render the charts:

```
<r:script>
    <charts:biocache
        biocacheServiceUrl="http://biocache.ala.org.au/ws"
        biocacheWebappUrl="http://biocache.ala.org.au"
        q="Macropus"
        qc=""
        fq=""
    />    
</r:script>

```
