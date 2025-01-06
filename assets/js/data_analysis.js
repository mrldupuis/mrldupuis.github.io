<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Data Analysis Tool</title>
    <script src="https://cdn.plotly.com/plotly-latest.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.1/papaparse.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        #controls {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <h1>Interactive Data Analysis Tool</h1>
    <input type="file" id="fileInput" accept=".csv,.txt" />
    <div id="controls"></div>
    <div id="plot"></div>

    <script>
        const fileInput = document.getElementById('fileInput');

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                Papa.parse(file, {
                    header: true,
                    dynamicTyping: true,
                    complete: function(results) {
                        const data = results.data;
                        const columns = Object.keys(data[0]);
                        const numericalCols = columns.filter(col => typeof data[0][col] === 'number');
                        const categoricalCols = columns.filter(col => typeof data[0][col] === 'string');
                        setupControls(data, numericalCols, categoricalCols);
                    }
                });
            }
        });

        function setupControls(data, numericalCols, categoricalCols) {
            const controlsDiv = document.getElementById('controls');
            controlsDiv.innerHTML = '';

            const xSelect = document.createElement('select');
            xSelect.id = 'xAxis';
            numericalCols.forEach(col => {
                const option = document.createElement('option');
                option.value = col;
                option.textContent = col;
                xSelect.appendChild(option);
            });

            const ySelect = document.createElement('select');
            ySelect.id = 'yAxis';
            numericalCols.forEach(col => {
                const option = document.createElement('option');
                option.value = col;
                option.textContent = col;
                ySelect.appendChild(option);
            });

            const colorSelect = document.createElement('select');
            colorSelect.id = 'colorBy';
            const noneOption = document.createElement('option');
            noneOption.value = 'None';
            noneOption.textContent = 'None';
            colorSelect.appendChild(noneOption);
            categoricalCols.forEach(col => {
                const option = document.createElement('option');
                option.value = col;
                option.textContent = col;
                colorSelect.appendChild(option);
            });

            controlsDiv.appendChild(document.createTextNode('X-axis: '));
            controlsDiv.appendChild(xSelect);
            controlsDiv.appendChild(document.createTextNode(' Y-axis: '));
            controlsDiv.appendChild(ySelect);
            controlsDiv.appendChild(document.createTextNode(' Color by: '));
            controlsDiv.appendChild(colorSelect);

            xSelect.addEventListener('change', () => renderPlot(data, xSelect.value, ySelect.value, colorSelect.value));
            ySelect.addEventListener('change', () => renderPlot(data, xSelect.value, ySelect.value, colorSelect.value));
            colorSelect.addEventListener('change', () => renderPlot(data, xSelect.value, ySelect.value, colorSelect.value));

            renderPlot(data, xSelect.value, ySelect.value, colorSelect.value);
        }

        function renderPlot(data, xCol, yCol, colorBy) {
            const trace = {
                x: data.map(row => row[xCol]),
                y: data.map(row => row[yCol]),
                mode: 'markers',
                type: 'scatter',
                marker: { color: colorBy !== 'None' ? data.map(row => row[colorBy]) : null }
            };

            const layout = {
                title: 'Scatter Plot',
                xaxis: { title: xCol },
                yaxis: { title: yCol }
            };

            Plotly.newPlot('plot', [trace], layout);
        }
    </script>
</body>
</html>
