import { SummaryType } from 'Covid';

const TotalConfirmed = ($target: HTMLSpanElement, data: SummaryType) => {
  let state = { result: '' };
  const setState = () => {
    const result = data.Countries.reduce(
      (total, current) => (total += current.TotalConfirmed),
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

export default TotalConfirmed;
