import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChartBasic = () => {
  const [chartData] = useState({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false, // <--- tambahkan ini untuk menghapus zoom & menu download
        },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "straight" },
      grid: {
        row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 },
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
        ],
        labels: {
          style: {
            fontFamily: "Poppins",
            colors: "#153448",
          },
        },
      },
      yaxis: {
        min: 0, // Menyusun batas minimum sumbu Y dari 0
        max: 160, // Menyusun batas maksimum sumbu Y agar lebih sesuai dengan data
        tickAmount: 5, // Menambahkan jumlah interval tick pada sumbu Y
        labels: {
          formatter: (value) => `${value}`,// Menampilkan nilai sumbu Y
          style: {
            fontFamily: "Poppins",
            colors: "#153448",
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
        type="line"
        height={275}
      />
    </div>
  );
};

export default LineChartBasic;
