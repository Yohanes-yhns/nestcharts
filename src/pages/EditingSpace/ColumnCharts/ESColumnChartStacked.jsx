import React, { useState, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import Navbar from "../../../components/Navbar";
import html2canvas from "html2canvas";
import styles from "./ESColumnChartStacked.module.css";

const ESColumnChartStacked = () => {
  const chartPreviewRef = useRef(null);

  const [xCategories, setXCategories] = useState([
    "1 Jan",
    "2 Jan",
    "3 Jan",
    "4 Jan",
    "5 Jan",
    "6 Jan",
    "7 Jan",
    "8 Jan",
    "9 Jan",
    "10 Jan",
  ]);
  const [dataHigh, setDataHigh] = useState([
    44, 55, 57, 56, 61, 58, 63, 70, 55, 53,
  ]);
  const [dataMid, setDataMid] = useState([
    76, 85, 101, 98, 87, 105, 91, 67, 45, 35,
  ]);
  const [dataLow, setDataLow] = useState([
    35, 41, 36, 26, 45, 48, 52, 23, 40, 80,
  ]);
  const [categories, setCategories] = useState([...xCategories]);
  const [xAxisTitle, setXAxisTitle] = useState("Dates");
  const [yAxisTitle, setYAxisTitle] = useState("Total");
  const [seriesNameHigh, setSeriesNameHigh] = useState("Product A");
  const [seriesNameMid, setSeriesNameMid] = useState("Product B");
  const [seriesNameLow, setSeriesNameLow] = useState("Product C");

  const [chartTitle, setChartTitle] = useState("Stacked Column Chart");
  const [titleAlign, setTitleAlign] = useState("center");
  const [fontFamily, setFontFamily] = useState("Poppins");
  const [fontSize, setFontSize] = useState(20);
  const [isBold, setIsBold] = useState(false);
  const [fontColor, setFontColor] = useState("#153448");
  const [lineColor, setLineColor] = useState("#669DB5");
  const [lineColorLow, setLineColorLow] = useState("#94A74A"); // New line color for Low
  const [lineColorMid, setLineColorMid] = useState("#E5C6A0");

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
    } else if (series === "mid") {
      const newData = [...dataMid];
      newData[index] = newValue;
      setDataMid(newData);
    }
  };

  const handleAddRow = () => {
    setCategories([...categories, ""]);
    setDataHigh([...dataHigh, 0]);
    setDataLow([...dataLow, 0]);
    setDataMid([...dataMid, 0]);
  };

  const handleRemoveRow = (index) => {
    const newCategories = [...categories];
    const newDataHigh = [...dataHigh];
    const newDataMid = [...dataMid];
    const newDataLow = [...dataLow];

    newCategories.splice(index, 1);
    newDataHigh.splice(index, 1);
    newDataMid.splice(index, 1);
    newDataLow.splice(index, 1);

    setCategories(newCategories);
    setDataHigh(newDataHigh);
    setDataMid(newDataMid);
    setDataLow(newDataLow);
  };

  const handleDownload = () => {
    if (chartPreviewRef.current) {
      html2canvas(chartPreviewRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "line-chart-with-data-labels.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  const chartSeries = [
    { name: seriesNameHigh, data: dataHigh },
    { name: seriesNameMid, data: dataMid },
    { name: seriesNameLow, data: dataLow },
  ];

  const chartOptions = {
    chart: {
      height: 350,
      type: "bar",
      stacked: true,
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.5,
      },
      toolbar: { show: false },
    },
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
    colors: [lineColor, lineColorLow, lineColorMid], // Updated to use both colors
    dataLabels: { enabled: true },
    stroke: {
      curve: "smooth",
      dashArray: [10, 6, 0], // contoh: series 1 = putus-putus, series 2 = putus pendek, series 3 = solid
    },

    grid: {
      borderColor: "#e7e7e7",
      row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 },
    },
    markers: { size: 1 },
    xaxis: {
      categories,
      title: {
        text: xAxisTitle,
        style: {
          fontFamily,
          color: "#153448",
          fontWeight: "600", // bisa 'normal', 'bold', '500', '600', dll
        },
      },
      labels: { style: { fontFamily, colors: "#153448" } },
    },
    yaxis: {
      title: {
        text: yAxisTitle,
        style: {
          fontFamily,
          color: "#153448",
          fontWeight: "600", // contoh ganti berat font
        },
      },
      min: 5,
      tickAmount: 8,
      labels: { style: { fontFamily, colors: "#153448" } },
    },
    legend: { position: "top" },
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.editorText}>
        {/* Title Editor */}
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
            ].map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

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
              >
                <span className="material-symbols-outlined">{`format_align_${align}`}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.styleControls}>
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
              <div>
                <input
                  type="color"
                  value={lineColorMid}
                  onChange={(e) => setLineColorMid(e.target.value)}
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
                  value={seriesNameMid}
                  onChange={(e) => setSeriesNameMid(e.target.value)}
                  placeholder="Mid Series Name"
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
                <th>Input 3</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((label, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={label}
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
                      value={dataMid[index]}
                      onChange={(e) =>
                        handleDataChange("mid", index, e.target.value)
                      }
                      placeholder="Low"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={dataLow[index]}
                      onChange={(e) =>
                        handleDataChange("low", index, e.target.value)
                      }
                      placeholder="Mid"
                    />
                  </td>
                  <td>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveRow(index)}
                      title="Remove Row"
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
            height={450}
          />
        </div>
      </div>

      <button className={styles.downloadButton} onClick={handleDownload}>
        Download Chart
      </button>
    </div>
  );
};

export default ESColumnChartStacked;
