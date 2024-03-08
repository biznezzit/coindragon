import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const Holdings = ({ tokens }) => {

  const defaultSymbols = ['A', 'B', 'C', 'D', 'E', 'F'];
  const defaultBalances = [11.1, 22.2, 33.3, 55.5, 77.7, 88.8];

  const [symbols, setSymbols] = useState(null);
  const [balances, setBalances] = useState(null);

  const calculateValue = () => {
    let symbs = [];
    let bals = [];
    tokens.forEach(token => {
      symbs.push(token.market.symbol.toUpperCase());
      bals.push(token.balance);
      // TODO: Better option:
      // bals.push(token.value);
    });
    setSymbols(symbs);
    setBalances(bals);
  };

  useEffect(() => {
    if (tokens.length > 0) {
      calculateValue();
    } else {
      setSymbols(null);
    }
  }, [tokens]);

  const labels = symbols ? symbols : defaultSymbols;
  const series = balances ? balances : defaultBalances;

  const options = {
    id: 'holdings-chart',
    labels: labels,
    legend: {
      position: 'left',
      horizontalAlign: 'center',
      labels: {
        fontSize: '48px',
        fontWeigth: 'bold',
        colors: '#FFFFFF'
      }
    }
  };

  return (
    <div className="holdings">
      <h3 className="holdings__title">Asset Holdings</h3>
      <div className="holdings__chart">
        <Chart 
          options={options}
          series={series}
          type="pie"
          width="420"
        />
      </div>
    </div>
  );
}

export default Holdings;
