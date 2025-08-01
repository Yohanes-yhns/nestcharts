import React, { useState, useRef, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./ESAreaChartBasic.module.css";
import Navbar from "../../../components/Navbar";
import html2canvas from "html2canvas";

const ESAreaChartBasic = () => {
  // MEMASUKAN DATA KEDALAM APEX *********************************

  const chartPreviewRef = useRef(null);

  const [categories, setCategories] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
  ]);
  const [data, setData] = useState([20, 40, 30, 100, 60]);
  const [chartTitle, setChartTitle] = useState("Basic Area Chart");
  const [xAxisTitle, setXAxisTitle] = useState("Month");
  const [yAxisTitle, setYAxisTitle] = useState("Total");
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

  const handleAddRow = () => {
    setCategories([...categories, ""]);
    setData([...data, 0]);
  };

  const handleRemoveRow = (index) => {
    const newCategories = categories.filter((_, i) => i !== index);
    const newData = data.filter((_, i) => i !== index);
    setCategories(newCategories);
    setData(newData);
  };

  const handleSaveChart = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        chartId
          ? `http://localhost:3000/api/charts/${chartId}`
          : "http://localhost:3000/api/charts",
        {
          method: chartId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            chart_type: "area",
            title: chartTitle,
            x_axis_title: xAxisTitle,
            y_axis_title: yAxisTitle,
            categories: JSON.stringify(categories),
            data: JSON.stringify([{ name: "Custom Series", data: data }]),
            line_color: JSON.stringify([lineColor]),
            font_color: fontColor,
            font_family: fontFamily,
            font_size: fontSize,
            title_align: titleAlign,
            is_bold: isBold,
            is_horizontal: false,
            is_negative: false,
          }),
        }
      );

      const result = await response.json();
      console.log("✅ Saved chart:", result);
      alert("Chart berhasil disimpan!");
    } catch (error) {
      console.error("❌ Save chart error:", error);
      alert("Gagal menyimpan chart.");
    }
  };

  // MEMBUAT FUNGSI UNTUK PENAMBAHAN DATA ATAU PENGURANGAN DATA ****************
  // ************************************************************
  // CODE DARI APEXCHARTS YANG DIMASUKAN DATANYA MENGGUNAKAN USESTATE************

 const chartOptions = {
  chart: {
    height: 350,
    type: "area",
    toolbar: {
      show: false,
      tools: {
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
      },
    },
    zoom: {
      enabled: false,
    },
  },
  colors: [lineColor],
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
  stroke: { curve: "smooth" },
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
    min: 0,
    tickAmount: 8,
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


  const chartSeries = [{ name: "Custom Series", data }];

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

  const [chartId, setChartId] = useState(null);

  useEffect(() => {
    const editingChart = localStorage.getItem("editingChart");
    if (!editingChart) return;

    try {
      const parsed = JSON.parse(editingChart);
      if (parsed.id) setChartId(parsed.id);
      if (parsed.title) setChartTitle(parsed.title);
      if (parsed.x_axis_title) setXAxisTitle(parsed.x_axis_title);
      if (parsed.y_axis_title) setYAxisTitle(parsed.y_axis_title);
      if (parsed.title_align) setTitleAlign(parsed.title_align);
      if (parsed.font_color) setFontColor(parsed.font_color);
      if (parsed.font_family) setFontFamily(parsed.font_family);
      if (parsed.font_size) setFontSize(Number(parsed.font_size));
      if (parsed.is_bold !== undefined) setIsBold(parsed.is_bold);

      if (parsed.line_color) {
        const lc =
          typeof parsed.line_color === "string"
            ? JSON.parse(parsed.line_color)
            : parsed.line_color;
        if (lc.length > 0) setLineColor(lc[0]);
      }

      if (parsed.categories) {
        const cat =
          typeof parsed.categories === "string"
            ? JSON.parse(parsed.categories)
            : parsed.categories;
        setCategories(cat);
      }

      if (parsed.data) {
        const d =
          typeof parsed.data === "string"
            ? JSON.parse(parsed.data)
            : parsed.data;
        if (Array.isArray(d) && d.length > 0 && d[0].data) {
          setData(d[0].data);
        }
      }
    } catch (err) {
      console.error("❌ Gagal parse editingChart:", err.message);
    } finally {
      localStorage.removeItem("editingChart");
    }
  }, []);

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
            type="area"
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

export default ESAreaChartBasic;
