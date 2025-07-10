import React, { useState, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./ESBarChartGrouped.module.css";
import Navbar from "../../../components/Navbar";
import html2canvas from "html2canvas";

const ESBarChartGrouped = () => {
  // MEMASUKAN DATA KEDALAM APEX *********************************

  const chartPreviewRef = useRef(null);

  const [categories, setCategories] = useState([
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
  ]);
  const [dataHigh, setDataHigh] = useState([44, 55, 41, 64, 22, 43, 21]);
  const [dataLow, setDataLow] = useState([53, 32, 33, 52, 13, 44, 32]);
  const [seriesNameHigh, setSeriesNameHigh] = useState("Input 1");
  const [seriesNameLow, setSeriesNameLow] = useState("Input 2");
  const [chartTitle, setChartTitle] = useState("Grouped Bar Chart");
  const [xAxisTitle, setXAxisTitle] = useState("Total");
  const [yAxisTitle, setYAxisTitle] = useState("Years");
  const [titleAlign, setTitleAlign] = useState("center");
  const [isBold, setIsBold] = useState(false);
  const [fontColor, setFontColor] = useState("#153448");
  const [lineColor, setLineColor] = useState("#669DB5");
  const [lineColorLow, setLineColorLow] = useState("#94A74A");
  const [fontFamily, setFontFamily] = useState("Poppins");
  const [fontSize, setFontSize] = useState(18);

  // MEMASUKAN DATA KEDALAM APEX *********************************
  // ***********************************************************
  // MEMBUAT FUNGSI UNTUK PENAMBAHAN DATA ATAU PENGURANGAN DATA ****************

  const handleInputChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const handleDataChange = (series, index, value) => {
    const newValue = Number(value);
    if (series === "high") {
      const newData = [...dataHigh];
      newData[index] = newValue;
      setDataHigh(newData);
    } else if (series === "low") {
      const newData = [...dataLow];
      newData[index] = newValue;
      setDataLow(newData);
    }
  };

  const handleAddRow = () => {
    setCategories([...categories, ""]);
    setDataHigh([...dataHigh, 0]);
    setDataLow([...dataLow, 0]);
  };

  const handleRemoveRow = (index) => {
    const newCategories = [...categories];
    const newDataHigh = [...dataHigh];
    const newDataLow = [...dataLow];

    newCategories.splice(index, 1);
    newDataHigh.splice(index, 1);
    newDataLow.splice(index, 1);

    setCategories(newCategories);
    setDataHigh(newDataHigh);
    setDataLow(newDataLow);
  };

  // MEMBUAT FUNGSI UNTUK PENAMBAHAN DATA ATAU PENGURANGAN DATA ****************
  // ************************************************************
  // CODE DARI APEXCHARTS YANG DIMASUKAN DATANYA MENGGUNAKAN USESTATE************

  const chartOptions = {
    chart: {
      height: 350,
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        }, // <--- INI YANG PENTING
      },
    },
    colors: [lineColor, lineColorLow],
    title: {
      text: chartTitle,
      align: titleAlign,
      style: {
        fontWeight: isBold ? "bold" : "normal",
        fontFamily: fontFamily,
        color: fontColor,
        fontSize: `${fontSize}px`,
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    grid: {
      row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 },
    },
    xaxis: {
      categories: categories,
      title: {
        text: xAxisTitle,
        style: {
          fontFamily: fontFamily,
          colors: "#153448",
          fontWeight: "600",
        },
      },
      labels: { style: { fontFamily, colors: "#153448" } },
    },
    yaxis: {
      title: {
        text: yAxisTitle,
        style: {
          fontFamily: fontFamily,
          colors: "#153448",
          fontWeight: "600",
        },
      },
      labels: { style: { fontFamily, colors: "#153448" } },
    },
  };

  const chartSeries = [
    { name: seriesNameHigh, data: dataHigh },
    { name: seriesNameLow, data: dataLow },
  ];

  const handleDownload = async () => {
    if (!chartPreviewRef.current) return;

    const canvas = await html2canvas(chartPreviewRef.current, {
      scale: 3, // semakin besar, semakin HD (2 atau 3)
      useCORS: true,
    });

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "chart-hd.png";
    link.click();
  };

  return (
    <div className={styles.container}>
      <Navbar />
      {/* CARD EDITOR */}

      <div className={styles.editorText}>
        {/* TITLE EDITOR */}
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
            placeholder="X Axis Title"
          />
        </div>
        <div className={styles.xyAxisGroup}>
          <label className={styles.xyAxisGroupLabel}>Y Axis Title</label>
          <input
            className={styles.xyAxisGroupInput}
            type="text"
            value={yAxisTitle}
            onChange={(e) => setYAxisTitle(e.target.value)}
            placeholder="Y Axis Title"
          />
        </div>
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
            <option value="Palatino Linotype">Palatino Linotype</option>
            <option value="Book Antiqua">Book Antiqua</option>
            <option value="Courier New">Courier New</option>
            <option value="Lucida Console">Lucida Console</option>
            <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
            <option value="Impact">Impact</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
          </select>
        </div>

        {/* Input Ukuran Font */}
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

        <div className={styles.titleControls}>
          <div className={styles.alignmentButtons}>
            <button
              className={`${styles.alignButton} ${
                titleAlign === "left" ? styles.active : ""
              }`}
              onClick={() => setTitleAlign("left")}
              title="Align Left"
            >
              <span className="material-symbols-outlined">
                format_align_left
              </span>
            </button>
            <button
              className={`${styles.alignButton} ${
                titleAlign === "center" ? styles.active : ""
              }`}
              onClick={() => setTitleAlign("center")}
              title="Align Center"
            >
              <span className="material-symbols-outlined">
                format_align_center
              </span>
            </button>
            <button
              className={`${styles.alignButton} ${
                titleAlign === "right" ? styles.active : ""
              }`}
              onClick={() => setTitleAlign("right")}
              title="Align Right"
            >
              <span className="material-symbols-outlined">
                format_align_right
              </span>
            </button>
          </div>
        </div>
        <div className={styles.styleControls}>
          {/* Bold */}
          <button
            className={`${styles.styleButton} ${isBold ? styles.active : ""}`}
            onClick={() => setIsBold(!isBold)}
            title="Toggle Bold"
          >
            <span className="material-symbols-outlined">format_bold</span>
          </button>
        </div>

        <input
          type="color"
          className={styles.colorPicker}
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
          title="Pick Font Color"
        />
      </div>
      <div className={styles.editorChartWrapper}>
        <div className={styles.editorChart}>
          <div className={styles.chartInput}>
            <div className={styles.sectionChartColor}>
              <label className={styles.chartColor}>Chart Color</label>
              <div>
                <input
                  type="color"
                  value={lineColor}
                  onChange={(e) => setLineColor(e.target.value)}
                  className={styles.colorPicker}
                />
              </div>
              <div>
                <input
                  type="color"
                  value={lineColorLow}
                  onChange={(e) => setLineColorLow(e.target.value)}
                  className={styles.colorPicker}
                />
              </div>
            </div>
            <div className={styles.axisGroupInputs}>
              <div className={styles.axisGroup}>
                <label>Input</label>
                <input
                  type="text"
                  value={seriesNameHigh}
                  onChange={(e) => setSeriesNameHigh(e.target.value)}
                  placeholder="High Series Name"
                />
              </div>
              <div className={styles.axisGroup}>
                <input
                  type="text"
                  value={seriesNameLow}
                  onChange={(e) => setSeriesNameLow(e.target.value)}
                  placeholder="Low Series Name"
                />
              </div>
            </div>
          </div>
          <table className={styles.inputTable}>
            <thead>
              <tr>
                <th>Label</th>
                <th>Input 1</th>
                <th>Input 2</th>
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
                      placeholder="Label"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={dataHigh[index]}
                      onChange={(e) =>
                        handleDataChange("high", index, e.target.value)
                      }
                      placeholder="High"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={dataLow[index]}
                      onChange={(e) =>
                        handleDataChange("low", index, e.target.value)
                      }
                      placeholder="Low"
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

        <div className={styles.chart} ref={chartPreviewRef}>
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={450} // Ukuran besar agar hasil HD
          />
        </div>
      </div>
      <button className={styles.downloadButton} onClick={handleDownload}>
        Download Chart
      </button>
    </div>
  );
};

export default ESBarChartGrouped;
