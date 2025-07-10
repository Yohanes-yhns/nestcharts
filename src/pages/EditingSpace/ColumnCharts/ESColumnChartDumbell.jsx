import React, { useState, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import Navbar from "../../../components/Navbar";
import html2canvas from "html2canvas";
import styles from "./ESColumnChartDumbell.module.css";

const ESColumnChartDumbell = () => {
  const chartPreviewRef = useRef(null);

  const [xCategories, setXCategories] = useState([
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
  ]);
  const [dataInput, setDataInput] = useState([
    [2800, 4500],
    [3200, 4100],
    [2950, 7800],
    [3000, 4600],
    [3500, 4100],
    [4500, 6500],
    [4100, 5600],
  ]);
  const [categories, setCategories] = useState([...xCategories]);
  const [xAxisTitle, setXAxisTitle] = useState("Years");
  const [yAxisTitle, setYAxisTitle] = useState("Total");
  const [seriesName, setSeriesName] = useState("Input");

  const [chartTitle, setChartTitle] = useState("Dumbell Column Chart");
  const [titleAlign, setTitleAlign] = useState("center");
  const [fontFamily, setFontFamily] = useState("Poppins");
  const [fontSize, setFontSize] = useState(20);
  const [isBold, setIsBold] = useState(false);
  const [fontColor, setFontColor] = useState("#153448");
  const [colorProductA, setColorProductA] = useState("#669DB5");
  const [colorProductB, setColorProductB] = useState("#94A74A");
  const [nameProductA, setNameProductA] = useState("Product A");
  const [nameProductB, setNameProductB] = useState("Product B");

  const handleInputChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const handleDataChange = (type, index, productIndex, value) => {
    if (type === "Input") {
      const updatedData = [...dataInput];
      updatedData[index][productIndex] = Number(value);
      setDataInput(updatedData);
    }
  };

  const handleAddRow = () => {
    setCategories([...categories, ""]);
    setDataInput([...dataInput, [0, 0]]);
  };

  const handleRemoveRow = (index) => {
    const newCategories = [...categories];
    const newDataInput = [...dataInput];

    newCategories.splice(index, 1);
    newDataInput.splice(index, 1);

    setCategories(newCategories);
    setDataInput(newDataInput);
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
    {
      name: seriesName,
      data: categories.map((cat, i) => ({
        x: cat,
        y: dataInput[i],
      })),
    },
  ];

  const chartOptions = {
    chart: {
      height: 350,
      type: "rangeBar",
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
    // colors bisa dihapus jika pakai dumbbellColors
    plotOptions: {
      bar: {
        isDumbbell: true,
        columnWidth: 15,
      },
    },
    colors: [colorProductA, colorProductB],
    legend: {
      show: true,
      showForSingleSeries: true,
      position: "top",
      customLegendItems: [nameProductA, nameProductB],
    },

    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        gradientToColors: [colorProductB, colorProductA], // kebalikan atau sesuai warnanya
        inverseColors: true,
        stops: [0, 100],
      },
    },

    grid: {
      borderColor: "#e7e7e7",
      row: { colors: ["#f3f3f3", "transparent"], opacity: 0.5 },
    },
    markers: { size: 1 },
    xaxis: {
      title: {
        text: xAxisTitle,
        style: {
          fontFamily,
          color: "#153448",
          fontWeight: "600",
        },
      },
      tickPlacement: "on",
      labels: { style: { fontFamily, colors: "#153448" } },
    },
    yaxis: {
      title: {
        text: yAxisTitle,
        style: {
          fontFamily,
          color: "#153448",
          fontWeight: "600",
        },
      },
      min: 0,
      tickAmount: 8,
      labels: { style: { fontFamily, colors: "#153448" } },
    },
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
                  value={colorProductA}
                  onChange={(e) => setColorProductA(e.target.value)}
                  className={styles.colorPicker}
                />
              </div>
              <div>
                <input
                  type="color"
                  value={colorProductB}
                  onChange={(e) => setColorProductB(e.target.value)}
                  className={styles.colorPicker}
                />
              </div>
            </div>

            <div className={styles.axisGroupInputs}>
              <div className={styles.axisGroup}>
                <label>Input</label>
                <input
                  type="text"
                  value={nameProductA}
                  onChange={(e) => setNameProductA(e.target.value)}
                />
              </div>
              <div className={styles.axisGroup}>
                <input
                  type="text"
                  value={nameProductB}
                  onChange={(e) => setNameProductB(e.target.value)}
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
                      placeholder="Label kategori"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={dataInput[index][0]}
                      onChange={(e) =>
                        handleDataChange("Input", index, 0, e.target.value)
                      }
                      placeholder="Produk A"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={dataInput[index][1]}
                      onChange={(e) =>
                        handleDataChange("Input", index, 1, e.target.value)
                      }
                      placeholder="Produk B"
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
            type="rangeBar"
            height={400}
          />
        </div>
      </div>

      <button className={styles.downloadButton} onClick={handleDownload}>
        Download Chart
      </button>
    </div>
  );
};

export default ESColumnChartDumbell;
