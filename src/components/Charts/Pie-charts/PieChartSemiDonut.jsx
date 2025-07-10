import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChartSemiDonut = () => {
  const [chartData] = useState({
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: "donut",
        toolbar: {
          show: false, // <--- tambahkan ini untuk menghapus zoom & menu download
        },
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10,
        },
      },
      grid: {
        padding: {
          bottom: -100,
        },
      },
      legend: {
        position: "bottom",
        offsetY: -100,
      },
    },
  });

  return (
    <div className="chart-box">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        height={275}
      />
    </div>
  );
};

export default PieChartSemiDonut;
