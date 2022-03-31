import { PickCountriesType, SummaryType } from 'Covid';

const ConfirmCasesRank = ($target: HTMLOListElement, data: SummaryType) => {
  let state: { result: PickCountriesType[] } = { result: [] };

  const setState = () => {
    const sortedData = data.Countries.sort(
      (a, b) => b.TotalConfirmed - a.TotalConfirmed,
    );
    state = { result: sortedData };
  };

  const template = () => {
    const html = state.result
      .map(
        (item: PickCountriesType) =>
          `<li class="list-item flex align-center" id=${item.Slug.toLocaleString()}>
             <span class="cases">${item.TotalConfirmed.toLocaleString()}</span>
             <p class="country">${item.Country}</p>
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
export default ConfirmCasesRank;
