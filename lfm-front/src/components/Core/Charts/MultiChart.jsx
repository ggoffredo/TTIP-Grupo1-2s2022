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
import {Chart} from 'react-chartjs-2';

export default function MultiChart({data, customOptions}) {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        },
        ... customOptions
    };

    const labels = data[0].labels;

    const chartData = {
        labels,
        datasets: data.map((d) => { return {
            type: d.type,
            fill: d.fill, //TODO: Revisar
            label: d.title,
            data: d.values,
            borderColor: d.borderColor,
            backgroundColor: d.backgroundColor
        }})
    }

    return <Chart options={options} data={chartData}/>;
}