import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: { position: "top" },
        title: {
            display: true,
            text: "",
        },
    },
};

const MyLineChart = ({ data }) => {
    const [chartData, setChartData] = useState(data);
    const [modelData, setModelData] = useState({
        labels: [],
        datasets: [
            {
                label: "s11 Real",
                data: [],
                borderColor: "rgba(75,192,192,1)",
                fill: false,
            },
            {
                label: "s11 Imaginary",
                data: [],
                borderColor: "rgba(255,0,0,1)",
                fill: false,
            },
            {
                label: "s21 Real",
                data: [],
                borderColor: "rgba(0,0,255,1)",
                fill: false,
            },
            {
                label: "s21 Imaginary",
                data: [],
                borderColor: "rgba(255,165,0,1)",
                fill: false,
            },
        ],
    });

    useEffect(() => {
        setChartData(data);

        const frequency = data?.frequency;
        const s11Re = data?.s11Re;
        const s11Im = data?.s11Im;
        const s21Re = data?.s21Re;
        const s21Im = data?.s21Im;

        setModelData({
            labels: frequency,
            datasets: [
                {
                    label: "s11 Real",
                    data: s11Re,
                    borderColor: "rgba(75,192,192,1)",
                    fill: false,
                },
                {
                    label: "s11 Imaginary",
                    data: s11Im,
                    borderColor: "rgba(255,0,0,1)",
                    fill: false,
                },
                {
                    label: "s21 Real",
                    data: s21Re,
                    borderColor: "rgba(0,0,255,1)",
                    fill: false,
                },
                {
                    label: "s21 Imaginary",
                    data: s21Im,
                    borderColor: "rgba(255,165,0,1)",
                    fill: false,
                },
            ],
        });
    }, [data]);

    return <Line data={modelData} options={options} />;
};
export default MyLineChart;
