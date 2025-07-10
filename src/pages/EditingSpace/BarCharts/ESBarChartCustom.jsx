import React, { useState, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./ESBarChartCustom.module.css";
import Navbar from "../../../components/Navbar";
import html2canvas from "html2canvas";

const ESBarChartCustom = () => {
  const chartPreviewRef = useRef(null);

  const [categories, setCategories] = useState([
    "South Korea",
    "Canada",
    "United Kingdom",
    "Netherlands",
    "Italy",
    "France",
    "Japan",
    "United States",
    "China",
    "Germany",
  ]);
  const [data, setData] = useState([
    400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380,
  ]);
  const [chartTitle, setChartTitle] = useState("Custom Bar Chart");
  const [titleAlign, setTitleAlign] = useState("center");
  const [xAxisTitle, setXAxisTitle] = useState("Total");
  const [yAxisTitle, setYAxisTitle] = useState("Country");
  const [isBold, setIsBold] = useState(false);
  const [fontColor, setFontColor] = useState("#153448");
  const [fontFamily, setFontFamily] = useState("Poppins");
  const [fontSize, setFontSize] = useState(18);
  const [barColors, setBarColors] = useState([
    "#33b2df",
    "#546E7A",
    "#d4526e",
    "#13d8aa",
    "#A5978B",
    "#2b908f",
    "#f9a3a4",
    "#90ee7e",
    "#f48024",
    "#69d2e7",
  ]);

  // Handlers
  const handleInputChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const handleDataChange = (index, value) => {
    const newData = [...data];
    const parsedValue = parseFloat(value);
    newData[index] = isNaN(parsedValue) ? 0 : parsedValue;
    setData(newData);
  };

  const handleColorChange = (index, value) => {
    const newColors = [...barColors];
    newColors[index] = value;
    setBarColors(newColors);
  };

  const handleAddRow = () => {
    setCategories([...categories, ""]);
    setData([...data, 0]);
    setBarColors([...barColors, "#000000"]);
  };

  const handleRemoveRow = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
    setData(data.filter((_, i) => i !== index));
    setBarColors(barColors.filter((_, i) => i !== index));
  };

  // Chart Options
  const chartOptions = {
    chart: {
      height: 350,
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
      },
    },
    colors: barColors,
    title: {
      text: chartTitle,
      align: titleAlign,
      style: {
        fontWeight: isBold ? "bold" : "normal",
        fontFamily,
        color: fontColor,
        fontSize: `${fontSize}px`,
      },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "straight" },
    grid: {
      row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 },
    },
    xaxis: {
      categories,
      title: {
        text: xAxisTitle,
        style: {
          fontFamily,
          colors: "#153448",
          fontWeight: "600",
        },
      },
    },
    yaxis: {
      title: {
        text: yAxisTitle,
        style: {
          fontFamily,
          colors: "#153448",
          fontWeight: "600",
        },
      },
    },
  };

  const seriesName = "Custom Series";

  const chartSeries = [{ name: "Custom Series", data }];

  const handleDownload = async () => {
    if (!chartPreviewRef.current) return;
    const canvas = await html2canvas(chartPreviewRef.current, {
      scale: 3,
      useCORS: true,
    });

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "chart-hd.png";
    link.click();
  };


  const isValid =
    categories.length === data.length &&
    data.length === barColors.length &&
    data.every((d) => typeof d === "number" && !isNaN(d));

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.editorText}>
        {/* Input Title & Style */}
        <div className={styles.titleInputWrapper}>
          <label className={styles.chartTitleLabel}>Chart Title</label>
          <input
            type="text"
            className={styles.chartTitleInput}
            value={chartTitle}
            onChange={(e) => setChartTitle(e.target.value)}
          />
        </div>
        <div className={styles.xyAxisGroup}>
          <label className={styles.xyAxisGroupLabel}>X Axis Title</label>
          <input
            className={styles.xyAxisGroupInput}
            type="text"
            value={xAxisTitle}
            onChange={(e) => setXAxisTitle(e.target.value)}
          />
        </div>
        <div className={styles.xyAxisGroup}>
          <label className={styles.xyAxisGroupLabel}>Y Axis Title</label>
          <input
            className={styles.xyAxisGroupInput}
            type="text"
            value={yAxisTitle}
            onChange={(e) => setYAxisTitle(e.target.value)}
          />
        </div>

        {/* Font Family */}
        <div className={styles.fontSelector}>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className={styles.fontDropdown}
          >
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Verdana">Verdana</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Trebuchet MS">Trebuchet MS</option>
            <option value="Gill Sans">Gill Sans</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
          </select>
        </div>

        {/* Font Size */}
        <div className={styles.fontSizeWrapper}>
          <input
            type="number"
            min={8}
            max={26}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className={styles.fontSizeInput}
          />
        </div>

        {/* Align & Bold */}
        <div className={styles.titleControls}>
          <div className={styles.alignmentButtons}>
            {["left", "center", "right"].map((align) => (
              <button
                key={align}
                className={`${styles.alignButton} ${
                  titleAlign === align ? styles.active : ""
                }`}
                onClick={() => setTitleAlign(align)}
              >
                <span className="material-symbols-outlined">
                  format_align_{align}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.styleControls}>
          <button
            className={`${styles.styleButton} ${isBold ? styles.active : ""}`}
            onClick={() => setIsBold(!isBold)}
          >
            <span className="material-symbols-outlined">format_bold</span>
          </button>
        </div>
        <input
          type="color"
          className={styles.colorPicker}
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        />
      </div>

      {/* Input Data Table */}
      <div className={styles.editorChartWrapper}>
        <div className={styles.editorChart}>
          <table className={styles.inputTable}>
            <thead>
              <tr>
                <th>Label</th>
                <th>Value</th>
                <th>Color</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((text, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={data[index]}
                      onChange={(e) => handleDataChange(index, e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="color"
                      value={barColors[index]}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                    />
                  </td>
                  <td>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveRow(index)}
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className={styles.addButton} onClick={handleAddRow}>
            + Add Row
          </button>
        </div>

        {/* Chart Display */}
        <div className={styles.chart} ref={chartPreviewRef}>
          {isValid ? (
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={450}
            />
          ) : (
            <p style={{ color: "red" }}>
              ❌ Jumlah data, label, dan warna harus sama dan valid.
            </p>
          )}
        </div>
      </div>

      <button className={styles.downloadButton} onClick={handleDownload}>
        Download Chart
      </button>
    </div>
  );
};

export default ESBarChartCustom;
