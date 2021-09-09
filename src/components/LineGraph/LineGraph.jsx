import './LineGraph.css';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import numeral from 'numeral';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const LineGraph = () => {
  const [data, setData] = useState([]);

  const buildChartData = (data, casesType = 'cases') => {
    const chartData = [];
    let lastDataPoint;

    for (const [key, value] of Object.entries(data[casesType])) {
      if (lastDataPoint) {
        const newDataPoint = { x: key, y: data[casesType][key] - lastDataPoint };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][key];
    }
    return chartData;
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=120');
      const chartData = buildChartData(data);
      setData(chartData);
    };
    getData();
  }, []);

  return (
    <div className="lineGraph">
      <Line
        data={{
          datasets: [
            {
              backgroundColor: "rgba(204, 16, 52, 0.5)",
              borderColor: "#CC1034",
              data: data,
            },
          ],
        }}
        options={options}
      />
    </div>
  )
}

export default LineGraph
