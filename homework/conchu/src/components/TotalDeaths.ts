import { SummaryType } from 'Covid';
import Component from '../core/Component';
export default class TotalDeaths extends Component {
  render() {
    this.$target.innerHTML = this.template();
  }

  async setup() {
    const { data }: { data: SummaryType } = this.$props;
    const result = data.Countries.reduce(
      (total, current) => (total += current.TotalDeaths),
      0,
    ).toString();
    this.setState({ total: result });
  }

  template() {
    const { total } = this.$state;
    return total;
  }
}
