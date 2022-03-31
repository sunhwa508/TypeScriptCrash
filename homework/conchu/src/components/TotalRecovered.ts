import { SummaryType } from 'Covid';

const TotalRecovered = ($target: HTMLParagraphElement, data: SummaryType) => {
  let state = { result: '' };
  const setState = () => {
    const result = data.Countries.reduce(
      (total, current) => (total += current.TotalRecovered),
      0,
    ).toString();
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

export default TotalRecovered;
