import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChartDonut = () => {
  const [chartData] = useState({
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: "donut",
        toolbar: {
          show: false, // <--- tambahkan ini untuk menghapus zoom & menu download
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
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

export default PieChartDonut;
