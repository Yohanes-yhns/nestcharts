import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const RadialChartBasic = () => {
  const [chartData] = useState({
    series: [70],
    options: {
      chart: {
        type: "radialBar",
        toolbar: {
          show: false, // <--- tambahkan ini untuk menghapus zoom & menu download
        },
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
        },
      },
      labels: ["LABELS"],
    },
  });

  return (
    <div className="chart-box">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="radialBar"
        height={275}
      />
    </div>
  );
};

export default RadialChartBasic;
