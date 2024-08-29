import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function PieChart() {
    const [series] = useState([44, 55, 13, 43, 22]);
    const [options] = useState({
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    });

    return (
        <div className="w-2/5">
            <ReactApexChart options={options} series={series} type="pie" width={380} />
        </div>
    )
}