import {Doughnut} from 'react-chartjs-2';

export default function DoughnutChart({data}) {
    const backgroundColors = [
        'rgba(255, 99, 132)',
        'rgba(54, 162, 235)',
        'rgba(255, 206, 86)',
        'rgba(75, 192, 192)',
        'rgba(153, 102, 255)',
        'rgba(255, 159, 64)',
    ];

    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: '# of Votes',
                data: Object.values(data),
                backgroundColor: backgroundColors.slice(0, Object.keys(data).length),
                borderColor: '#FFFFFF',
                hoverBorderColor: '#FFFFFF',
                borderWidth: 8,
            },
        ]
    };

    return <div>
        <Doughnut data={chartData}/>
    </div>
}