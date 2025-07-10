import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ColumnChart = () => {
  const [chartData] = useState({
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    options: {
      chart: {
        type: "bar", // Ganti ke 'bar' untuk kolom vertikal
        height: 350,
        toolbar: {
          show: false, // <--- tambahkan ini untuk menghapus zoom & menu download
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
      yaxis: {
        min: 0,
        max: 160,
        tickAmount: 5,
        labels: {
          formatter: (value) => `${value}`,
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
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
        type="bar"
        height={275}
      />
    </div>
  );
};

export default ColumnChart;
