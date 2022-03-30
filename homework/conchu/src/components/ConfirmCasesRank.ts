import { CountriesObjectType, PickCountriesType, SummaryType } from 'Covid';
import Component from '../core/Component';

export default class ConfirmCasesRank extends Component {
  setup() {
    const { data }: { data: SummaryType } = this.$props;
    const sorted = data.Countries.sort(
      (a, b) => b.TotalConfirmed - a.TotalConfirmed,
    );
    this.setState<{ data: PickCountriesType[] }>({ data: sorted });
  }

  template() {
    const { data } = this.$state;
    const html = data
      .map(
        (item: CountriesObjectType) =>
          `<li class="list-item flex align-center" id=${item.Slug.toLocaleString()}>
             <span class="cases">${item.TotalConfirmed.toLocaleString()}</span>
             <p class="country">${item.Country}</p>
           </li>`,
      )
      .join('');
    return html;
  }

  render() {
    this.$target.innerHTML = this.template();
  }
}
