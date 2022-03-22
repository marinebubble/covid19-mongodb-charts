import React, { useEffect, useRef, useState } from 'react';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

function Chart({height, width, filter, chartId}) {
    const sdk = new ChartsEmbedSDK({ baseUrl: 'https://charts.mongodb.com/charts-open-data-covid-19-zddgb'})
    const chartDiv = useRef(null);
    const [rendered, setRendered] = useState(false);
    const [chart] = useState(sdk.createChart({ height: height, width: width, chartId: chartId, theme:"dark"}));

    useEffect(() => {
        chart.render(chartDiv.current)
            .then(() => setRendered(true))
            .catch(err => console.log("Error during Charts rendering.", err));
    }, [chart]);

    // in order to not execute useEffect if the chart isn't done rendering,
    // use if rendered condition.
    useEffect(() => {
        if (rendered) {
            chart.setFilter(filter)
                .catch(err => console.log("Error while filtering", err));
        }
    }, [chart, filter, rendered])

    return (
        <div className="chart" ref={chartDiv} />
    )
}

export default Chart;