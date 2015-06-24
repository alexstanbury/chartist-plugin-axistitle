# Axis title plugin for Chartist.js

This plugin allows the creation and placement of axis titles. The plugin will throw an error if it is applied to a chart
that contains no axises, such as a Pie chart.

## Available options and their defaults

```javascript
var defaultOptions = {
  // The title to be displayed on the axis. If at least one axis title is not supplied then an error is thrown.
  axisTitle: '',
  
  // One or more class names to be added to the axis title. Multiple class names should be separated by a space.
  axisClass: 'ct-axis-title',
  
  // How much to offset the title by.
  offset: {x:0, y:0},
  
  // Defines the anchoring of the title text. Possible values are 'start', 'end' and 'middle'.
  textAnchor: 'middle',

  // Whether to flip the direction of the text. Note - This can only be used on axis Y.
  flipText : false
  
};
```

## Sample usage

```javascript
var chart = new Chartist.Line('.ct-chart', {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            series: [[20000, 30000, 35000, 32000, 40000, 42000, 50000, 62000, 80000, 94000, 100000, 120000],
                [10000, 15000, 12000, 14000, 20000, 23000, 22000, 24000, 21000, 18000, 30000, 32000]]
        }, {
            plugins: [
                Chartist.plugins.ctAxisTitle({
                    axisX: {
                        axisTitle: 'Double',
                        axisClass: 'ct-axis-title',
                        offset: {
                            x: 0,
                            y: 50
                        },
                        textAnchor: 'start'
                    },
                    axisY: {
                        axisTitle: 'Single',
                        axisClass: 'ct-axis-title',
                        offset: {
                            x: 0,
                            y: 0
                        },
                        textAnchor: 'end',
                        flipTitle: true
                    }
                })
            ]
        });
```