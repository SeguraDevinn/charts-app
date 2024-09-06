"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsStock from 'highcharts/modules/stock';
import HighchartsMore from 'highcharts/highcharts-more';

// Initialize Highcharts modules
HighchartsMore(Highcharts);
HighchartsStock(Highcharts);

const Dashboard = () => {
  // State to hold chart data
  const [candlestickData, setCandlestickData] = useState([]);
  const [lineChartData, setLineChartData] = useState({ categories: [], data: [] });
  const [barChartData, setBarChartData] = useState({ categories: [], data: [] });
  const [pieChartData, setPieChartData] = useState({ categories: [], data: [] });

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from multiple endpoints
        const [candlestickRes, lineChartRes, barChartRes, pieChartRes] = await Promise.all([
          axios.get('http://localhost:8000/api/candlestick-data/'),
          axios.get('http://localhost:8000/api/line-chart-data/'),
          axios.get('http://localhost:8000/api/bar-chart-data/'),
          axios.get('http://localhost:8000/api/pie-chart-data/')
        ]);

        // Update state with fetched data
        setCandlestickData(candlestickRes.data.data || []);
        setLineChartData(lineChartRes.data);
        setBarChartData(barChartRes.data);
        setPieChartData(pieChartRes.data);
      } catch (error) {
        // Log any errors during data fetching
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Chart options for customization
  const lineChartOptions = {
    chart: {
      type: 'line',
      height: '400px'
    },
    title: {
      text: 'Line Chart'
    },
    xAxis: {
      categories: lineChartData.categories
    },
    series: [{
      name: 'Line Chart Data',
      data: lineChartData.data
    }]
  };

  const barChartOptions = {
    chart: {
      type: 'bar',
      height: '400px'
    },
    title: {
      text: 'Bar Chart'
    },
    xAxis: {
      categories: barChartData.categories
    },
    series: [{
      name: 'Bar Chart Data',
      data: barChartData.data
    }]
  };

  const pieChartOptions = {
    chart: {
      type: 'pie',
      height: '400px'
    },
    title: {
      text: 'Pie Chart'
    },
    series: [{
      name: 'Pie Chart Data',
      data: (pieChartData.labels || []).map((label, index) => ({
        name: label,
        y: (pieChartData.data && pieChartData.data[index]) || 0
      }))
    }]
  };

  const candlestickChartOptions = {
    chart: {
      type: 'candlestick',
      height: '400px'
    },
    title: {
      text: 'Candlestick Chart'
    },
    xAxis: {
      type: 'datetime'
    },
    series: [{
      name: 'Candlestick',
      data: candlestickData
    }]
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Line Chart */}
        <div className="chart-container">
          <h2 className="chart-title">Line Chart</h2>
          <HighchartsReact
            highcharts={Highcharts}
            options={lineChartOptions}
          />
        </div>

        {/* Bar Chart */}
        <div className="chart-container">
          <h2 className="chart-title">Bar Chart</h2>
          <HighchartsReact
            highcharts={Highcharts}
            options={barChartOptions}
          />
        </div>

        {/* Pie Chart */}
        <div className="chart-container">
          <h2 className="chart-title">Pie Chart</h2>
          <HighchartsReact
            highcharts={Highcharts}
            options={pieChartOptions}
          />
        </div>

        {/* Candlestick Chart */}
        <div className="chart-container">
          <h2 className="chart-title">Candlestick Chart</h2>
          <HighchartsReact
            highcharts={Highcharts}
            options={candlestickChartOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
