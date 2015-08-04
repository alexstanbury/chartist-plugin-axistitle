(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (root['Chartist.plugins.ctAxisTitle'] = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['Chartist.plugins.ctAxisTitle'] = factory();
  }
}(this, function () {

/**
 * Chartist.js plugin to display a title for 1 or 2 axises.
 *
 */
/* global Chartist */
(function (window, document, Chartist) {
    'use strict';

    var axisDefaults = {
        title: '',
        className: 'ct-axis-title',
        offset: {
            x: 0,
            y: 0
        },
        textAnchor: 'middle',
        flipText: false
    };

    var defaultOptions = {
        axisX:  Chartist.extend({}, axisDefaults),
        axisY:  Chartist.extend({}, axisDefaults)
    };

    function getTitle(title) {
        if (title instanceof Function) {
            return title();
        }

        return title;
    }

    //as axisX will usually be at the bottom, set it to be below the labels
    defaultOptions.axisX.offset.y = 40;

    //this will stop the title text being slightly cut off at the bottom.
    //TODO - implement a cleaner fix.
    defaultOptions.axisY.offset.y = -1;

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.title = function (options) {

        options = Chartist.extend({}, defaultOptions, options);

        return function title(chart) {

            chart.on('created', function (data) {

                if (!options.axisX.title && !options.axisY.title) {
                    throw new Error('Chartist axisTitle plugin - You must provide at least one axis title');
                } else if (!data.axisX && !data.axisY) {
                    throw new Error('Chartist axisTitle plugin can only be used on charts that have at least one axis');
                }

                var xPos;
                var yPos;
                var title;

                //position axis X title
                if (options.axisX.title && data.axisX) {

                    xPos = (data.axisX.axisLength / 2) + data.options.axisY.offset + data.options.chartPadding.left;

                    yPos = data.options.chartPadding.top;

                    if (data.options.axisY.position === 'end') {
                        xPos -= data.options.axisY.offset;
                    }

                    if (data.options.axisX.position === 'end') {
                        yPos += data.axisY.axisLength;
                    }

                    title = new Chartist.Svg("text");
                    title.addClass(options.axisX.className);
                    title.text(getTitle(options.axisX.title));
                    title.attr({
                        x: xPos + options.axisX.offset.x,
                        y: yPos + options.axisX.offset.y,
                        "text-anchor": options.axisX.textAnchor
                    });

                    data.svg.append(title, true);

                }

                //position axis Y title
                if (options.axisY.title && data.axisY) {
                    xPos = 0;


                    yPos = (data.axisY.axisLength / 2) + data.options.chartPadding.top;

                    if (data.options.axisX.position === 'start') {
                        yPos += data.options.axisX.offset;
                    }

                    if (data.options.axisY.position === 'end') {
                        xPos = data.axisX.axisLength;
                    }

                    var transform = 'rotate(' + (options.axisY.flipTitle ? -90 : 90) + ', ' + xPos + ', ' + yPos + ')';

                    title = new Chartist.Svg("text");
                    title.addClass(options.axisY.className);
                    title.text(getTitle(options.axisY.title));
                    title.attr({
                        x: xPos + options.axisY.offset.x,
                        y: yPos + options.axisY.offset.y,
                        transform: transform,
                        "text-anchor": options.axisY.textAnchor
                    });

                    data.svg.append(title, true);

                }

            });
        };
    };

}(window, document, Chartist));

return Chartist.plugins.ctAxisTitle;

}));
