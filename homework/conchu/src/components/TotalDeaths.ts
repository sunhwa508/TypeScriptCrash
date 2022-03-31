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

  const template = () => {
    return state;
  };

  const render = () => {
    setState();
    $target.innerHTML = template().result;
  };

  render();
};

export default TotalDeaths;
