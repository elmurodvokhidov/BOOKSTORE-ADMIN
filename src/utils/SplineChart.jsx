import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function SplineChart({ data }) {
    const [series] = useState([{
        name: 'foydalanuvchi',
        data: data?.map((_, index) => index + 1)
    }]);

    const [options] = useState({
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: data?.map(item => item.createdAt)
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            }
        },
        colors: ['#1f2937']
    });

    return (
        <div className="w-full">
            <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
    );
}