import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavbarDisplay from "../components/NavbarDisplay";
import styles from "./Display.module.css";
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

const chartComponents = {
  line: [
    {
      name: "Basic Line Chart",
      component: <LineChartBasic key="LineChartBasic" />,
      route: "/basic-line-chart-es",
    },
    {
      name: "Line Chart with Data Labels",
      component: <LineChartWithDataLabels key="LineChartWithDataLabels" />,
    },
    {
      name: "Step Line Chart",
      component: <LineChartStepLine key="LineChartStepLine" />,
    },
    {
      name: "Dashed Line Chart",
      component: <LineChartDashed key="LineChartDashed" />,
    },
  ],
  area: [
    {
      name: "Basic Area Chart",
      component: <AreaChartBasic key="AreaChartBasic" />,
    },
    {
      name: "Spline Area Chart",
      component: <AreaChartSpline key="AreaChartSpline" />,
    },
    {
      name: "Negative Area Chart",
      component: <AreaChartNegative key="AreaChartNegative" />,
    },
  ],
  column: [
    {
      name: "Basic Column Chart",
      component: <ColumnChartBasic key="ColumnChartBasic" />,
    },
    {
      name: "Column Chart with Data Labels",
      component: <ColumnChartWithDataLabels key="ColumnChartWithDataLabels" />,
    },
    {
      name: "Stacked Column Chart",
      component: <ColumnChartStacked key="ColumnChartStacked" />,
    },
    {
      name: "Dumbell Column Chart",
      component: <ColumnChartDumbell key="ColumnChartDumbell" />,
    },
  ],
  bar: [
    {
      name: "Basic Bar Chart",
      component: <BarChartBasic key="BarChartBasic" />,
    },
    {
      name: "Grouped Bar Chart",
      component: <BarChartGrouped key="BarChartGrouped" />,
    },
    {
      name: "Bar Chart with Negative Values",
      component: <BarChartNegativeValues key="BarChartNegativeValues" />,
    },
    {
      name: "Stacked Bar Chart",
      component: <BarChartStacked key="BarChartStacked" />,
    },
    {
      name: "Custom Bar Chart",
      component: <BarChartCustom key="BarChartCustom" />,
    },
    {
      name: "Bar Chart with Image",
      component: <BarChartImage key="BarChartImage" />,
    },
  ],
  pie: [
    {
      name: "Basic Pie Chart",
      component: <PieChartBasic key="PieChartBasic" />,
    },
    {
      name: "Donut Pie Chart",
      component: <PieChartDonut key="PieChartDonut" />,
    },
    {
      name: "Pie Chart with Image",
      component: <PieChartImage key="PieChartImage" />,
    },
    {
      name: "Monochrome Pie Chart",
      component: <PieChartMonochrome key="PieChartMonochrome" />,
    },
    {
      name: "Gradient Pie Chart",
      component: <PieChartGradient key="PieChartGradient" />,
    },
    {
      name: "Semi Donut Pie Chart",
      component: <PieChartSemiDonut key="PieChartSemiDonut" />,
    },
  ],
  radial: [
    {
      name: "Basic Radial Chart",
      component: <RadialChartBasic key="RadialChartBasic" />,
    },
    {
      name: "Multiple Radial Charts",
      component: <RadialChartMultiple key="RadialChartMultiple" />,
    },
    {
      name: "Custom Radial Chart",
      component: <RadialChartCustom key="RadialChartCustom" />,
    },
    {
      name: "Gradient Radial Chart",
      component: <RadialChartGradient key="RadialChartGradient" />,
    },
    {
      name: "Stroked Radial Chart",
      component: <RadialChartStroked key="RadialChartStroked" />,
    },
    {
      name: "Semi Circle Radial Chart",
      component: <RadialChartSemiCircle key="RadialChartSemiCircle" />,
    },
  ],
};

function Display() {
  const { category } = useParams(); // Ambil kategori dari URL
  const [selectedCategory, setSelectedCategory] = useState(category || "line"); // Default "line" jika belum ada kategori

  useEffect(() => {
    if (category) {
      setSelectedCategory(category); // Update kategori berdasarkan URL
    }
  }, [category]);

  const chartsToShow = chartComponents[selectedCategory]; // Menampilkan chart berdasarkan kategori yang dipilih

  return (
  <div className={styles.container}>
    <NavbarDisplay setSelectedCategory={setSelectedCategory} />
    <main className={styles.main}>
      {chartsToShow ? (
        <div className={styles.chartFlex}>
          {chartsToShow.map((chart, index) => (
            <div key={index} className={styles.chartCard}>
              {chart.route ? (
                <Link
                  to={chart.route}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h3 className={styles.chartTitle}>{chart.name}</h3>
                  {chart.component}
                </Link>
              ) : (
                <>
                  <h3 className={styles.chartTitle}>{chart.name}</h3>
                  {chart.component}
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2>Please select a chart category from the sidebar.</h2>
        </div>
      )}
    </main>
  </div>
  )};

export default Display;
