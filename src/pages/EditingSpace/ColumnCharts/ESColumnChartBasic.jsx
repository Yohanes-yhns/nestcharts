import React, { useState, useRef, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Navbar from "../../../components/Navbar";
import html2canvas from "html2canvas";
import styles from "./ESColumnChartBasic.module.css";

const ESColumnChartBasic = () => {
  const chartPreviewRef = useRef(null);

  const [xCategories, setXCategories] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
  ]);
  const [dataHigh, setDataHigh] = useState([
    44, 55, 57, 56, 61, 58, 63, 60, 66,
  ]);
  const [dataMid, setDataMid] = useState([
    76, 85, 101, 98, 87, 105, 91, 114, 94,
  ]);
  const [dataLow, setDataLow] = useState([35, 41, 36, 26, 45, 48, 52, 53, 41]);
  const [categories, setCategories] = useState([...xCategories]);
  const [xAxisTitle, setXAxisTitle] = useState("Month");
  const [yAxisTitle, setYAxisTitle] = useState("Total");
  const [seriesNameHigh, setSeriesNameHigh] = useState("Input 1");
  const [seriesNameMid, setSeriesNameMid] = useState("Input 2");
  const [seriesNameLow, setSeriesNameLow] = useState("Input 3");

  const [chartTitle, setChartTitle] = useState("Basic Column Chart");
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
        link.download = "column-chart-basic.png";

        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };



  const isValidArray = (arr) =>
    Array.isArray(arr) && arr.every((v) => typeof v === "number");

  const chartSeries = [
    {
      name: seriesNameHigh,
      data: isValidArray(dataHigh) ? dataHigh : [],
    },
    {
      name: seriesNameMid,
      data: isValidArray(dataMid) ? dataMid : [],
    },
    {
      name: seriesNameLow,
      data: isValidArray(dataLow) ? dataLow : [],
    },
  ];

  console.log("📊 chartSeries:", chartSeries);

  const chartOptions = {
    chart: {
      height: 350,
      type: "bar",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.5,
      },
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

  const [chartId, setChartId] = useState(null);

  // 🚫 Hindari error slice dengan sinkronisasi array panjang
  useEffect(() => {
    console.log("⛳ useEffect normalize", {
      categories,
      dataHigh,
      dataMid,
      dataLow,
    });

    if (
      !Array.isArray(categories) ||
      !Array.isArray(dataHigh) ||
      !Array.isArray(dataMid) ||
      !Array.isArray(dataLow)
    ) {
      console.warn("⚠️ Salah satu array bukan array, skip normalisasi");
      return;
    }

    const maxLen = Math.max(
      categories.length,
      dataHigh.length,
      dataMid.length,
      dataLow.length
    );

    const normalize = (arr, filler = 0) => {
      const safe = Array.isArray(arr) ? [...arr] : [];
      while (safe.length < maxLen) safe.push(filler);
      return safe.slice(0, maxLen);
    };

    const newCategories = normalize(categories, "");
    const newDataHigh = normalize(dataHigh.map(Number));
    const newDataMid = normalize(dataMid.map(Number));
    const newDataLow = normalize(dataLow.map(Number));

    // ✅ Cek apakah data benar-benar berubah sebelum setState
    const isDifferent = (a, b) =>
      a.length !== b.length || a.some((v, i) => v !== b[i]);

    if (isDifferent(categories, newCategories)) setCategories(newCategories);
    if (isDifferent(dataHigh, newDataHigh)) setDataHigh(newDataHigh);
    if (isDifferent(dataMid, newDataMid)) setDataMid(newDataMid);
    if (isDifferent(dataLow, newDataLow)) setDataLow(newDataLow);
  }, [categories, dataHigh, dataMid, dataLow]);

  useEffect(() => {
    const editingChart = localStorage.getItem("editingChart");
    if (!editingChart) return;

    console.log("🟡 editingChart (raw):", editingChart);

    try {
      const parsed = JSON.parse(editingChart);
      console.log("🟢 editingChart (parsed):", parsed);
      if (
        !parsed ||
        typeof parsed !== "object" ||
        !["bar", "column"].includes(parsed.chart_type)
      )
        return;

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
        if (Array.isArray(lc)) {
          if (lc[0]) setLineColor(lc[0]);
          if (lc[1]) setLineColorLow(lc[1]);
          if (lc[2]) setLineColorMid(lc[2]);
        }
      }

      if (parsed.categories) {
        const cat =
          typeof parsed.categories === "string"
            ? JSON.parse(parsed.categories)
            : parsed.categories;
        if (Array.isArray(cat)) setCategories(cat);
      }

      if (parsed.data) {
        console.log("📦 parsed.data:", parsed.data);
        const d =
          typeof parsed.data === "string"
            ? JSON.parse(parsed.data)
            : parsed.data;

        console.log("🔍 parsed.data (parsed):", d);

        if (Array.isArray(d)) {
          if (d[0]?.name) setSeriesNameHigh(d[0].name);
          if (d[1]?.name) setSeriesNameMid(d[1].name);
          if (d[2]?.name) setSeriesNameLow(d[2].name);
          if (Array.isArray(d[0]?.data)) setDataHigh(d[0].data);
          if (Array.isArray(d[1]?.data)) setDataMid(d[1].data);
          if (Array.isArray(d[2]?.data)) setDataLow(d[2].data);
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
                      placeholder="Mid"
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
          {Array.isArray(chartSeries) && chartSeries.length > 0 && (
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={450}
            />
          )}
        </div>
      </div>

      <button className={styles.downloadButton} onClick={handleDownload}>
        Download Chart
      </button>
    </div>
  );
};

export default ESColumnChartBasic;
