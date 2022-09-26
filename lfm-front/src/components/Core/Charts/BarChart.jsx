import React from "react";
import {Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2';

export default function BarChart({data}) {
    ChartJS.register(CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend);
    const backgroundColors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
    ];
    const borderColors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
    ];

    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                data: Object.values(data),
                backgroundColor: backgroundColors.slice(0, Object.keys(data).length),
                borderColor: borderColors.slice(0, Object.keys(data).length),
                borderWidth: 1,
            },
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: false,
                labels: {
                    font: {
                        size: 88 //TODO: Revisar por que no toam el cambio de tamano
                    }
                },
            },
        },
    };

    return <div>
        <Bar options={options} data={chartData} />
    </div>
}