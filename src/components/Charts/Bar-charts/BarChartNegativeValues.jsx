import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChartNegativeValues = () => {
  const [chartData] = useState({
    series: [
      {
        name: "Males",
        data: [
          1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3, 4.1, 4.2, 4.5, 3.9, 3.5, 3,
        ],
      },
      {
        name: "Females",
        data: [
          -1.4, -2.2, -2.85, -3.7, -3.96, -4.22, -4.3, -4.4, -4.1, -4, -4.1,
          -3.4, -3.1, -2.8,
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 440,
        stacked: true,
        toolbar: {
          show: false, // <--- tambahkan ini untuk menghapus zoom & menu download
        },
      },
      colors: ["#008FFB", "#FF4560"],
      plotOptions: {
        bar: {
          borderRadius: 5,
          borderRadiusApplication: "end", // 'around', 'end'
          borderRadiusWhenStacked: "all", // 'all', 'last'
          horizontal: true,
          barHeight: "80%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },

      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      yaxis: {
        stepSize: 1,
      },
      tooltip: {
        shared: false,
        x: {
          formatter: function (val) {
            return val;
          },
        },
        y: {
          formatter: function (val) {
            return Math.abs(val) + "%";
          },
        },
      },
      xaxis: {
        categories: [
          "70+",
          "65-69",
          "60-64",
          "55-59",
          "50-54",
          "45-49",
          "40-44",
          "35-39",
          "30-34",
          "25-29",
          "20-24",
          "15-19",
          "10-14",
          "5-9",
          "0-4",
        ],
        title: {
          text: "Percent",
        },
        labels: {
          formatter: function (val) {
            return Math.abs(Math.round(val)) + "%";
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

export default BarChartNegativeValues;
