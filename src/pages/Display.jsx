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
      route: "/basic-line-chart-es"
    },
    {
      name: "Line Chart with Data Labels",
      component: <LineChartWithDataLabels key="LineChartWithDataLabels" />,
      route: "/with-data-labels-line-chart-es"
    },
    {
      name: "Step Line Chart",
      component: <LineChartStepLine key="LineChartStepLine" />,
      route: "/step-line-chart-es"
    },
    {
      name: "Dashed Line Chart",
      component: <LineChartDashed key="LineChartDashed" />,
      route: "/dashed-line-chart-es"
    },
  ],
  area: [
    {
      name: "Basic Area Chart",
      component: <AreaChartBasic key="AreaChartBasic" />,
      route: "/basic-area-chart-es"
    },
    {
      name: "Spline Area Chart",
      component: <AreaChartSpline key="AreaChartSpline" />,
      route: "/spline-area-chart-es"
    },
    {
      name: "Negative Area Chart",
      component: <AreaChartNegative key="AreaChartNegative" />,
      route: "/negative-area-chart-es"
    },
  ],
  column: [
    {
      name: "Basic Column Chart",
      component: <ColumnChartBasic key="ColumnChartBasic" />,
      route: "/basic-column-chart-es"
    },
    {
      name: "Column Chart with Data Labels",
      component: <ColumnChartWithDataLabels key="ColumnChartWithDataLabels" />,
      route: "/with-data-labels-column-chart-es"
    },
    {
      name: "Stacked Column Chart",
      component: <ColumnChartStacked key="ColumnChartStacked" />,
      route: "/stacked-column-chart-es"
    },
    {
      name: "Dumbell Column Chart",
      component: <ColumnChartDumbell key="ColumnChartDumbell" />,
      route: "/dumbell-column-chart-es"
    },
  ],
  bar: [
    {
      name: "Basic Bar Chart",
      component: <BarChartBasic key="BarChartBasic" />,
      route: "/basic-bar-chart-es"
    },
    {
      name: "Grouped Bar Chart",
      component: <BarChartGrouped key="BarChartGrouped" />,
      route: "/grouped-bar-chart-es"
    },
    {
      name: "Bar Chart with Negative Values",
      component: <BarChartNegativeValues key="BarChartNegativeValues" />,
      route: "/negative-values-bar-chart-es"
    },
    {
      name: "Stacked Bar Chart",
      component: <BarChartStacked key="BarChartStacked" />,
      route: "/stacked-bar-chart-es"
    },
    {
      name: "Custom Bar Chart",
      component: <BarChartCustom key="BarChartCustom" />,
      route: "/custom-bar-chart-es"
    },
    {
      name: "Bar Chart with Image",
      component: <BarChartImage key="BarChartImage" />,
      route: "/image-bar-chart-es"
    },
  ],
  pie: [
    {
      name: "Basic Pie Chart",
      component: <PieChartBasic key="PieChartBasic" />,
      route: "/basic-pie-chart-es"
    },
    {
      name: "Donut Pie Chart",
      component: <PieChartDonut key="PieChartDonut" />,
      route: "/donut-pie-chart-es"
    },
    {
      name: "Pie Chart with Image",
      component: <PieChartImage key="PieChartImage" />,
      route: "/image-pie-chart-es"
    },
    {
      name: "Monochrome Pie Chart",
      component: <PieChartMonochrome key="PieChartMonochrome" />,
      route: "/monochrome-pie-chart-es"
    },
    {
      name: "Gradient Pie Chart",
      component: <PieChartGradient key="PieChartGradient" />,
      route: "/gradient-pie-chart-es"
    },
    {
      name: "Semi Donut Pie Chart",
      component: <PieChartSemiDonut key="PieChartSemiDonut" />,
      route: "/semi-donut-pie-chart-es"
    },
  ],
  radial: [
    {
      name: "Basic Radial Chart",
      component: <RadialChartBasic key="RadialChartBasic" />,
      route: "/basic-radial-chart-es"
    },
    {
      name: "Multiple Radial Charts",
      component: <RadialChartMultiple key="RadialChartMultiple" />,
      route: "/multiple-radial-chart-es"
    },
    {
      name: "Custom Radial Chart",
      component: <RadialChartCustom key="RadialChartCustom" />,
      route: "/custom-radial-chart-es"
    },
    {
      name: "Gradient Radial Chart",
      component: <RadialChartGradient key="RadialChartGradient" />,
      route: "/gradient-radial-chart-es"
    },
    {
      name: "Stroked Radial Chart",
      component: <RadialChartStroked key="RadialChartStroked" />,
      route: "/stroked-radial-chart-es"
    },
    {
      name: "Semi Circle Radial Chart",
      component: <RadialChartSemiCircle key="RadialChartSemiCircle" />,
      route: "/semi-circle-radial-chart-es"
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
