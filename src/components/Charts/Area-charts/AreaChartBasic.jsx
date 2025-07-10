import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const AreaChartBasic = () => {
  const [chartData] = useState({
    series: [
      {
        name: "Penjualan",
        data: [20, 30, 40, 50],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 300,
        toolbar: {
          show: false, // <--- tambahkan ini untuk menghapus zoom & menu download
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      fill: {
        opacity: 0.3,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr"],
      },
      yaxis: {
        min: 0,
        max: 50,
        tickAmount: 5,
        labels: {
          formatter: (value) => `${value}`,
        },
      },
      
      legend: {
        horizontalAlign: "left",
      },
    },
  });

  return (
    <div className="chart-box">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={275}
      />
    </div>
  );
};

export default AreaChartBasic;
