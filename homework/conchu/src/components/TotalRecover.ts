import { SummaryType } from 'Covid';
import Component from '../core/Component';
export default class TotalRecovered extends Component {
  setup() {
    const { data }: { data: SummaryType } = this.$props;
    const total = data.Countries.reduce(
      (total, current) => (total += current.TotalRecovered),
      0,
    ).toString();
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
