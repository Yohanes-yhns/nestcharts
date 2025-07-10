import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllCharts from "./pages/AllCharts";
import About from "./pages/About";
import SavedChart from "./pages/SavedChart";
import Display from "./pages/Display";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import LineChartBasicEditingSpace from "./pages/EditingSpace/LineCharts/ESLineChartBasic";
import LineChartWithDataLabelsEditingSpace from "./pages/EditingSpace/LineCharts/ESLineChartWithDataLabels";
import LineChartStepEditingSpace from "./pages/EditingSpace/LineCharts/ESLineChartStep";
import LineChartDashedEditingSpace from "./pages/EditingSpace/LineCharts/ESLineChartDashed";
import BarChartBasicEditingSpace from "./pages/EditingSpace/BarCharts/ESBarChartBasic";
import BarChartGroupedEditingSpce from "./pages/EditingSpace/BarCharts/ESBarChartGrouped";
import BarChartCustomEditingSpace from "./pages/EditingSpace/BarCharts/ESBarChartCustom";
import BarChartWithNegativeValuesEditingSpace from "./pages/EditingSpace/BarCharts/ESBarChartWithNegativeValues";
import BarChartStackedEditingSpace from "./pages/EditingSpace/BarCharts/ESBarChartStacked";
import BarChartImageEditingSpace from "./pages/EditingSpace/BarCharts/ESBarChartImage";
import AreaChartBasicEditingSpace from "./pages/EditingSpace/AreaCharts/ESAreaChartBasic";
import AreaChartSplineEditingSpace from "./pages/EditingSpace/AreaCharts/ESAreaChartSpline";
import AreaChartNegativeEditingSpace from "./pages/EditingSpace/AreaCharts/ESAreaChartNegative";
import ColumnChartBasicEditingSpace from "./pages/EditingSpace/ColumnCharts/ESColumnChartBasic";
import ColumnChartWithDataLabelsEditingSpace from "./pages/EditingSpace/ColumnCharts/ESColumnChartWithDataLabels";
import ColumnChartStackedEditingSpace from "./pages/EditingSpace/ColumnCharts/ESColumnChartStacked";
import ColumnChartDumbellEditingSpace from "./pages/EditingSpace/ColumnCharts/ESColumnChartDumbell";
import PieChartBasicEditingSpace from "./pages/EditingSpace/PieCharts/ESPieChartBasic";
import PieChartDonutEditingSpace from "./pages/EditingSpace/PieCharts/ESPieChartDonut";
import PieChartWithImageEditingSpace from "./pages/EditingSpace/PieCharts/ESPieChartWithImage";
import PieChartMonochromeEditingSpace from "./pages/EditingSpace/PieCharts/ESPieChartMonochrome";
import PieChartGradientEditingSpace from "./pages/EditingSpace/PieCharts/ESPieChartGradient";
import PieChartSemiDonutEditingSpace from "./pages/EditingSpace/PieCharts/ESPieChartSemiDonut";
import RadialChartBasicEditingSpace from "./pages/EditingSpace/RadialCharts/ESRadialChartBasic";
import RadialChartMultipleEditingSpace from "./pages/EditingSpace/RadialCharts/ESRadialChartMultiple";
import RadialChartGradientEditingSpace from "./pages/EditingSpace/RadialCharts/ESRadialChartGradient";
import RadialChartStrokedEditingSpace from "./pages/EditingSpace/RadialCharts/ESRadialChartStroked";
import RadialChartSemiCircleEditingSpace from "./pages/EditingSpace/RadialCharts/ESRadialChartSemiCircle";
import RadialChartCustomEditingSpace from "./pages/EditingSpace/RadialCharts/ESRadialChartCustom";


function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/saved-chart" element={<SavedChart />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/all-charts" element={<AllCharts />} />
        <Route path="/display/:category" element={<Display />} />
        <Route path="/basic-line-chart-es" element={<LineChartBasicEditingSpace />} />
        <Route path="/with-data-labels-line-chart-es" element={<LineChartWithDataLabelsEditingSpace />} />
        <Route path="/step-line-chart-es" element={<LineChartStepEditingSpace/>} />
        <Route path="/dashed-line-chart-es" element={<LineChartDashedEditingSpace />} />
        <Route path="/basic-bar-chart-es" element={<BarChartBasicEditingSpace />} />
        <Route path="/grouped-bar-chart-es" element={<BarChartGroupedEditingSpce />} />
        <Route path="/custom-bar-chart-es" element={<BarChartCustomEditingSpace />} />
        <Route path="/negative-values-bar-chart-es" element={<BarChartWithNegativeValuesEditingSpace />} />
        <Route path="/stacked-bar-chart-es" element={<BarChartStackedEditingSpace />} />
        <Route path="/image-bar-chart-es" element={<BarChartImageEditingSpace />} />
        <Route path="/basic-area-chart-es" element={<AreaChartBasicEditingSpace />} />
        <Route path="/spline-area-chart-es" element={<AreaChartSplineEditingSpace />} />
        <Route path="/negative-area-chart-es" element={<AreaChartNegativeEditingSpace />} />
        <Route path="/basic-column-chart-es" element={<ColumnChartBasicEditingSpace />} />
        <Route path="/with-data-labels-column-chart-es" element={<ColumnChartWithDataLabelsEditingSpace />} />
        <Route path="/stacked-column-chart-es" element={<ColumnChartStackedEditingSpace />} />
        <Route path="/dumbell-column-chart-es" element={<ColumnChartDumbellEditingSpace/>} />
        <Route path="/basic-pie-chart-es" element={<PieChartBasicEditingSpace/>} />
        <Route path="/donut-pie-chart-es" element={<PieChartDonutEditingSpace/>} />
        <Route path="/image-pie-chart-es" element={<PieChartWithImageEditingSpace/>} />
        <Route path="/monochrome-pie-chart-es" element={<PieChartMonochromeEditingSpace/>} />
        <Route path="/gradient-pie-chart-es" element={<PieChartGradientEditingSpace />} />
        <Route path="/semi-donut-pie-chart-es" element={<PieChartSemiDonutEditingSpace />} />
        <Route path="/basic-radial-chart-es" element={<RadialChartBasicEditingSpace />} />
        <Route path="/multiple-radial-chart-es" element={<RadialChartMultipleEditingSpace />} />
        <Route path="/gradient-radial-chart-es" element={<RadialChartGradientEditingSpace />} />
        <Route path="/stroked-radial-chart-es" element={<RadialChartStrokedEditingSpace />} />
        <Route path="/semi-circle-radial-chart-es" element={<RadialChartSemiCircleEditingSpace />} />
      <Route path="/custom-radial-chart-es" element={<RadialChartCustomEditingSpace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
