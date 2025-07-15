import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      return boxes > 2;
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
          <Link to="/basic-line-chart-es" className={styles.chartBox}>
            <h1>Basic</h1>
            <LineChartBasic />
          </Link>

          <Link
            to="/with-data-labels-line-chart-es"
            className={styles.chartBox}
          >
            <h1>Line Chart with Data Labels</h1>
            <LineChartWithDataLabels />
          </Link>
          <Link to="/step-line-chart-es" className={styles.chartBox}>
            <h1>Step Line Chart</h1>
            <LineChartStepLine />
          </Link>
          <Link to="/dashed-line-chart-es" className={styles.chartBox}>
            <h1>Dashed Line Chart</h1>
            <LineChartDashed />
          </Link>
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
          <Link to="/basic-area-chart-es" className={styles.chartBox}>
            <h1>Basic</h1>
            <AreaChartBasic />
          </Link>
          <Link to="/spline-area-chart-es" className={styles.chartBox}>
            <h1>Spline Area Chart</h1>
            <AreaChartSpline />
          </Link>
          <Link to="/negative-area-chart-es" className={styles.chartBox}>
            <h1>Negative Area Chart</h1>
            <AreaChartNegative />
          </Link>
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
          <Link to="/basic-column-chart-es" className={styles.chartBox}>
            <h1>Basic</h1>
            <ColumnChartBasic />
          </Link>
          <Link
            to="/with-data-labels-column-chart-es"
            className={styles.chartBox}
          >
            <h1>Column With Data Labels</h1>
            <ColumnChartWithDataLabels />
          </Link>
          <Link to="/stacked-column-chart-es" className={styles.chartBox}>
            <h1>Column Chart Stacked</h1>
            <ColumnChartStacked />
          </Link>
          <Link to="/dumbell-column-chart-es" className={styles.chartBox}>
            <h1>Column Dumbell Chart</h1>
            <ColumnChartDumbell />
          </Link>
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
          <Link to="/basic-bar-chart-es" className={styles.chartBox}>
            <h1>Basic</h1>
            <BarChartBasic />
          </Link>
          <Link to="/image-bar-chart-es" className={styles.chartBox}>
            <h1>Image Chart Bar</h1>
            <BarChartImage />
          </Link>
          <Link to="/grouped-bar-chart-es" className={styles.chartBox}>
            <h1>Bar Chart Grouped</h1>
            <BarChartGrouped />
          </Link>
          <Link to="/negative-values-bar-chart-es" className={styles.chartBox}>
            <h1>Bar Chart with Negative</h1>
            <BarChartNegativeValues />
          </Link>
          <Link to="/stacked-bar-chart-es" className={styles.chartBox}>
            <h1>Bar Chart Stacked</h1>
            <BarChartStacked />
          </Link>
          <Link to="/custom-bar-chart-es" className={styles.chartBox}>
            <h1>Custom Chart Bar</h1>
            <BarChartCustom />
          </Link>
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
          <Link to="/basic-pie-chart-es" className={styles.chartBox}>
            <h1>Basic</h1>
            <PieChartBasic />
          </Link>
          <Link to="/donut-pie-chart-es" className={styles.chartBox}>
            <h1>Pie Chart Donut</h1>
            <PieChartDonut />
          </Link>
          <Link to="/image-pie-chart-es" className={styles.chartBox}>
            <h1>Image Pie Chart</h1>
            <PieChartImage />
          </Link>
          <Link to="/monochrome-pie-chart-es" className={styles.chartBox}>
            <h1>Monochrome Pie Chart</h1>
            <PieChartMonochrome />
          </Link>
          <Link to="/gradient-pie-chart-es" className={styles.chartBox}>
            <h1>Gradient Pie Chart</h1>
            <PieChartGradient />
          </Link>
          <Link to="/semi-pie-chart-es" className={styles.chartBox}>
            <h1>Pie Chart Semi Donut</h1>
            <PieChartSemiDonut />
          </Link>
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
          <Link to="/basic-radial-chart-es" className={styles.chartBox}>
            <h1>Basic</h1>
            <RadialChartBasic />
          </Link>
          <Link to="/multiple-radial-chart-es" className={styles.chartBox}>
            <h1>Multiple Radial Chart</h1>
            <RadialChartMultiple />
          </Link>
          <Link to="/custom-radial-chart-es" className={styles.chartBox}>
            <h1>Custom Radial Chart</h1>
            <RadialChartCustom />
          </Link>
          <Link to="/gradient-radial-chart-es" className={styles.chartBox}>
            <h1>Radial Chart Gradient</h1>
            <RadialChartGradient />
          </Link>
          <Link to="/stroked-radial-chart-es" className={styles.chartBox}>
            <h1>Radial Chart Stroked</h1>
            <RadialChartStroked />
          </Link>
          <Link to="/semi-circle-radial-chart-es" className={styles.chartBox}>
            <h1>Radial Chart Semi Circle</h1>
            <RadialChartSemiCircle />
          </Link>
        </div>
      </div>
    </>
  );
}

export default AllCharts;
