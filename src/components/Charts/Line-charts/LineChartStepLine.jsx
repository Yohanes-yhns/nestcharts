import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChartStepLine = () => {
  const [chartData] = useState({
    series: [
      {
        data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: false, // <--- tambahkan ini untuk menghapus zoom & menu download
        },
      },
      stroke: {
        curve: "stepline",
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        hover: {
          sizeOffset: 4,
        },
      },
      xaxis: {
        labels: {
          style: {
            fontFamily: "Poppins",
            colors: "#153448",
          },
        },
      },
      yaxis: {
        labels: {
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

export default LineChartStepLine;
