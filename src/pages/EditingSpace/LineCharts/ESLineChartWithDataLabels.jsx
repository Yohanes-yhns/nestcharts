import React, { useState, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import Navbar from "../../../components/Navbar";
import html2canvas from "html2canvas";
import styles from "./ESLineChartWithDataLabels.module.css";

const ESLineChartWithDataLabels = () => {
  const chartPreviewRef = useRef(null);

  const [xCategories, setXCategories] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
  ]);
  const [data1, setData1] = useState([28, 29, 33, 36, 32, 32, 33]);
  const [data2, setData2] = useState([12, 11, 14, 18, 17, 13, 13]);
  const [categories, setCategories] = useState([...xCategories]);
  const [xAxisTitle, setXAxisTitle] = useState("Month");
  const [yAxisTitle, setYAxisTitle] = useState("Temperature");
  const [seriesName1, setSeriesName1] = useState("Input 1");
  const [seriesName2, setSeriesName2] = useState("Input 2");

  const [chartTitle, setChartTitle] = useState("Line Chart with Data Labels");
  const [titleAlign, setTitleAlign] = useState("center");
  const [fontFamily, setFontFamily] = useState("Poppins");
  const [fontSize, setFontSize] = useState(20);
  const [isBold, setIsBold] = useState(false);
  const [fontColor, setFontColor] = useState("#153448");
  const [lineColor1, setLineColor1] = useState("#669DB5");
  const [lineColor2, setLineColor2] = useState("#94A74A"); // New line color for Low

  const handleInputChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const handleDataChange = (series, index, value) => {
    const newValue = Number(value);
    if (series === "1") {
      const newData = [...data1];
      newData[index] = newValue;
      setData1(newData);
    } else if (series === "2") {
      const newData = [...data2];
      newData[index] = newValue;
      setData2(newData);
    }
  };

  const handleAddRow = () => {
    setCategories([...categories, ""]);
    setData1([...data1, 0]);
    setData2([...data2, 0]);
  };

  const handleRemoveRow = (index) => {
    const newCategories = [...categories];
    const newData1 = [...data1];
    const newData2 = [...data2];

    newCategories.splice(index, 1);
    newData1.splice(index, 1);
    newData2.splice(index, 1);

    setCategories(newCategories);
    setData1(newData1);
    setData2(newData2);
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
    { name: seriesName1, data: data1 },
    { name: seriesName2, data: data2 },
  ];

  const chartOptions = {
    chart: {
      height: 350,
      type: "line",
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
    colors: [lineColor1, lineColor2], // Updated to use both colors
    dataLabels: { enabled: true },
    stroke: { curve: "smooth" },
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
                  value={lineColor1}
                  onChange={(e) => setLineColor1(e.target.value)}
                  className={styles.colorPicker}
                />
              </div>
              <div>
                <input
                  type="color"
                  value={lineColor2}
                  onChange={(e) => setLineColor2(e.target.value)}
                  className={styles.colorPicker}
                />
              </div>
            </div>
            <div className={styles.axisGroupInputs}>
              <div className={styles.axisGroup}>
                <label>Input</label>
                <input
                  type="text"
                  value={seriesName1}
                  onChange={(e) => setSeriesName1(e.target.value)}
                  placeholder="Series Name 1"
                />
              </div>
              <div className={styles.axisGroup}>
                <input
                  type="text"
                  value={seriesName2}
                  onChange={(e) => setSeriesName2(e.target.value)}
                  placeholder="Series Name 2"
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
                      value={data1[index]}
                      onChange={(e) =>
                        handleDataChange("1", index, e.target.value)
                      }
                      placeholder="1"
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      value={data2[index]}
                      onChange={(e) =>
                        handleDataChange("2", index, e.target.value)
                      }
                      placeholder="2"
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
            type="line"
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

export default ESLineChartWithDataLabels;
