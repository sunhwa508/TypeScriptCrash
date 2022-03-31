import { SummaryType } from 'Covid';

const UpdateTimeStamp = ($target: HTMLParagraphElement, data: SummaryType) => {
  let state = { result: '' };
  const setState = () => {
    const result = new Date(data.Date).toLocaleString();
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
export default UpdateTimeStamp;
