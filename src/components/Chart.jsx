import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Chart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Months on X-axis
    datasets: [
      {
        fill: 'start', 
        label: 'Rupees',
        data: [160, 50, 180, 140, 30, 210, 180, 40, 170, 220, 190, 220],   
        backgroundColor:["red"], 
        borderColor: 'green', 
        borderWidth: 2,
        tension: 0, 
        pointBackgroundColor: 'green',
        pointBorderColor: '#fff',
        pointRadius: 5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Disable maintaining aspect ratio
    scales: {
      y: {
        beginAtZero: true,
        max: 250, // Set the maximum value of Y-axis to 250
        ticks: {
          stepSize: 50, // Setting the Y-axis steps as 0, 50, 100, 150, 200, 250
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.5)', // Color of Y-axis grid lines
          borderDash: [5, 5], // Dashed grid lines for Y-axis
        },
      },
      x: {
        grid: {
          color: 'rgba(200, 200, 200, 0.5)', // Color of X-axis grid lines
          borderDash: [5, 5], // Dashed grid lines for X-axis
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the label box (legend)
      },
    },
    elements: {
      line: {
        tension: 0, // Ensure the line is straight
      },
    },
  };

  return (
    <div className='md:w-[77vw] lg:w-[76vw] h-[28vh]' >
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
