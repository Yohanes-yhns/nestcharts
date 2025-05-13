import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllCharts from "./pages/AllCharts";
import Display from "./pages/Display";
import LineChartEditingSpace from "./pages/EditingSpace/ESLineChartBasic";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-charts" element={<AllCharts />} />
        <Route path="/display/:category" element={<Display />} />
        <Route path="/basic-line-chart-es" element={<LineChartEditingSpace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
