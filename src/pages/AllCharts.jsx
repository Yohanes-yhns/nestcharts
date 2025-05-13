import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LineChartBasic from "../components/Charts/Line-charts/LineChartBasic";
import LineChartWithDataLabels from "../components/Charts/Line-charts/LineChartWithDataLabels";
import LineChartStepLine from "../components/Charts/Line-charts/LineChartStepLine";
import LineChartDashed from "../components/Charts/Line-charts/LineChartDashed";
import AreaChartBasic from "../components/Charts/Area-charts/AreaChartBasic";
import AreaChartSpline from "../components/Charts/Area-charts/AreaChartSpline";
import AreaChartNegative from "../components/Charts/Area-charts/AreaChartNegative";
import ColumnChartBasic from "../components/Charts/Column-charts/ColumnChartBasic";
import ColumnChartWithDataLabels from "../components/Charts/Column-charts/ColumnChartWithDataLabels";
import ColumnChartStacked from "../components/Charts/Column-charts/ColumnChartStacked";
import ColumnChartDumbell from "../components/Charts/Column-charts/ColumnChartDumbell";
import BarChartBasic from "../components/Charts/Bar-charts/BarChartBasic";
import BarChartGrouped from "../components/Charts/Bar-charts/BarChartGrouped";
import BarChartNegativeValues from "../components/Charts/Bar-charts/BarChartNegativeValues";
import BarChartStacked from "../components/Charts/Bar-charts/BarChartStacked";
import BarChartCustom from "../components/Charts/Bar-charts/BarChartCustom";
import BarChartImage from "../components/Charts/Bar-charts/BarChartImage";
import PieChartBasic from "../components/Charts/Pie-charts/PieChartBasic";
import PieChartDonut from "../components/Charts/Pie-charts/PieChartDonut";
import PieChartImage from "../components/Charts/Pie-charts/PieChartImage";
import PieChartMonochrome from "../components/Charts/Pie-charts/PieChartMonochrome";
import PieChartGradient from "../components/Charts/Pie-charts/PieChartGradient";
import PieChartSemiDonut from "../components/Charts/Pie-charts/PieChartSemiDonut";
import RadialChartBasic from "../components/Charts/Radial-charts/RadialChartBasic";
import RadialChartMultiple from "../components/Charts/Radial-charts/RadialChartMultiple";
import RadialChartCustom from "../components/Charts/Radial-charts/RadialChartCustom";
import RadialChartGradient from "../components/Charts/Radial-charts/RadialChartGradient";
import RadialChartStroked from "../components/Charts/Radial-charts/RadialChartStroked";
import RadialChartSemiCircle from "../components/Charts/Radial-charts/RadialChartSemiCircle";
import styles from "./AllCharts.module.css";

