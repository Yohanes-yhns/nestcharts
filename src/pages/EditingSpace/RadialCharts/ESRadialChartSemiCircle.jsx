import React, { useState, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./ESRadialChartSemiCircle.module.css";
import Navbar from "../../../components/Navbar";
import html2canvas from "html2canvas";

const ESRadialChartSemiCircle = () => {
  // MEMASUKAN DATA KEDALAM APEX *********************************

  const chartPreviewRef = useRef(null);

  const [categories, setCategories] = useState([
    "Cricket"
  ]);
  const [data, setData] = useState([70]);
  const [chartTitle, setChartTitle] = useState("Semi Circle Radial Chart");
  const [titleAlign, setTitleAlign] = useState("center");
  const [isBold, setIsBold] = useState(false);
  const [fontColor, setFontColor] = useState("#153448");
  const [lineColor, setLineColor] = useState("#669DB5");
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

  const handleDataChange = (index, value) => {
    const newData = [...data];
    newData[index] = Number(value);
    setData(newData);
  };


  // MEMBUAT FUNGSI UNTUK PENAMBAHAN DATA ATAU PENGURANGAN DATA ****************
  // ************************************************************
  // CODE DARI APEXCHARTS YANG DIMASUKAN DATANYA MENGGUNAKAN USESTATE************

  const chartOptions = {
    chart: {
      height: 550,
      type: "radialBar",
      toolbar: { show: false },
      
    },
    plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%",
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: "#444",
              opacity: 1,
              blur: 2,
            },
          },
          dataLabels: {
            name: {
              show: true,
            },
            value: {
              offsetY: -50,
              fontSize: "22px",
            },
          },
        },
      },
    colors: [lineColor],
    labels: categories,
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
    dataLabels: { enabled: false },
    stroke: { curve: "straight" },
    grid: {
      row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 },
    },
    
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontFamily: fontFamily,
          colors: "#153448",
        },
      },
    },
    yaxis: {
      min: 0,
      tickAmount: 8,
      labels: {
        style: {
          fontFamily: fontFamily,
          colors: "#153448",
        },
      },
    },
  };

  const chartSeries = data;


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
          {/* TITLE EDITOR END */}
          {/* CHARTS EDITOR */}
          <div className={styles.sectionChartColor}>
            <label className={styles.chartColor}>Chart Color</label>
            <input
              type="color"
              value={lineColor}
              onChange={(e) => setLineColor(e.target.value)}
              className={styles.colorPicker}
            />
          </div>
          <table className={styles.inputTable}>
            <thead>
              <tr>
                <th>Label</th>
                <th>Input</th>
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
                      value={data[index]}
                      onChange={(e) => handleDataChange(index, e.target.value)}
                      placeholder="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.chart} ref={chartPreviewRef}>
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="radialBar"
            height={600} // Ukuran besar agar hasil HD
          />
        </div>
      </div>
      <button className={styles.downloadButton} onClick={handleDownload}>
        Download Chart
      </button>
    </div>
  );
};

export default ESRadialChartSemiCircle;
