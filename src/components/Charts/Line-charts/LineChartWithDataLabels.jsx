import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChartWithDataLabels = () => {
  const [chartData] = useState({
    series: [
      {
        name: "High - 2013",
        data: [28, 29, 33, 36, 32, 32, 33],
      },
      {
        name: "Low - 2013",
        data: [12, 11, 14, 18, 17, 13, 13],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.5,
        },
        toolbar: {
          show: false, // <--- tambahkan ini untuk menghapus zoom & menu download
        },
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
          text: "Month",
          style: {
            fontFamily: "Poppins",
            color: "#153448",
            fontWeight : "600",
          },
        },
        labels: {
          style: {
            fontFamily: "Poppins",
            colors: "#153448",
          },
        },
      },
      yaxis: {
        title: {
          text: "Temperature",
          style: {
            fontFamily: "Poppins",
            color: "#153448",
            fontWeight : "600",
          },
        },
        min: 5,
        max: 50,
        tickAmount: 5,
        labels: {
          style: {
            fontFamily: "Poppins",
            colors: "#153448",
          },
        },
      },
      legend: {
        position: "top",
      },
    },
  });

  return (
    <div className="chart-box">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={250}
      />
    </div>
  );
};

export default LineChartWithDataLabels;
