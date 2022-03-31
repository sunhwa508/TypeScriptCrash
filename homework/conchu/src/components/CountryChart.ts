import { PickCountriesDetailType } from 'Covid';
import Chart from 'chart.js/auto';

const CountryChart = (
  $target: HTMLCanvasElement,
  data: PickCountriesDetailType[],
) => {
  let state: { chartData: number[]; chartLabel: string[] } = {
    chartData: [],
    chartLabel: [],
  };

  const renderChart = (data: number[], labels: string[]) => {
    const ctx = $target.getContext('2d');
    if (ctx === null) throw new Error('canvas is null');
    Chart.defaults.color = '#f5eaea';
    Chart.defaults.font.family = 'Exo 2';
    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Confirmed for the last two weeks',
            backgroundColor: '#feb72b',
            borderColor: '#feb72b',
            data,
          },
        ],
      },
      options: {},
    });
  };

  const setState = () => {
    const chartData = data.slice(-14).map(value => +value.Cases);
    const chartLabel = data
      .slice(-14)
      .map(value => new Date(value.Date).toLocaleDateString().slice(5, -1));
    renderChart(chartData, chartLabel);
    state = { chartData, chartLabel };
  };

  const template = () => {
    return state;
  };
  const render = () => {
    setState();
    $target.innerHTML = template().toString();
  };

  render();
};
export default CountryChart;
