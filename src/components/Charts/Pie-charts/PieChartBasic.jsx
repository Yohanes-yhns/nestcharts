import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChartBasic = () => {
  const [chartData] = useState({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        type: "pie",
        toolbar: {
          show: false, // <--- tambahkan ini untuk menghapus zoom & menu download
        },
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      legend: {
        position: "bottom",
        offsetY: -10,
      }
    },
  });

  return (
    <div className="chart-box">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        height={275}
      />
    </div>
  );
};

export default PieChartBasic;
