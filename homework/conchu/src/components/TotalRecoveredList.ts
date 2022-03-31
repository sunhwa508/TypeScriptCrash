import { PickCountriesDetailType } from 'Covid';
import { getUnixTimestamp } from '../utils/common';

const TotalRecoveredList = (
  $target: HTMLOListElement,
  data: PickCountriesDetailType[],
) => {
  let state: { result: PickCountriesDetailType[] } = { result: [] };
  const setState = () => {
    const sortedData = data.sort(
      (a, b) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
    );

    state = { result: sortedData };
  };

  const template = () => {
    const html = state.result
      .map(
        (item: PickCountriesDetailType) =>
          `<li class="list-item-b flex align-center">
             <span class="recovered">${item.Cases}</span>
             <p>${new Date(item.Date).toLocaleDateString().slice(0, -1)}</p>
           </li>`,
      )
      .join('');
    return html;
  };
  const render = () => {
    setState();
    $target.innerHTML = template();
  };

  render();
};

export default TotalRecoveredList;
