import { CountriesObjectType, SummaryType } from 'Covid';
import Component from '../core/Component';

export default class ConfirmCasesRank extends Component {
  render() {
    this.$target.innerHTML = this.template();
  }

  async setup() {
    const { data }: { data: SummaryType } = this.$props;
    const sorted = data.Countries.sort(
      (a, b) => b.TotalConfirmed - a.TotalConfirmed,
    );
    this.setState({ data: sorted });
  }

  template() {
    const { data } = this.$state;
    const html = data
      .map(
        (item: CountriesObjectType) =>
          `<li class="list-item flex align-center" id=${item.Slug.toString()}>
             <span class="cases">${item.TotalConfirmed.toString()}</span>
             <p class="country">${item.Country}</p>
           </li>`,
      )
      .join('');
    return html;
  }
}
