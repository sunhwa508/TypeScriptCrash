import { SummaryType } from 'Covid';

const UpdateTimeStamp = ($target: HTMLParagraphElement, data: SummaryType) => {
  let state = { result: '' };
  const setState = () => {
    const result = new Date(data.Date).toLocaleString();
    state = { result };
  };

  const render = () => {
    setState();
    $target.innerHTML = state.result;
  };

  render();
};

export default UpdateTimeStamp;
