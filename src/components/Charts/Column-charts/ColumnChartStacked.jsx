import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ColumnChartStacked = () => {
  const [chartData] = useState({
    series: [
      {
        name: "PRODUCT A",
        data: [44, 55, 41, 67],
      },
      {
        name: "PRODUCT B",
        data: [13, 23, 20, 8],
      },
      {
        name: "PRODUCT C",
        data: [11, 17, 15, 15],
      },
      {
        name: "PRODUCT D",
        data: [21, 7, 25, 13],
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
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          borderRadiusApplication: "end",
          borderRadiusWhenStacked: "last",
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories: [
          "01/01/2011 GMT",
          "01/02/2011 GMT",
          "01/03/2011 GMT",
          "01/04/2011 GMT",
        ],
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
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

export default ColumnChartStacked;
