/*
* Created by Devinn Segura on September 5, 2024
* The purpose of this application is to create a dashbaord that displays
* information from a back-end that I have created. 
 */

// Imports
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsStock from 'highcharts/modules/stock';
import HighchartsMore from 'highcharts/highcharts-more';

// This is to initialize the Highchart modules that I use to create the graphs
HighchartsMore(Highcharts);
HighchartsStock(Highcharts);

const Dashboard = () => {

  // This initializes the state to store the candlestick data in an empty array 
  const [candlestickData, setCandlestickData] = useState([]);

  // This initializes the state to store the line chart as an object
  // that contain the proper elements for use of the API
  const [lineChartData, setLineChartData] = useState({ categories: [], data: [] });
  const [barChartData, setBarChartData] = useState({ categories: [], data: [] });
  const [pieChartData, setPieChartData] = useState({ categories: [], data: [] });

  // Initializes the error message as an empty string incase there is 
  // an error fetching the data from the API
  const [errorMessage, setErrorMessage] = useState('');

  // useEffect is used to fetch the data from the API 
  useEffect(() => {
    // Async function that fetches the data 
    const fetchData = async () => {
      try {
        // Fetch data from multiple endpoints
        const [candlestickRes, lineChartRes, barChartRes, pieChartRes] = await Promise.all([
          axios.get('http://localhost:8000/api/candlestick-data/'),
          axios.get('http://localhost:8000/api/line-chart-data/'),
          axios.get('http://localhost:8000/api/bar-chart-data/'),
          axios.get('http://localhost:8000/api/pie-chart-data/')
        ]);

        // Update the state with the fetched data
        // If no data is given to the candlestick, then default to an 
        // empty array
        setCandlestickData(candlestickRes.data.data || []);
        setLineChartData(lineChartRes.data);
        setBarChartData(barChartRes.data);
        setPieChartData(pieChartRes.data);

        // Clear any error message that may have been initiated
        setErrorMessage('');
      } catch (error) {
        // If there is an error display this message 
        setErrorMessage('Error fetching data. Please try again later.');

        // sends error to console
        console.error('Error fetching data:', error);
      }
    };

    // Calls the fetch data function
    fetchData();
    // Used this to ensure no multiple calls 
  }, []);

  // These are the charts that will define specific details about the 
  // charts like settings, chart type, title, and axis

  // Line chart options
  const lineChartOptions = {
    chart: {
      type: 'line', // Chart type
      height: '400px' // Max height
    },
    title: {
      text: 'Line Chart' // Title
    },
    xAxis: {
      categories: lineChartData.categories // Uses the state data for x-axis label
    },
    series: [{
      name: 'Line Chart Data', // Label for data
      data: lineChartData.data // Uses the data for the y-axis
    }]
  };

// Bar chart options, similar to the line chart
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

  // Pie chart options 
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

  // Candle stick options
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
    yAxis: {
      title: {
        text: 'Price'
      }
    },
    plotOptions: {
      candlestick: {
        color: '#FF0000', // Red color for decreasing values
        upColor: '#00FF00', // Green color for increasing values
        colorByPoint: false, // Use color and upColor settings
      }
    },
    series: [{
      name: 'Candlestick',
      data: (candlestickData || []).map(point => [
        new Date(point.x).getTime(), // Converts data to timestamp
        // All data for graph
        point.open, // Open
        point.high, // High
        point.low, // Low
        point.close // Close
      ])
    }],
    
  };

  return (
    // The main container for the dashboard, this has responsive styling
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Dashboard</h1>

      {errorMessage && (
      <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg mb-4">
        {/* Error message that shows when API call fails*/}
        <h2 className="text-xl font-bold ">Error: {errorMessage} </h2>
        
      </div>
    )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Line Chart */}
        <div className="chart-container">
          <h2 className="chart-title">Line Chart</h2>
          {/* Create the chart with options specified above*/}
          <HighchartsReact
            highcharts={Highcharts}
            options={lineChartOptions}
          />
        </div>

        {/* Bar Chart */}
        <div className="chart-container">
          <h2 className="chart-title">Bar Chart</h2>
          {/* Create the chart with options specified above*/}
          <HighchartsReact
            highcharts={Highcharts}
            options={barChartOptions}
          />
        </div>

        {/* Pie Chart */}
        <div className="chart-container">
          <h2 className="chart-title">Pie Chart</h2>
          {/* Create the chart with options specified above*/}
          <HighchartsReact
            highcharts={Highcharts}
            options={pieChartOptions}
          />
        </div>

        {/* Candlestick Chart */}
        <div className="chart-container">
          <h2 className="chart-title">Candlestick Chart</h2>
          {/* Create the chart with options specified above*/}
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
