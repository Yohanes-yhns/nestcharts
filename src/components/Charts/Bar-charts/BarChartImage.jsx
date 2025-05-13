import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChartImage = () => {
  const [chartData] = useState({
    series: [
      {
        name: "coins",
        data: [
          2, 4, 3, 4, 3, 5, 5, 6.5, 6, 5, 4, 5, 8, 7, 7, 8, 8, 10, 9, 9, 12, 12,
          11, 12, 13, 14, 16, 14, 15, 17, 19, 21,
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 410,
        toolbar: {
          show: false, // <--- tambahkan ini untuk menghapus zoom & menu download
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "100%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
        colors: ["#000"],
      },
      labels: Array.apply(null, { length: 32 }).map(function (el, index) {
        return index + 1;
      }),
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
        title: {
          text: "Weight",
        },
      },
      grid: {
        position: "back",
      },
      fill: {
        type: "image",
        opacity: 0.87,
        image: {
          src: "https://cdn.pixabay.com/photo/2023/10/08/17/04/swirls-8302543_1280.jpg",
          width: 600,
          height: 600,
        },
      },
    },
  });

  return (
    <div className="chart-box">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={275}
      />
    </div>
  );
};

export default BarChartImage;
