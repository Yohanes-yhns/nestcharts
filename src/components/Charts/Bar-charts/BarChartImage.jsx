import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChartImage = () => {
  const [chartData] = useState({
    series: [
      {
        name: "coins",
        data: [
          12, 40, 33, 40, 30, 5, 50, 65, 65, 120, 40, 80,
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
        colors: ["#000"],
      },
      labels: Array.apply(null, { length: 12 }).map(function (el, index) {
        return index + 1;
      }),
      yaxis: {
        min: 0,
        labels: {
          style: {
            colors: "#153448",
          },
        }
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
