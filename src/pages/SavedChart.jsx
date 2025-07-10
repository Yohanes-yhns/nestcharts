import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Swal from "sweetalert2";
import styles from "./SavedChart.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const SavedChart = () => {
  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/charts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || "Gagal mengambil data chart.");
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setCharts(data);
        } else {
          throw new Error("Format data dari server tidak valid.");
        }
      } catch (err) {
        console.error("❌ Error mengambil chart:", err.message);
        setErrorMsg(err.message);
        Swal.fire({
          icon: "error",
          title: "Gagal Mengambil Data",
          text: err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCharts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Hapus Chart?",
      text: "Chart ini akan dihapus secara permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/charts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Gagal menghapus chart.");
      }

      setCharts((prev) => prev.filter((chart) => chart.id !== id));
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Chart telah dihapus.",
      });
    } catch (err) {
      console.error("❌ Gagal hapus:", err.message);
      Swal.fire({
        icon: "error",
        title: "Gagal Menghapus Chart",
        text: err.message,
      });
    }
  };

  const handleEdit = (chart) => {
    const routeMap = {
      line: "/basic-line-chart-es",
      area: "/basic-area-chart-es",
      "area-spline": "/area-chart-spline-es",
      bar: "/basic-bar-chart-es",
      "bar-custom": "/custom-bar-chart-es",
      column: "/basic-column-chart-es",
      pie: "/basic-pie-chart-es",
      radial: "/basic-radial-chart-es",
    };

    const targetRoute = routeMap[chart.chart_type] || "/";
    localStorage.setItem("editingChart", JSON.stringify(chart));
    navigate(targetRoute);
  };

  if (loading) return <p>Loading charts...</p>;
  if (errorMsg) return <p style={{ color: "red" }}>❌ {errorMsg}</p>;

  return (
    <>
      <Navbar />
      {charts.length === 0 ? (
        <p>Belum ada chart yang disimpan.</p>
      ) : (
        <div className={styles.main}>
          {charts.map((chart) => {
            let parsedCategories = [];
            let parsedData = [];
            let parsedColors = [];

            try {
              parsedCategories =
                typeof chart.categories === "string"
                  ? JSON.parse(chart.categories)
                  : Array.isArray(chart.categories)
                  ? chart.categories
                  : [];
            } catch (e) {
              console.error("❌ Gagal parse categories:", e.message);
            }

            try {
              if (!chart.data) throw new Error("Data kosong atau undefined");
              parsedData =
                typeof chart.data === "string"
                  ? JSON.parse(chart.data)
                  : Array.isArray(chart.data)
                  ? chart.data
                  : [];

              if (!Array.isArray(parsedData)) {
                throw new Error("Data tidak berupa array");
              }
            } catch (e) {
              console.error("❌ Gagal parse data:", e.message);
              parsedData = [{ name: "Data", data: [] }]; // fallback aman
            }

            try {
              const rawColors = chart.colors ?? chart.line_color;

              parsedColors =
                typeof rawColors === "string"
                  ? JSON.parse(rawColors)
                  : Array.isArray(rawColors)
                  ? rawColors
                  : [rawColors || "#00E396"];
            } catch (e) {
              console.error("❌ Gagal parse colors:", e.message);
              parsedColors = ["#00E396"];
            }

            const options = {
              chart: {
                type:
                  chart.chart_type === "radial"
                    ? "radialBar"
                    : (chart.chart_type || "").includes("area")
                    ? "area"
                    : chart.chart_type || "line",
                toolbar: { show: false },
              },
              plotOptions: {
                bar: {
                  horizontal:
                    chart.chart_type === "bar" && Boolean(chart.is_horizontal),
                  distributed: chart.chart_type === "bar",
                },
              },
              title: {
                text: chart.title || "",
                align: chart.title_align || "center",
                style: {
                  fontSize: chart.font_size ? `${chart.font_size}px` : "18px",
                  fontFamily: chart.font_family || "Arial",
                  fontWeight: chart.is_bold ? "bold" : "normal",
                  color: chart.font_color || "#333",
                },
              },
              xaxis: {
                categories: parsedCategories,
                title: {
                  text: chart.x_axis_title || "",
                },
              },
              yaxis: {
                title: {
                  text: chart.y_axis_title || "",
                },
              },
              colors: parsedColors,
              dataLabels: { enabled: true },
              stroke: { curve: "smooth" },
              legend: { position: "top" },
            };

            const series =
              chart.chart_type === "pie" || chart.chart_type === "radial"
                ? parsedData
                : Array.isArray(parsedData) && parsedData.length > 0
                ? typeof parsedData[0] === "object" && parsedData[0].data
                  ? parsedData
                  : [{ name: "Data", data: parsedData }]
                : [{ name: "Data", data: [] }];

            return (
              <div key={chart.id} className={styles.chartCard}>
                <ReactApexChart
                  options={options}
                  series={series}
                  type={options.chart.type}
                  height={350}
                />
                <div className={styles.buttonGroup}>
                  <button
                    onClick={() => handleEdit(chart)}
                    style={{
                      padding: "0.4rem 0.8rem",
                      backgroundColor: "#3C5B6F",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(chart.id)}
                    style={{
                      padding: "0.4rem 0.8rem",
                      backgroundColor: "#B0413E",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SavedChart;
