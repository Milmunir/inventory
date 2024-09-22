// import { Chart } from "chart.js/auto";


export function buildChart(chartId, chartType, chartData, chartOptions) {
    const ctx = document.getElementById(chartId);
    console.log(chartId);
    console.log(chartType);
    console.log(chartData);
    console.log(chartOptions);
    const can = ctx.getContext('2d');
    console.log(can);
    new Chart(ctx, {
        type: chartType,  // Chart type can be 'bar', 'line', etc.
        data: chartData,  // Pass dynamic data
        options: chartOptions  // Pass dynamic options
    });
}