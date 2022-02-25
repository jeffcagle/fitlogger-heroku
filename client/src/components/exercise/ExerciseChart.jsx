import { useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export default function ExerciseChart({ data: exercise }) {
  // Bindings
  const canvasRef = useRef();
  const theme = useContext(ThemeContext);

  // Draw graph canvas on load
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvasRef.current.getContext('2d');

    function handleResize() {
      ctx.canvas.width = canvas.parentElement.clientWidth;
      ctx.canvas.height = 240;
      const graphTop = 20;
      const graphBottom = canvas.height - 32;
      const graphLeft = 0;
      const graphRight = canvas.width;

      const graphHeight = graphBottom - graphTop;
      const graphWidth = graphRight - graphLeft;
      const graphColumn = graphWidth / 12;
      const graphColumnMid = graphColumn * 0.5;

      // Draw graph rectangle
      ctx.strokeStyle = theme.style === 'dark' ? '#6b758a' : '#9ca3af';
      ctx.strokeRect(graphLeft, graphTop, graphWidth, graphHeight);

      // Assign row height
      const heightAdjuster = 10;

      // Draw horizontal lines
      drawHorizontalLines(
        ctx,
        heightAdjuster,
        graphLeft,
        graphRight,
        graphTop,
        graphHeight,
        theme
      );

      drawVerticalLines(
        ctx,
        graphColumn,
        graphLeft,
        graphTop,
        graphBottom,
        theme
      );

      // Assign current month
      // const currentMonth = parseInt(exercise.updatedAt.split('-')[1]);
      const currentMonth = new Date().getMonth() + 1;

      // Re-order and display last 12 months up to current month
      const months = reorderMonths(currentMonth);

      displayMonths(
        months,
        ctx,
        graphColumn,
        graphColumnMid,
        graphBottom,
        theme
      );

      function drawGraphData(color, dataSet) {
        ctx.beginPath();
        ctx.lineJoin = 'round';
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;

        // Set graph line beginning
        const firstMonth = parseInt(dataSet.at(0).date.split('-')[1]);
        let monthIndex;

        if (firstMonth !== currentMonth) {
          monthIndex = firstMonth - currentMonth - 1;
        }

        if (firstMonth === currentMonth) {
          monthIndex = -1;
        }

        if (firstMonth === currentMonth - 1) {
          monthIndex = -2;
        }

        if (firstMonth === currentMonth - 2) {
          monthIndex = -3;
        }

        const grid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        ctx.moveTo(
          graphColumn * grid.at(monthIndex - 1) - graphColumnMid,
          graphBottom
        );

        // Find max data value for items in data set
        const maxValue = getMaxDataValue(dataSet);

        for (let [index, item] of dataSet.entries()) {
          // Adjust value to fit within graph
          const adjustedValue = item.value * (heightAdjuster / maxValue);

          // Get month number for item and re-assign number, if needed
          let month = parseInt(dataSet.at(index).date.split('-')[1]);
          if (month + 10 <= 12) {
            month = month + 10;
          } else {
            month = month - currentMonth;
          }

          ctx.fillStyle = color;
          ctx.fillRect(
            graphColumn * month - graphColumnMid - 4,
            (-graphHeight / heightAdjuster + 1) * adjustedValue +
              graphHeight +
              graphTop -
              4,
            7,
            7
          );

          // Draw graph lines
          ctx.lineTo(
            graphColumn * month - graphColumnMid - 2,
            (-graphHeight / heightAdjuster + 1) * adjustedValue +
              graphHeight +
              graphTop
          );
        }
        ctx.stroke();
      }

      // Graph data
      const dataSets = {
        sets: filterDataInMonths(exercise.setLogs),
        reps: filterDataInMonths(exercise.repLogs.values),
        weight: filterDataInMonths(exercise.weightLogs),
        rest: filterDataInMonths(exercise.restLogs),
      };

      // Add graph data
      drawGraphData('#38bdf8', dataSets.sets);
      drawGraphData('#0369a1', dataSets.reps);
      drawGraphData('#f97316', dataSets.weight);
      drawGraphData(
        theme.style === 'dark' ? '#b0b9cf' : '#374151',
        dataSets.rest
      );
    }
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [exercise, theme]);

  return (
    <div className="progress-history">
      <h2>Progress History</h2>
      <p>View trends on a monthly basis for each exercise metric.</p>
      <canvas ref={canvasRef} id="exercise-history"></canvas>
      <div className="legend flex gap-6 mt-6 text-gray-600 dark:text-neutral-300 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-sky-400"></div>Sets
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-sky-700"></div>Reps / Seconds
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-orange-500"></div>Weight
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-700 dark:bg-neutral-300"></div>
          Rest
        </div>
      </div>
    </div>
  );

  // Helper functions

  function drawHorizontalLines(
    ctx,
    heightAdjuster,
    graphLeft,
    graphRight,
    graphTop,
    graphHeight,
    theme
  ) {
    ctx.beginPath();
    ctx.strokeStyle = theme.style === 'dark' ? '#414754' : '#e5e7eb';

    for (let x = 1; x < heightAdjuster; x++) {
      ctx.moveTo(
        graphLeft,
        graphTop + (graphHeight / (heightAdjuster - 1)) * x
      );
      ctx.lineTo(
        graphRight,
        graphTop + (graphHeight / (heightAdjuster - 1)) * x
      );
    }
    ctx.stroke();
  }

  function drawVerticalLines(
    ctx,
    graphColumn,
    graphLeft,
    graphTop,
    graphBottom,
    theme
  ) {
    ctx.beginPath();
    ctx.strokeStyle = theme.style === 'dark' ? '#414754' : '#e5e7eb';

    for (let x = 1; x < 22; x += 2) {
      ctx.moveTo(graphLeft + (graphColumn / 2) * x, graphBottom);
      ctx.lineTo(graphLeft + (graphColumn / 2) * x, graphTop);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = theme.style === 'dark' ? '#525969' : '#e5e7eb';

    ctx.lineWidth = 4;

    ctx.moveTo(graphLeft + (graphColumn / 2) * 23, graphBottom);
    ctx.lineTo(graphLeft + (graphColumn / 2) * 23, graphTop);

    ctx.stroke();
  }

  function filterDataInMonths(data) {
    const newArray = [];
    let lastDate = 0;
    for (let item of data) {
      if (parseInt(item.date.split('-')[1]) === lastDate) {
        newArray[newArray.length - 1] = item;
      } else {
        newArray.push(item);
        lastDate = parseInt(item.date.split('-')[1]);
      }
    }

    return newArray;
  }

  function getMaxDataValue(data) {
    let largest = 0;

    for (let item of data) {
      if (item.value > largest) {
        largest = parseInt(item.value);
      }
    }

    return largest;
  }

  function reorderMonths(currentMonth) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const reorderedMonths = [];

    for (let [index] of months.entries()) {
      const pointer = (index + currentMonth) % 12;
      reorderedMonths.push(months[pointer]);
    }

    return reorderedMonths;
  }

  function displayMonths(
    months,
    ctx,
    graphColumn,
    graphColumnMid,
    graphBottom,
    theme
  ) {
    ctx.fillStyle = theme.style === 'dark' ? '#919db8' : '#6b7280';

    for (let [index, month] of months.entries()) {
      ctx.fillText(
        month,
        graphColumn * (index + 1) - graphColumnMid - 8,
        graphBottom + 25
      );
    }
  }
}
