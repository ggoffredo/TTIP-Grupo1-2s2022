import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

export default function DoughnutChart({data}) {
    ChartJS.register(ArcElement, Tooltip, Legend);
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
                label: '# of Votes',
                data: Object.values(data),
                backgroundColor: backgroundColors.slice(0, Object.keys(data).length),
                borderColor: borderColors.slice(0, Object.keys(data).length),
                borderWidth: 1,
            },
        ]
    };

    return <div>
        <Doughnut data={chartData} />
    </div>
}