function AllCharts() {
  const lineRef = useRef();
  const areaRef = useRef();
  const columnRef = useRef();
  const barRef = useRef();
  const pieRef = useRef();
  const radRef = useRef();

  const [showLineArrows, setShowLineArrows] = useState(false);
  const [showAreaArrows, setShowAreaArrows] = useState(false);
  const [showColumnArrows, setShowColumnArrows] = useState(false);
  const [showBarArrows, setShowBarArrows] = useState(false);
  const [showPieArrows, setShowPieArrows] = useState(false);
  const [showRadialArrows, setShowRadialArrows] = useState(false);

  useEffect(() => {
    setShowLineArrows(checkIfScrollable(lineRef));
    setShowAreaArrows(checkIfScrollable(areaRef));
    setShowColumnArrows(checkIfScrollable(columnRef));
    setShowBarArrows(checkIfScrollable(barRef));
    setShowPieArrows(checkIfScrollable(pieRef));
    setShowRadialArrows(checkIfScrollable(radRef));
  }, []);

  const checkIfScrollable = (ref) => {
    if (ref.current) {
      const boxes = ref.current.querySelectorAll(`.${styles.chartBox}`).length;
      return boxes > 3;
    }
    return false;
  };

  const scrollLeft = (ref) => {
    if (ref.current) {
      const firstBox = ref.current.querySelector(`.${styles.chartBox}`);
      const gap = parseInt(getComputedStyle(ref.current).gap) || 0;
      const boxWidth = firstBox.offsetWidth + gap;
      ref.current.scrollBy({ left: -boxWidth, behavior: "smooth" });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      const firstBox = ref.current.querySelector(`.${styles.chartBox}`);
      const gap = parseInt(getComputedStyle(ref.current).gap) || 0;
      const boxWidth = firstBox.offsetWidth + gap;
      ref.current.scrollBy({ left: boxWidth, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />

      {/* Line Charts */}
      <div className={styles.chartContainer}>
        <p>Line Charts</p>
        {showLineArrows && (
          <>
            <button
              className={`${styles.arrowButton} ${styles.left}`}
              onClick={() => scrollLeft(lineRef)}
            >
              «
            </button>
            <button
              className={`${styles.arrowButton} ${styles.right}`}
              onClick={() => scrollRight(lineRef)}
            >
              »
            </button>
          </>
        )}
        <div className={styles.chartRow} ref={lineRef}>
          <div className={styles.chartBox}>
            <h1>Basic</h1>
            <LineChartBasic />
          </div>
          <div className={styles.chartBox}>
            <h1>Line Chart with Data Labels</h1>
            <LineChartWithDataLabels />
          </div>
          <div className={styles.chartBox}>
            <h1>Step Line Chart</h1>
            <LineChartStepLine />
          </div>
          <div className={styles.chartBox}>
            <h1>Dashed Line Chart</h1>
            <LineChartDashed />
          </div>
        </div>
      </div>

      {/* Area Charts */}
      <div className={styles.chartContainer}>
        <p>Area Charts</p>
        {showAreaArrows && (
          <>
            <button
              className={`${styles.arrowButton} ${styles.left}`}
              onClick={() => scrollLeft(areaRef)}
            >
              «
            </button>
            <button
              className={`${styles.arrowButton} ${styles.right}`}
              onClick={() => scrollRight(areaRef)}
            >
              »
            </button>
          </>
        )}
        <div className={styles.chartRow} ref={areaRef}>
          <div className={styles.chartBox}>
            <h1>Basic</h1>
            <AreaChartBasic />
          </div>
          <div className={styles.chartBox}>
            <h1>Spline Area Chart</h1>
            <AreaChartSpline />
          </div>
          <div className={styles.chartBox}>
            <h1>Negative Area Chart</h1>
            <AreaChartNegative />
          </div>
        </div>
      </div>

      {/* Column Charts */}
      <div className={styles.chartContainer}>
        <p>Column Charts</p>
        {showColumnArrows && (
          <>
            <button
              className={`${styles.arrowButton} ${styles.left}`}
              onClick={() => scrollLeft(columnRef)}
            >
              «
            </button>
            <button
              className={`${styles.arrowButton} ${styles.right}`}
              onClick={() => scrollRight(columnRef)}
            >
              »
            </button>
          </>
        )}
        <div className={styles.chartRow} ref={columnRef}>
          <div className={styles.chartBox}>
            <h1>Basic</h1>
            <ColumnChartBasic />
          </div>
          <div className={styles.chartBox}>
            <h1>Column With Data Labels</h1>
            <ColumnChartWithDataLabels />
          </div>
          <div className={styles.chartBox}>
            <h1>Column Chart Stacked</h1>
            <ColumnChartStacked />
          </div>
          <div className={styles.chartBox}>
            <h1>Column Dumbbell Chart</h1>
            <ColumnChartDumbell />
          </div>
        </div>
      </div>

      {/* Bar Charts */}
      <div className={styles.chartContainer}>
        <p>Bar Charts</p>
        {showBarArrows && (
          <>
            <button
              className={`${styles.arrowButton} ${styles.left}`}
              onClick={() => scrollLeft(barRef)}
            >
              «
            </button>
            <button
              className={`${styles.arrowButton} ${styles.right}`}
              onClick={() => scrollRight(barRef)}
            >
              »
            </button>
          </>
        )}
        <div className={styles.chartRow} ref={barRef}>
          <div className={styles.chartBox}>
            <h1>Basic</h1>
            <BarChartBasic />
          </div>
          <div className={styles.chartBox}>
            <h1>Image Chart Bar</h1>
            <BarChartImage />
          </div>
          <div className={styles.chartBox}>
            <h1>Bar Chart Grouped</h1>
            <BarChartGrouped />
          </div>
          <div className={styles.chartBox}>
            <h1>Bar Chart with Negative</h1>
            <BarChartNegativeValues />
          </div>
          <div className={styles.chartBox}>
            <h1>Bar Chart Stacked</h1>
            <BarChartStacked />
          </div>
          <div className={styles.chartBox}>
            <h1>Custom Chart Bar</h1>
            <BarChartCustom />
          </div>
        </div>
      </div>

      {/* Pie Charts */}
      <div className={styles.chartContainer}>
        <p>Pie Charts</p>
        {showPieArrows && (
          <>
            <button
              className={`${styles.arrowButton} ${styles.left}`}
              onClick={() => scrollLeft(pieRef)}
            >
              «
            </button>
            <button
              className={`${styles.arrowButton} ${styles.right}`}
              onClick={() => scrollRight(pieRef)}
            >
              »
            </button>
          </>
        )}
        <div className={styles.chartRow} ref={pieRef}>
          <div className={styles.chartBox}>
            <h1>Basic</h1>
            <PieChartBasic />
          </div>
          <div className={styles.chartBox}>
            <h1>Pie Chart Donut</h1>
            <PieChartDonut />
          </div>
          <div className={styles.chartBox}>
            <h1>Image Pie Chart</h1>
            <PieChartImage />
          </div>
          <div className={styles.chartBox}>
            <h1>Monochrome Pie Chart</h1>
            <PieChartMonochrome />
          </div>
          <div className={styles.chartBox}>
            <h1>Gradient Pie Chart</h1>
            <PieChartGradient />
          </div>
          <div className={styles.chartBox}>
            <h1>Pie Chart Semi Donut</h1>
            <PieChartSemiDonut />
          </div>
        </div>
      </div>

      {/* Radial Charts */}
      <div className={styles.chartContainer}>
        <p>Radial Charts</p>
        {showRadialArrows && (
          <>
            <button
              className={`${styles.arrowButton} ${styles.left}`}
              onClick={() => scrollLeft(radRef)}
            >
              «
            </button>
            <button
              className={`${styles.arrowButton} ${styles.right}`}
              onClick={() => scrollRight(radRef)}
            >
              »
            </button>
          </>
        )}
        <div className={styles.chartRow} ref={radRef}>
          <div className={styles.chartBox}>
            <h1>Basic</h1>
            <RadialChartBasic />
          </div>
          <div className={styles.chartBox}>
            <h1>Multiple Radial Chart</h1>
            <RadialChartMultiple />
          </div>
          <div className={styles.chartBox}>
            <h1>Custom Radial Chart</h1>
            <RadialChartCustom />
          </div>
          <div className={styles.chartBox}>
            <h1>Radial Chart Gradient</h1>
            <RadialChartGradient />
          </div>
          <div className={styles.chartBox}>
            <h1>Radial Chart Stroked</h1>
            <RadialChartStroked />
          </div>
          <div className={styles.chartBox}>
            <h1>Radial Chart Semi Circle</h1>
            <RadialChartSemiCircle />
          </div>
        </div>
      </div>
    </>
  );
}

export default AllCharts;
