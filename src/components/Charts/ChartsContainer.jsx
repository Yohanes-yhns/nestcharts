import React from "react";
import LineChartBasic from "./Line-charts/LineChartBasic";
import AreaChartBasic from "./Area-charts/AreaChartBasic";
import ColumnChartBasic from "./Column-charts/ColumnChartBasic";
import BarChartBasic from "./Bar-charts/BarChartBasic";
import PieChartBasic from "./Pie-charts/PieChartBasic";
import RadialChartBasic from "./Radial-charts/RadialChartBasic";
import styles from "../../styles/ChartsContainer.module.css";

const ChartsContainer = ({ chartsToShow }) => {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartRow}>
        {chartsToShow.includes("area") && (
          <div className={styles.chartBox}>
            <AreaChartBasic />
          </div>
        )}
        {chartsToShow.includes("linechartbasic") && (
          <div className={styles.chartBox}>
            <LineChartBasic />
          </div>
        )}
        {chartsToShow.includes("column") && (
          <div className={styles.chartBox}>
            <ColumnChartBasic />
          </div>
        )}
        {chartsToShow.includes("bar") && (
          <div className={styles.chartBox}>
            <BarChartBasic />
          </div>
        )}
        {chartsToShow.includes("pie") && (
          <div className={styles.chartBox}>
            <PieChartBasic />
          </div>
        )}
        {chartsToShow.includes("radial") && (
          <div className={styles.chartBox}>
            <RadialChartBasic />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartsContainer;
