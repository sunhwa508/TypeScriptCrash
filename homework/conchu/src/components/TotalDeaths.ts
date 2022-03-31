import { SummaryType } from 'Covid';

const TotalDeaths = ($target: HTMLParagraphElement, data: SummaryType) => {
  let state = { result: '' };
  const setState = () => {
    const result = data.Countries.reduce(
      (total, current) => (total += current.TotalDeaths),
      0,
    ).toLocaleString();
    state = { result };
  };

  const render = () => {
    setState();
    $target.innerHTML = state.result;
  };

  render();
};

export default TotalDeaths;
