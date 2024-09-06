"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [candlestickData, setCandlestickData] = useState([]);
  const [lineChartData, setLineChartData] = useState({ labels: [], data: [] });
  const [barChartData, setBarChartData] = useState({ labels: [], data: [] });
  const [pieChartData, setPieChartData] = useState({ labels: [], data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candlestickRes, lineChartRes, barChartRes, pieChartRes] = await Promise.all([
          axios.get('http://localhost:8000/api/candlestick-data/'),
          axios.get('http://localhost:8000/api/line-chart-data/'),
          axios.get('http://localhost:8000/api/bar-chart-data/'),
          axios.get('http://localhost:8000/api/pie-chart-data/')
        ]);

        console.log('Candlestick Data:', candlestickRes.data);
        console.log('Line Chart Data:', lineChartRes.data);
        console.log('Bar Chart Data:', barChartRes.data);
        console.log('Pie Chart Data:', pieChartRes.data);

        setCandlestickData(candlestickRes.data.data || []);
        setLineChartData(lineChartRes.data);
        setBarChartData(barChartRes.data);
        setPieChartData(pieChartRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const lineChartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true }
    }
  };

  const barChartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true }
    }
  };

  const pieChartOptions = {
    maintainAspectRatio: false
  };

  const candlestickOptions = {
    chart: {
      type: 'candlestick',
      height: 400
    },
    rangeSelector: {
      selected: 1
    },
    series: [{
      data: candlestickData
    }]
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="chart-container">
          <h2 className="chart-title">Line Chart</h2>
          <Line
            data={{
              labels: lineChartData.labels,
              datasets: [{
                label: 'Line Chart Data',
                data: lineChartData.data,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)'
              }]
            }}
            options={lineChartOptions}
          />
        </div>
        <div className="chart-container">
          <h2 className="chart-title">Bar Chart</h2>
          <Bar
            data={{
              labels: barChartData.labels,
              datasets: [{
                label: 'Bar Chart Data',
                data: barChartData.data,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)'
              }]
            }}
            options={barChartOptions}
          />
        </div>
        <div className="chart-container">
          <h2 className="chart-title">Pie Chart</h2>
          <Pie
            data={{
              labels: pieChartData.labels,
              datasets: [{
                label: 'Pie Chart Data',
                data: pieChartData.data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
              }]
            }}
            options={pieChartOptions}
          />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;