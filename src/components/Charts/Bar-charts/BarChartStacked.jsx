import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChartStacked = () => {
  const [chartData] = useState({
    series: [
      {
        name: "Q1 Budget",
        group: "budget",
        color: "#80c7fd",
        data: [44000, 55000, 41000, 67000, 22000],
      },
      {
        name: "Q1 Actual",
        group: "actual",
        color: "#008FFB",
        data: [48000, 50000, 40000, 65000, 25000],
      },
      {
        name: "Q2 Budget",
        group: "budget",
        color: "#80f1cb",
        data: [13000, 36000, 20000, 8000, 13000],
      },
      {
        name: "Q2 Actual",
        group: "actual",
        color: "#00E396",
        data: [20000, 40000, 25000, 10000, 12000],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: false, // <--- tambahkan ini untuk menghapus zoom & menu download
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      dataLabels: {
        formatter: (val) => {
          return val / 1000 + "K";
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: [
          "Online advertising",
          "Sales Training",
          "Print advertising",
          "Catalogs",
          "Meetings",
        ],
        labels: {
          formatter: (val) => {
            return val / 1000 + "K";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        clusterGroupedSeriesOrientation: "horizontal",
        horizontalAlign: "left",
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

export default BarChartStacked;
