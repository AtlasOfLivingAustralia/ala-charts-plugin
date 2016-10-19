modules = {
    charts {
        dependsOn 'bootstrapToggle'
        resource url: [dir: "js", file: "Chart.min.js", plugin: "ala-charts-plugin"]
        resource url: [dir: "js", file: "Chart.HorizontalBar.js", plugin: "ala-charts-plugin"]
        resource url: [dir: "js", file: "ALAChart.js", plugin: "ala-charts-plugin"]
        resource url: [dir: "css", file: "ALAChart.css", plugin: "ala-charts-plugin"]
    }

    bootstrapToggle {
        dependsOn 'bootstrap'
        resource url: [dir: "css", file: "bootstrap2-toggle.min.css", plugin: "ala-charts-plugin"]
        //resource url: [dir: "css", file: "bootstrap-toggle.min.css", plugin: "ala-charts-plugin"] // BS3 version
        resource url: [dir: "js", file: "bootstrap2-toggle.min.js", plugin: "ala-charts-plugin"]
    }
}