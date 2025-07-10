import React, { useState, useRef, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import Navbar from "../../../components/Navbar";
import html2canvas from "html2canvas";
import styles from "./ESPieChartGradient.module.css";

const ESPieChartGradient = () => {
  const chartPreviewRef = useRef(null);

  const [categories, setCategories] = useState([
    "Team A",
    "Team B",
    "Team C",
    "Team D",
  ]);
  const [data, setData] = useState([44, 55, 41, 17]);

  const [chartTitle, setChartTitle] = useState("Gradient Pie Chart");
  const [titleAlign, setTitleAlign] = useState("center");
  const [fontFamily, setFontFamily] = useState("Poppins");
  const [fontSize, setFontSize] = useState(20);
  const [isBold, setIsBold] = useState(false);
  const [fontColor, setFontColor] = useState("#153448");

  const [colors, setColors] = useState([
    "#93C3EE",
    "#E5C6A0",
    "#669DB5",
    "#94A74A",
  ]);

  const handleLabelChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const handleDataChange = (index, value) => {
    let val = value;
    if (val === "") val = "0";
    val = parseInt(val);
    if (isNaN(val) || val < 0) val = 0;

    const newData = [...data];
    newData[index] = val;
    setData(newData);
  };

  const getRandomColor = () => {
    const palette = [
      "#FF4560",
      "#008FFB",
      "#00E396",
      "#FEB019",
      "#775DD0",
      "#FF66C3",
      "#008080",
      "#FFA500",
    ];
    return palette[Math.floor(Math.random() * palette.length)];
  };

  const handleAddRow = () => {
    setCategories([...categories, "New Label"]);
    setData([...data, 0]);
    setColors([...colors, getRandomColor()]);
  };

  const handleRemoveRow = (index) => {
    if (categories.length <= 1) return;

    const newCategories = [...categories];
    const newData = [...data];
    const newColors = [...colors];

    newCategories.splice(index, 1);
    newData.splice(index, 1);
    newColors.splice(index, 1);

    setCategories(newCategories);
    setData(newData);
    setColors(newColors);
  };

  const handleColorChange = (index, value) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const handleDownload = () => {
    if (chartPreviewRef.current) {
      html2canvas(chartPreviewRef.current, { backgroundColor: null }).then(
        (canvas) => {
          const link = document.createElement("a");
          link.download = "pie-chart.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        }
      );
    }
  };

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "donut",
        toolbar: {
          show: false,
        },
      },
      labels: categories,
      colors: colors,
      title: {
        text: chartTitle,
        align: titleAlign,
        style: {
          fontFamily,
          fontSize,
          fontWeight: isBold ? "bold" : "normal",
          color: fontColor,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontFamily,
          colors: ["#FFFFFF"],
        },
      },
      fill: {
        type: "gradient",
      },
      legend: {
        position: "bottom",
        labels: {
          colors: fontColor,
          useSeriesColors: false,
          fontFamily,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    }),
    [
      categories,
      colors,
      chartTitle,
      titleAlign,
      fontFamily,
      fontSize,
      isBold,
      fontColor,
    ]
  );

  const series = useMemo(() => data, [data]);

  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.editorText}>
        {/* Title Editor */}
        <div className={styles.titleInputWrapper}>
          <label className={styles.chartTitleLabel} htmlFor="chart-title">
            Chart Title
          </label>
          <input
            id="chart-title"
            type="text"
            className={styles.chartTitleInput}
            value={chartTitle}
            onChange={(e) => setChartTitle(e.target.value)}
            placeholder="Enter chart title"
          />
        </div>

        <div className={styles.fontSelector}>
          <select
            id="font-family-select"
            aria-label="Select font family"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className={styles.fontDropdown}
          >
            {[
              "Arial",
              "Helvetica",
              "Verdana",
              "Tahoma",
              "Trebuchet MS",
              "Gill Sans",
              "Times New Roman",
              "Georgia",
              "Palatino Linotype",
              "Book Antiqua",
              "Courier New",
              "Lucida Console",
              "Lucida Sans Unicode",
              "Impact",
              "Comic Sans MS",
              "Poppins",
            ].map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fontSizeWrapper}>
          <input
            id="font-size-input"
            type="number"
            min={8}
            max={26}
            aria-label="Font size"
            value={fontSize}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= 8 && val <= 42) setFontSize(val);
            }}
            className={styles.fontSizeInput}
          />
        </div>

        <div className={styles.titleControls}>
          <div
            className={styles.alignmentButtons}
            role="group"
            aria-label="Title alignment"
          >
            {["left", "center", "right"].map((align) => (
              <button
                key={align}
                className={`${styles.alignButton} ${
                  titleAlign === align ? styles.active : ""
                }`}
                onClick={() => setTitleAlign(align)}
                title={`Align ${
                  align.charAt(0).toUpperCase() + align.slice(1)
                }`}
                aria-pressed={titleAlign === align}
              >
                <span className="material-symbols-outlined">{`format_align_${align}`}</span>
              </button>
            ))}
          </div>

          <button
            className={`${styles.styleButton} ${isBold ? styles.active : ""}`}
            onClick={() => setIsBold(!isBold)}
            title="Toggle Bold"
            aria-pressed={isBold}
          >
            <span className="material-symbols-outlined">format_bold</span>
          </button>

          <input
            type="color"
            className={styles.colorPicker}
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            title="Pick Font Color"
            aria-label="Font color picker"
          />
        </div>
      </div>

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
              {categories.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    No data rows. Please add a row.
                  </td>
                </tr>
              )}
              {categories.map((label, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={label}
                      onChange={(e) => handleLabelChange(index, e.target.value)}
                      placeholder="Label"
                      aria-label={`Label for slice ${index + 1}`}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      value={data[index]}
                      onChange={(e) => handleDataChange(index, e.target.value)}
                      placeholder="Value"
                      aria-label={`Value for slice ${index + 1}`}
                    />
                  </td>
                  <td>
                    <input
                      type="color"
                      value={colors[index]}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      aria-label={`Color for slice ${index + 1}`}
                    />
                  </td>
                  <td>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveRow(index)}
                      title="Remove Row"
                      aria-label={`Remove slice ${index + 1}`}
                      disabled={categories.length <= 1}
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className={styles.addButton}
            onClick={handleAddRow}
            aria-label="Add new row"
          >
            + Add Row
          </button>
        </div>

        <div className={styles.chart} ref={chartPreviewRef}>
          <ReactApexChart
            key={
              chartTitle +
              titleAlign +
              fontFamily +
              fontSize +
              isBold +
              fontColor +
              JSON.stringify(categories) +
              JSON.stringify(data)
            }
            options={chartOptions}
            series={series}
            type="donut"
            height={450}
          />
        </div>
      </div>

      <button
        className={styles.downloadButton}
        onClick={handleDownload}
        aria-label="Download chart as image"
      >
        Download Chart
      </button>
    </div>
  );
};

export default ESPieChartGradient;
