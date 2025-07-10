import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const AreaChartSpline = () => {
  const [chartData] = useState({
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        type: "area",
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
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height:200,
          }
        }
      }
    ]
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

export default AreaChartSpline;
