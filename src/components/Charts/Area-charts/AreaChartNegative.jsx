import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const AreaChartNegative = () => {
  const [chartData] = useState({
    series: [
      {
        data: [0, -41, 35, -51, 0, 62, -69, 32, -32, 54, 16, -50],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false, // <--- tambahkan ini untuk menghapus zoom & menu download
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      stroke: {
        width: 0,
      },
      plotOptions: {
        line: {
          colors: {
            threshold: 0,
            colorAboveThreshold: "#0088ee",
            colorBelowThreshold: "#ff0000",
          },
        },
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

export default AreaChartNegative;
