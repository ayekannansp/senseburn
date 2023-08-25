import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function ChartData() {
    const data = {
        datasets: [{
            data: [10, 20, 30],
            backgroundColor: ['#9BA4B5', '#ff6b6b', '#b194e2'],
            label: 'My dataset',borderColor: "#fff"

        }],
        borderWidth: 0,
        labels: ['Muscle', 'Fat', 'Skin']
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'My Polar Area Chart'
        },
        legend: {
            display: false,
            position: 'right'
        },
        scales: {
            xAxes: [{
                ticks: { display: false },
                gridLines: {
                    display: false,
                    drawBorder: false
                }
            }],
            yAxes: [{
                ticks: { display: false },
                gridLines: {
                    display: false,
                    drawBorder: false
                }
            }]
        }
    };
    return (
        <div style={{width:'420px', height:'420px'}}>
            <PolarArea data={data} options={options}  />
        </div>

    )
}

export default ChartData