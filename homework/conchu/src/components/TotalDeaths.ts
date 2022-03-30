import { SummaryType } from 'Covid';
import Component from '../core/Component';
export default class TotalDeaths extends Component {
  setup() {
    const { data }: { data: SummaryType } = this.$props;
    const total = data.Countries.reduce(
      (total, current) => (total += current.TotalDeaths),
      0,
    ).toLocaleString();
    this.setState<{ total: string }>({ total });
  }

  template() {
    const { total } = this.$state;
    return total;
  }

  render() {
    this.$target.innerHTML = this.template();
  }
}
