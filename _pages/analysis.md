---
layout: page
permalink: /analysis/
title: analysis
description: An exploratory data analysis tool for your data files. Give it a try with a csv flatfile!
nav: true
nav_order: 6
published: true
---

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.1/papaparse.min.js"
      defer
    ></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
        color: #333;
        line-height: 1.6;
      }
      #controls {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        margin-bottom: 20px;
        background: #f9f9f9;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .filter-group {
        margin: 10px;
        display: flex;
        flex-direction: column;
      }
      input[type="file"],
      select,
      button {
        padding: 10px;
        font-size: 14px;
        border-radius: 4px;
        border: 1px solid #ccc;
        outline: none;
      }
      input[type="file"] {
        margin-bottom: 10px;
      }
      button {
        cursor: pointer;
        background-color: #007bff;
        color: white;
        border: none;
      }
      button:hover {
        background-color: #0056b3;
      }
      #plot {
        margin-top: 20px;
        height: 800px;
      }
      #dataPreview {
        margin-top: 20px;
        max-height: 200px;
        overflow: auto;
        border: 1px solid #ddd;
        padding: 10px;
        background: #f9f9f9;
        border-radius: 8px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      table,
      th,
      td {
        border: 1px solid #ddd;
      }
      th,
      td {
        padding: 8px;
        text-align: left;
      }
      .legend {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
      }
      .legend-item {
        display: flex;
        align-items: center;
        margin-right: 15px;
      }
      .legend-color {
        width: 15px;
        height: 15px;
        margin-right: 5px;
      }
    </style>
  </head>
  <body>
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

    <script>
      document.addEventListener("DOMContentLoaded", function () {
        const fileInput = document.getElementById("fileInput")
        const resetButton = document.getElementById("resetButton")
        const downloadButton = document.getElementById("downloadButton")
        const dataPreview = document.getElementById("dataPreview")
        const plotCanvas = document.getElementById("plot")
        const legendDiv = document.getElementById("legend")
        let chartInstance = null
        let originalData = []
        let filteredData = []

        fileInput.addEventListener("change", (event) => {
          const file = event.target.files[0]
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
                        value.trim() !== ""
                    )
                  )
                  if (!data.length)
                    throw new Error("No valid rows found in the file.")

                  originalData = data
                  filteredData = [...data]
                  const columns = Object.keys(data[0])

                  const numericalCols = columns.filter((col) =>
                    data.every(
                      (row) =>
                        !isNaN(Number(row[col])) && row[col].trim() !== ""
                    )
                  )
                  const categoricalCols = columns.filter(
                    (col) => !numericalCols.includes(col)
                  )

                  setupControls(data, numericalCols, categoricalCols)
                } catch (error) {
                  alert(`Error processing file: ${error.message}`)
                }
              },
              error: function (err) {
                alert(`Error parsing file: ${err.message}`)
              },
            })
          }
        })

        resetButton.addEventListener("click", () => {
          filteredData = [...originalData]
          document.querySelectorAll(".filter-group").forEach((group) => {
            const inputs = group.querySelectorAll("input[type='number']")
            if (inputs.length === 2) {
              const col = inputs[0].id.split("-")[1]
              inputs[0].value = Math.min(
                ...originalData.map((row) => parseFloat(row[col]))
              )
              inputs[1].value = Math.max(
                ...originalData.map((row) => parseFloat(row[col]))
              )
            }

            const checkboxes = group.querySelectorAll("input[type='checkbox']")
            if (checkboxes.length) {
              checkboxes.forEach((cb) => {
                cb.checked = true
              })
            }
          })
          updatePlot()
        })

        downloadButton.addEventListener("click", () => {
          const csv = Papa.unparse(filteredData)
          const blob = new Blob([csv], { type: "text/csv" })
          const url = URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.download = "filtered_data.csv"
          link.click()
          URL.revokeObjectURL(url)
        })

        function setupControls(data, numericalCols, categoricalCols) {
          const controlsDiv = document.getElementById("controls")
          controlsDiv.innerHTML = ""

          const xSelect = document.createElement("select")
          xSelect.id = "xAxis"
          xSelect.setAttribute("aria-label", "Select X-axis")

          const ySelect = document.createElement("select")
          ySelect.id = "yAxis"
          ySelect.setAttribute("aria-label", "Select Y-axis")

          const colorSelect = document.createElement("select")
          colorSelect.id = "colorBy"
          colorSelect.setAttribute("aria-label", "Select Color By")
          const noneOption = document.createElement("option")
          noneOption.value = "None"
          noneOption.textContent = "None"
          colorSelect.appendChild(noneOption)

          numericalCols.forEach((col) => {
            const optionX = document.createElement("option")
            optionX.value = col
            optionX.textContent = col
            xSelect.appendChild(optionX)

            const optionY = document.createElement("option")
            optionY.value = col
            optionY.textContent = col
            ySelect.appendChild(optionY)

            const optionColor = document.createElement("option")
            optionColor.value = col
            optionColor.textContent = col
            colorSelect.appendChild(optionColor)

            // Add filter sliders
            const filterDiv = document.createElement("div")
            filterDiv.className = "filter-group"
            const label = document.createElement("label")
            label.textContent = `Filter ${col}`

            const minInput = document.createElement("input")
            minInput.type = "number"
            minInput.value = Math.min(
              ...data.map((row) => parseFloat(row[col]))
            )
            minInput.id = `filter-${col}-min`

            const maxInput = document.createElement("input")
            maxInput.type = "number"
            maxInput.value = Math.max(
              ...data.map((row) => parseFloat(row[col]))
            )
            maxInput.id = `filter-${col}-max`

            filterDiv.appendChild(label)
            filterDiv.appendChild(document.createTextNode(" Min: "))
            filterDiv.appendChild(minInput)
            filterDiv.appendChild(document.createTextNode(" Max: "))
            filterDiv.appendChild(maxInput)
            controlsDiv.appendChild(filterDiv)

            minInput.addEventListener("input", updateFilteredData)
            maxInput.addEventListener("input", updateFilteredData)
          })

          categoricalCols.forEach((col) => {
            const optionColor = document.createElement("option")
            optionColor.value = col
            optionColor.textContent = col
            colorSelect.appendChild(optionColor)

            const filterDiv = document.createElement("div")
            filterDiv.className = "filter-group"
            const label = document.createElement("label")
            label.textContent = `Filter ${col}`

            const uniqueValues = [...new Set(data.map((row) => row[col]))]
            uniqueValues.forEach((value) => {
              const checkbox = document.createElement("input")
              checkbox.type = "checkbox"
              checkbox.checked = true
              checkbox.value = value
              checkbox.id = `filter-${col}-${value}`

              const checkboxLabel = document.createElement("label")
              checkboxLabel.textContent = value

              filterDiv.appendChild(checkbox)
              filterDiv.appendChild(checkboxLabel)

              checkbox.addEventListener("change", updateFilteredData)
            })
            controlsDiv.appendChild(filterDiv)
          })

          controlsDiv.appendChild(document.createTextNode("X-axis: "))
          controlsDiv.appendChild(xSelect)
          controlsDiv.appendChild(document.createTextNode(" Y-axis: "))
          controlsDiv.appendChild(ySelect)
          controlsDiv.appendChild(document.createTextNode(" Color by: "))
          controlsDiv.appendChild(colorSelect)

          xSelect.addEventListener("change", updatePlot)
          ySelect.addEventListener("change", updatePlot)
          colorSelect.addEventListener("change", updatePlot)

          updatePlot()
        }

        function updateFilteredData() {
          filteredData = originalData.filter((row) => {
            return [...document.querySelectorAll(".filter-group")].every(
              (group) => {
                const inputs = group.querySelectorAll("input[type='number']")
                if (inputs.length === 2) {
                  const min = parseFloat(inputs[0].value)
                  const max = parseFloat(inputs[1].value)
                  const col = inputs[0].id.split("-")[1]
                  return (
                    parseFloat(row[col]) >= min && parseFloat(row[col]) <= max
                  )
                }

                const checkboxes = group.querySelectorAll(
                  "input[type='checkbox']"
                )
                if (checkboxes.length) {
                  const col = checkboxes[0].id.split("-")[1]
                  return [...checkboxes].some(
                    (cb) => cb.checked && cb.value === row[col]
                  )
                }

                return true
              }
            )
          })

          updatePlot()
        }

        function updatePlot() {
          const xCol = document.getElementById("xAxis").value
          const yCol = document.getElementById("yAxis").value
          const colorBy = document.getElementById("colorBy").value
          renderPlot(filteredData, xCol, yCol, colorBy)
        }

        function renderPlot(data, xCol, yCol, colorBy) {
          const xData = data.map((row) => parseFloat(row[xCol]) || null)
          const yData = data.map((row) => parseFloat(row[yCol]) || null)

          let backgroundColors = []
          legendDiv.innerHTML = ""

          if (colorBy !== "None") {
            const uniqueValues = Array.from(
              new Set(data.map((row) => row[colorBy]))
            )

            if (isNaN(parseFloat(uniqueValues[0]))) {
              const colorMap = {}
              uniqueValues.forEach((val, idx) => {
                colorMap[val] = `hsl(${
                  (idx / uniqueValues.length) * 360
                }, 70%, 50%)`
                const legendItem = document.createElement("div")
                legendItem.className = "legend-item"
                const legendColor = document.createElement("div")
                legendColor.className = "legend-color"
                legendColor.style.backgroundColor = colorMap[val]
                legendItem.appendChild(legendColor)
                legendItem.appendChild(document.createTextNode(val))
                legendDiv.appendChild(legendItem)
              })
              backgroundColors = data.map((row) => colorMap[row[colorBy]])
            } else {
              const min = Math.min(
                ...data.map((row) => parseFloat(row[colorBy]))
              )
              const max = Math.max(
                ...data.map((row) => parseFloat(row[colorBy]))
              )
              backgroundColors = data.map((row) => {
                const normalized =
                  (parseFloat(row[colorBy]) - min) / (max - min)
                return `hsl(${(1 - normalized) * 240}, 70%, 50%)`
              })

              const gradientLegend = document.createElement("div")
              gradientLegend.style.background = `linear-gradient(to right, hsl(240, 70%, 50%), hsl(0, 70%, 50%))`
              gradientLegend.style.height = "20px"
              gradientLegend.style.width = "100%"
              gradientLegend.style.marginTop = "10px"
              const legendLabelMin = document.createElement("span")
              legendLabelMin.textContent = min
              const legendLabelMax = document.createElement("span")
              legendLabelMax.textContent = max
              legendLabelMax.style.float = "right"
              legendDiv.appendChild(legendLabelMin)
              legendDiv.appendChild(gradientLegend)
              legendDiv.appendChild(legendLabelMax)
            }
          } else {
            backgroundColors = "rgba(75, 192, 192, 0.6)"
          }

          if (chartInstance) {
            chartInstance.destroy()
          }

          chartInstance = new Chart(plotCanvas, {
            type: "scatter",
            data: {
              datasets: [
                {
                  label: `${yCol} vs ${xCol}`,
                  data: xData.map((x, i) => ({ x, y: yData[i] })),
                  backgroundColor: backgroundColors,
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                x: {
                  type: "linear",
                  position: "bottom",
                  title: {
                    display: true,
                    text: xCol,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: yCol,
                  },
                },
              },
            },
          })
        }

        function renderDataPreview(data) {
          dataPreview.innerHTML =
            "<table><thead><tr>" +
            Object.keys(data[0])
              .map((col) => `<th>${col}</th>`)
              .join("") +
            "</tr></thead><tbody>" +
            data
              .slice(0, 10)
              .map(
                (row) =>
                  `<tr>${Object.values(row)
                    .map((val) => `<td>${val}</td>`)
                    .join("")}</tr>`
              )
              .join("") +
            "</tbody></table>"
        }
      renderDataPreview(data)
      })
    </script>
  </body>
</html>
