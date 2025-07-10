import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChartImage = () => {
  const [chartData] = useState({
    series: [44, 33, 54, 45],
    options: {
      chart: {
        width: 380,
        type: "pie",
        toolbar: {
          show: false, // <--- tambahkan ini untuk menghapus zoom & menu download
        },
      },
      colors: ["#93C3EE", "#E5C6A0", "#669DB5", "#94A74A"],
      fill: {
        type: "image",
        opacity: 0.85,
        image: {
          src: "https://cdn.pixabay.com/photo/2023/10/08/17/04/swirls-8302543_1280.jpg",
          width: 25,
          imagedHeight: 25,
        },
      },
      stroke: {
        width: 4,
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#111"],
        },
        background: {
          enabled: true,
          foreColor: "#fff",
          borderWidth: 0,
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
        type="pie"
        height={275}
      />
    </div>
  );
};

export default PieChartImage;
