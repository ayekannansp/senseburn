import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
// import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: { position: 'top' },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
        // zoom: {
        //     wheel: { enabled: true, },
        //     pinch: { enabled: true },
        //     mode: 'xy',
        // }
    },
};

const MyLineChart = ({ data }) => {
    const frequency = data.frequency;
    const s11Re = data.s11Re;
    const s11Im = data.s11Im;
    const s21Re = data.s21Re;
    const s21Im = data.s21Im;
    const chartData = {
        labels: frequency,
        datasets:
            [{ label: 's11 Real', data: s11Re, borderColor: 'rgba(75,192,192,1)', fill: false },
            { label: 's11 Imaginary', data: s11Im, borderColor: 'rgba(255,0,0,1)', fill: false },
            { label: 's21 Real', data: s21Re, borderColor: 'rgba(0,0,255,1)', fill: false },
            { label: 's21 Imaginary', data: s21Im, borderColor: 'rgba(255,165,0,1)', fill: false }]
    };

    return <Line data={chartData} options={options} />;
};
export default MyLineChart;