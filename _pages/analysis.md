---
layout: page
permalink: /analysis/
title: analysis
description: An exploratory data analysis tool for csv flatfiles.
nav: true
nav_order: 6
published: true
---

<!-- FULL-BLEED HERO (escapes the theme container) -->
<div class="full-bleed">
  <img src="/assets/img/athelney_elephant.jpg" alt="" />
</div>

<!-- Page-specific styles (scoped) -->
<style>
  /* full-bleed helper */
  .full-bleed {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }
  .full-bleed img {
    display: block;
    width: 100%;
    height: auto;
    margin: 0;
  }

  /* Everything below is scoped to this page's app */
  #analysis-app {
    margin-top: 20px;
    font-family: Arial, sans-serif;
    color: #333;
    line-height: 1.6;
  }
  #analysis-app #controls {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;
    background: #f9f9f9;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  #analysis-app .filter-group {
    margin: 10px;
    display: flex;
    flex-direction: column;
  }
  #analysis-app .checkbox-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 5px;
  }
  #analysis-app .checkbox-item {
    display: flex;
    align-items: center;
  }
  #analysis-app .checkbox-item label {
    margin-left: 5px;
  }
  #analysis-app input[type="file"],
  #analysis-app select,
  #analysis-app button {
    padding: 10px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ccc;
    outline: none;
  }
  #analysis-app input[type="file"] {
    margin-bottom: 10px;
  }
  #analysis-app button {
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
  }
  #analysis-app button:hover {
    background-color: #0056b3;
  }
  #analysis-app #plot {
    margin-top: 20px;
    height: 800px;
  }
  #analysis-app #dataPreview {
    margin-top: 20px;
    max-height: 200px;
    overflow: auto;
    border: 1px solid #ddd;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 8px;
  }
  #analysis-app table {
    width: 100%;
    border-collapse: collapse;
  }
  #analysis-app table,
  #analysis-app th,
  #analysis-app td {
    border: 1px solid #ddd;
  }
  #analysis-app th,
  #analysis-app td {
    padding: 8px;
    text-align: left;
  }
  #analysis-app .legend {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  #analysis-app .legend-item {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }
  #analysis-app .legend-color {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
</style>

<!-- App markup -->
<section id="analysis-app">
  <input
    type="file"
    id="fileInput"
    accept=".csv,.txt"
    aria-label="Upload CSV or TXT file"
  />
  <div id="controls"></div>
  <button id="resetButton">Reset Filters</button>
  <button id="downloadButton">Download Filtered Data</button>
  <canvas id="plot" width="800" height="400"></canvas>
  <div id="dataPreview"></div>
  <div id="legend" class="legend"></div>
</section>

<!-- libs -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.1/papaparse.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>
<script src="https://d3js.org/d3.v7.min.js" defer></script>

