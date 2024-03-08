import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const Values = ({ tokens }) => {

  const defaultDates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const defaultValues = [11.1, 22.2, 33.3, 42.0, 55.5, 62.1, 77.7, 88.8];

  const [dates, setDates] = useState(null);
  const [values, setValues] = useState(null);

  const calculateSevenDayValue = () => {
    const totalValues = [0, 0, 0, 0, 0, 0, 0, 0];
    tokens.forEach(token => {
      let index = -1;
      token.prices.forEach(price => {
        totalValues[++index] += token.balance * price[1];
        totalValues[index] = Number(totalValues[index].toFixed(2));
      });
      setValues(totalValues);

      let dates = Object.values(token.prices).flatMap(price => price[0]);
      dates = dates.map(date => 
        new Date(date).toLocaleDateString(undefined, 
          {weekday: 'short', month: 'short', day: 'numeric'})
        );
      setDates(dates);
    });
  };
  
  useEffect(() => {
    if (tokens.length > 0) {
      calculateSevenDayValue();
    } else {
      setDates(null);
      setValues(null);
    }
  }, [tokens]);

  const labels = dates ? dates : defaultDates;
  const series = [{ data: values ? values : defaultValues }];

  const options = {
    id: 'values-chart',
    labels: labels,
    colors: [],
    stroke: {
      curve: "smooth",
      colors: ["#488451"]
    },
    grid: {
      show: false
    },
    xaxis: {
      categories: dates ? dates : defaultDates,
      labels: {
        show: true,
        rotateAlways: true,
        rotate: -45,
        offsetY: 10,
        style: {
          colors: "#FFFFFF",
        }
      },
    },
    yaxis: {
      labels: {
        show: true,
        offsetX: -10,
        style: {
          colors: "#FFFFFF"
        }
      },
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      style: {
        fontSize: '12px',
        background: "#FFFFFF"
      },
    },
    markers: {
      size: 6, // Set the marker size
      colors: ['#2F4858'], // Set the marker color to #2F4858
      strokeColors: '#fff', // Set the marker border color
      strokeWidth: 2, // Set the marker border width
      hover: {
        size: 8, // Set the marker size on hover
      },
    }
    // }
  };

  return (
    <div className="value">
      <h3 className="value__title">Portfolio 7 Day Value</h3>
      <div className="value__chart">
        <Chart 
            options={options}
            series={series}
            type="line"
            width="500"
        />
      </div>
    </div>
  );
}

export default Values;
