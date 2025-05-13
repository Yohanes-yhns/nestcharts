import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./ESLineChartBasic.module.css";
import Navbar from "../../components/Navbar";

const ESLineChartBasic = () => {
  const [categories, setCategories] = useState(["Jan", "Feb", "Mar", "Apr", "Mei"]);
  const [data, setData] = useState([20, 40, 30, 40, 10]);
  const [chartTitle, setChartTitle] = useState("Basic Line Chart");

  const handleCategoryChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const handleDataChange = (index, value) => {
    const newData = [...data];
    newData[index] = Number(value);
    setData(newData);
  };

  const handleAddRow = () => {
    setCategories([...categories, ""]);
    setData([...data, 0]);
  };

  const chartOptions = {
    chart: {
      height: 350,
      type: "line",
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "straight" },
    grid: {
      row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontFamily: "Poppins",
          colors: "#153448",
        },
      },
    },
    yaxis: {
      min: 0,
      tickAmount: 5,
      labels: {
        style: {
          fontFamily: "Poppins",
          colors: "#153448",
        },
      },
    },
  };

  const chartSeries = [{ name: "Custom Series", data }];

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.editorChartWrapper}>
        <div className={styles.editor}>
          <div className={styles.titleInputWrapper}>
            <label className={styles.chartTitleLabel}>Chart Title</label>
            <input
              type="text"
              className={styles.chartTitleInput}
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
            />
          </div>
          <table className={styles.inputTable}>
            <thead>
              <tr>
                <th>Input/Text</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((text, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => handleCategoryChange(index, e.target.value)}
                      placeholder="Label"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={data[index]}
                      onChange={(e) => handleDataChange(index, e.target.value)}
                      placeholder="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className={styles.addButton} onClick={handleAddRow}>
            + Add Row
          </button>
        </div>
        <div className={styles.chart}>
          <h3 className={styles.chartTitle}>{chartTitle}</h3>
          <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={300} />
        </div>
      </div>
      <button className={styles.downloadButton}>
        Download Chart
      </button>
    </div>
  );
};

export default ESLineChartBasic;