<!-- page script -->
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const resetButton = document.getElementById("resetButton");
    const downloadButton = document.getElementById("downloadButton");
    const dataPreview = document.getElementById("dataPreview");
    const plotCanvas = document.getElementById("plot");
    const legendDiv = document.getElementById("legend");
    let chartInstance = null;
    let originalData = [];
    let filteredData = [];

    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        Papa.parse(file, {
          header: true,
          dynamicTyping: false,
          complete: function (results) {
            try {
              const data = results.data.filter((row) =>
                Object.values(row).every(
                  (value) =>
                    value !== null &&
                    value !== undefined &&
                    String(value).trim() !== ""
                )
              );
              if (!data.length)
                throw new Error("No valid rows found in the file.");

              originalData = data;
              filteredData = [...data];
              const columns = Object.keys(data[0]);

              const numericalCols = columns.filter((col) =>
                data.every(
                  (row) =>
                    !isNaN(Number(row[col])) &&
                    String(row[col]).trim() !== ""
                )
              );
              const categoricalCols = columns.filter(
                (col) => !numericalCols.includes(col)
              );

              setupControls(data, numericalCols, categoricalCols);
            } catch (error) {
              alert(`Error processing file: ${error.message}`);
            }
          },
          error: function (err) {
            alert(`Error parsing file: ${err.message}`);
          },
        });
      }
    });

    resetButton.addEventListener("click", () => {
      filteredData = [...originalData];
      document.querySelectorAll(".filter-group").forEach((group) => {
        const inputs = group.querySelectorAll("input[type='number']");
        if (inputs.length === 2) {
          const col = inputs[0].id.split("-")[1];
          inputs[0].value = Math.min(
            ...originalData.map((row) => parseFloat(row[col]))
          );
          inputs[1].value = Math.max(
            ...originalData.map((row) => parseFloat(row[col]))
          );
        }

        const checkboxes = group.querySelectorAll("input[type='checkbox']");
        if (checkboxes.length) {
          checkboxes.forEach((cb) => {
            cb.checked = true;
          });
        }
      });
      updatePlot();
    });

    downloadButton.addEventListener("click", () => {
      const csv = Papa.unparse(filteredData);
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "filtered_data.csv";
      link.click();
      URL.revokeObjectURL(url);
    });

    function setupControls(data, numericalCols, categoricalCols) {
      const controlsDiv = document.getElementById("controls");
      controlsDiv.innerHTML = "";

      const xSelect = document.createElement("select");
      xSelect.id = "xAxis";
      xSelect.setAttribute("aria-label", "Select X-axis");

      const ySelect = document.createElement("select");
      ySelect.id = "yAxis";
      ySelect.setAttribute("aria-label", "Select Y-axis");

      const colorSelect = document.createElement("select");
      colorSelect.id = "colorBy";
      colorSelect.setAttribute("aria-label", "Select Color By");
      const noneOption = document.createElement("option");
      noneOption.value = "None";
      noneOption.textContent = "None";
      colorSelect.appendChild(noneOption);

      numericalCols.forEach((col) => {
        const optionX = document.createElement("option");
        optionX.value = col;
        optionX.textContent = col;
        xSelect.appendChild(optionX);

        const optionY = document.createElement("option");
        optionY.value = col;
        optionY.textContent = col;
        ySelect.appendChild(optionY);

        const optionColor = document.createElement("option");
        optionColor.value = col;
        optionColor.textContent = col;
        colorSelect.appendChild(optionColor);

        // Add filter sliders
        const filterDiv = document.createElement("div");
        filterDiv.className = "filter-group";
        const label = document.createElement("label");
        label.textContent = `Filter ${col}`;

        const minInput = document.createElement("input");
        minInput.type = "number";
        minInput.value = Math.min(...data.map((row) => parseFloat(row[col])));
        minInput.id = `filter-${col}-min`;

        const maxInput = document.createElement("input");
        maxInput.type = "number";
        maxInput.value = Math.max(...data.map((row) => parseFloat(row[col])));
        maxInput.id = `filter-${col}-max`;

        filterDiv.appendChild(label);
        filterDiv.appendChild(document.createTextNode(" Min: "));
        filterDiv.appendChild(minInput);
        filterDiv.appendChild(document.createTextNode(" Max: "));
        filterDiv.appendChild(maxInput);
        controlsDiv.appendChild(filterDiv);

        minInput.addEventListener("input", updateFilteredData);
        maxInput.addEventListener("input", updateFilteredData);
      });

      categoricalCols.forEach((col) => {
        const optionColor = document.createElement("option");
        optionColor.value = col;
        optionColor.textContent = col;
        colorSelect.appendChild(optionColor);

        const filterDiv = document.createElement("div");
        filterDiv.className = "filter-group";
        const label = document.createElement("label");
        label.textContent = `Filter ${col}`;

        const checkboxContainer = document.createElement("div");
        checkboxContainer.className = "checkbox-container";

        const uniqueValues = [...new Set(data.map((row) => row[col]))];
        uniqueValues.forEach((value) => {
          const checkboxItem = document.createElement("div");
          checkboxItem.className = "checkbox-item";

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = true;
          checkbox.value = value;
          checkbox.id = `filter-${col}-${value}`;

          const checkboxLabel = document.createElement("label");
          checkboxLabel.textContent = value;
          checkboxLabel.setAttribute("for", checkbox.id);

          checkboxItem.appendChild(checkbox);
          checkboxItem.appendChild(checkboxLabel);
          checkboxContainer.appendChild(checkboxItem);

          checkbox.addEventListener("change", updateFilteredData);
        });

        filterDiv.appendChild(label);
        filterDiv.appendChild(checkboxContainer);
        controlsDiv.appendChild(filterDiv);
      });

      controlsDiv.appendChild(document.createTextNode("X-axis: "));
      controlsDiv.appendChild(xSelect);
      controlsDiv.appendChild(document.createTextNode(" Y-axis: "));
      controlsDiv.appendChild(ySelect);
      controlsDiv.appendChild(document.createTextNode(" Color by: "));
      controlsDiv.appendChild(colorSelect);

      xSelect.addEventListener("change", updatePlot);
      ySelect.addEventListener("change", updatePlot);
      colorSelect.addEventListener("change", updatePlot);

      updatePlot();
    }

    function updateFilteredData() {
      filteredData = originalData.filter((row) => {
        return [...document.querySelectorAll(".filter-group")].every(
          (group) => {
            const inputs = group.querySelectorAll("input[type='number']");
            if (inputs.length === 2) {
              const min = parseFloat(inputs[0].value);
              const max = parseFloat(inputs[1].value);
              const col = inputs[0].id.split("-")[1];
              return parseFloat(row[col]) >= min && parseFloat(row[col]) <= max;
            }

            const checkboxes = group.querySelectorAll(
              "input[type='checkbox']"
            );
            if (checkboxes.length) {
              const col = checkboxes[0].id.split("-")[1];
              return [...checkboxes].some(
                (cb) => cb.checked && cb.value === row[col]
              );
            }

            return true;
          }
        );
      });

      updatePlot();
    }

    function updatePlot() {
      const xCol = document.getElementById("xAxis").value;
      const yCol = document.getElementById("yAxis").value;
      const colorBy = document.getElementById("colorBy").value;
      renderPlot(filteredData, xCol, yCol, colorBy);
    }

    function renderPlot(data, xCol, yCol, colorBy) {
      const xData = data.map((row) => parseFloat(row[xCol]) || null);
      const yData = data.map((row) => parseFloat(row[yCol]) || null);

      let backgroundColors = [];
      legendDiv.innerHTML = "";

      if (colorBy !== "None") {
        const uniqueValues = Array.from(
          new Set(data.map((row) => row[colorBy]))
        );

        if (isNaN(parseFloat(uniqueValues[0]))) {
          const colorMap = {};
          uniqueValues.forEach((val, idx) => {
            colorMap[val] = d3.interpolateViridis(idx / uniqueValues.length);
            const legendItem = document.createElement("div");
            legendItem.className = "legend-item";
            const legendColor = document.createElement("div");
            legendColor.className = "legend-color";
            legendColor.style.backgroundColor = colorMap[val];
            legendItem.appendChild(legendColor);
            legendItem.appendChild(document.createTextNode(val));
            legendDiv.appendChild(legendItem);
          });
          backgroundColors = data.map((row) => colorMap[row[colorBy]]);
        } else {
          const min = Math.min(
            ...data.map((row) => parseFloat(row[colorBy]))
          );
          const max = Math.max(
            ...data.map((row) => parseFloat(row[colorBy]))
          );
          backgroundColors = data.map((row) => {
            const normalized = (parseFloat(row[colorBy]) - min) / (max - min);
            return d3.interpolateViridis(normalized);
          });

          const gradientLegend = document.createElement("div");
          gradientLegend.style.background =
            "linear-gradient(to right, #440154, #21918c, #fde725)";
          gradientLegend.style.height = "20px";
          gradientLegend.style.width = "100%";
          gradientLegend.style.marginTop = "10px";
          gradientLegend.style.display = "flex";
          gradientLegend.style.alignItems = "center";

          const legendLabelMin = document.createElement("span");
          legendLabelMin.textContent = min;
          legendLabelMin.style.fontWeight = "bold";
          legendLabelMin.style.color = "white";

          const legendLabelMax = document.createElement("span");
          legendLabelMax.textContent = max;
          legendLabelMax.style.fontWeight = "bold";
          legendLabelMax.style.marginLeft = "auto";
          legendLabelMax.style.color = "black";

          gradientLegend.appendChild(legendLabelMin);
          const gradientBar = document.createElement("div");
          gradientBar.style.flexGrow = "1";
          gradientLegend.appendChild(gradientBar);
          gradientLegend.appendChild(legendLabelMax);
          legendDiv.appendChild(gradientLegend);
        }
      } else {
        // Default color when "None" is selected
        backgroundColors = data.map(() => "rgba(0,0,0,0.5)");
      }

      if (chartInstance) chartInstance.destroy();

      chartInstance = new Chart(plotCanvas, {
        type: "scatter",
        data: {
          datasets: [
            {
              data: xData.map((x, i) => ({
                x,
                y: yData[i],
                c: colorBy !== "None" ? data[i][colorBy] : undefined,
              })),
              backgroundColor: backgroundColors,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const x = context.parsed.x;
                  const y = context.parsed.y;
                  const c = context.raw.c;
                  return c !== undefined ? `(${x}, ${y}, ${c})` : `(${x}, ${y})`;
                },
              },
            },
          },
          scales: {
            x: { type: "linear", position: "bottom", title: { display: true, text: xCol } },
            y: { title: { display: true, text: yCol } },
          },
        },
      });
    }
  });
</script>
