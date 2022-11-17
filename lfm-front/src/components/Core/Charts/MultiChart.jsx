import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Filler
} from 'chart.js';
import {Chart} from 'react-chartjs-2';
import {useRef} from "react";
import {trigger} from "../../../helpers/Events";

export default function MultiChart({data, customOptions}) {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

    const chartRef = useRef(null);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        },
        ...customOptions
    };

    const labels = data[0].labels;

    const chartData = {
        labels,
        datasets: data.map((d) => { return {
            type: d.type,
            fill: d.fill,
            label: d.title,
            data: d.values,
            borderColor: d.borderColor,
            backgroundColor: d.backgroundColor
        }})
    }

    const plugin = {
        id: "custom_canvas_background_color",
        beforeDraw: (chart) => {
            const ctx = chart.canvas.getContext("2d");
            ctx.save();
            ctx.globalCompositeOperation = "destination-over";
            ctx.fillStyle = 'rgba(255,193,99,0.32)';
            ctx.fillRect(chart.chartArea.left, chart.chartArea.top, (chart.chartArea.width/2), (chart.chartArea.height));
            ctx.restore();
        }
    };

    const handleClick = (e) => {
        const points = chartRef.current.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
        if (points.length) {
            const firstPoint = points[0];
            const label = chartRef.current.data.labels[firstPoint.index];
            const value = chartRef.current.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
            trigger('chartClick', {label: label, value: value, clientX: e.clientX, clientY: e.clientY})
        }
    }
    return <Chart ref={chartRef} options={options} data={chartData} onClick={handleClick} plugins={[plugin]}/>
}