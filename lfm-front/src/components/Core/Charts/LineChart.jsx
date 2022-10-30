import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import {Line} from 'react-chartjs-2';

export default function LineChart({data, customOptions}) {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        },
        ...customOptions
    };

    const labels = data.labels;

    const chartData = {
        labels,
        datasets: [
            {
                label: data.title,
                data: data.values,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    };

    return <Line options={options} data={chartData}/>;
}