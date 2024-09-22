"use client"
import Head from 'next/head';
import { useEffect } from 'react';
import { buildChart } from './chart';

export default function ChartBuilder(params) {
    useEffect(() => {
        console.log(params);
        
        // Load Chart.js from CDN
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.async = true;
        script.onload = () => {
            // Define dynamic data for the chart
            const chartData = {
                labels: params.data.map((data) => data[params.x]),
                datasets: [{
                    label: `${params.datatype}: `,
                    data: params.data.map((data) => data[params.datatype])
                }]
            };
            console.log(chartData);
            
            // Define dynamic options for the chart
            const chartOptions = {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            };
            // Call createChart with dynamic values
            buildChart(params.canvasid, params.chartype, chartData, chartOptions)
        };
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script); // Cleanup script on unmount
        };
    }, [params]);

    return (
        <>
            <div className="w-full aspect-square">
                <h3 className='text-center'>{params.title}</h3>
                <div className='w-full h-full'>
                    <canvas id={params.canvasid} width={100+'%'} height={100+'%'}></canvas>
                </div>
            </div>
            
        </>
    );
};
