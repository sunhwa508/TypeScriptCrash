import { SummaryType } from 'Covid';
import Component from '../core/Component';
export default class TotalBoard extends Component {
  render() {
    this.$target.innerHTML = this.template();
  }

  async setup() {
    const { data }: { data: SummaryType } = this.$props;
    const result = data.Countries.reduce(
      (total, current) => (total += current.TotalConfirmed),
      0,
    ).toString();
    this.setState({ total: result });
  }

  template() {
    const { total } = this.$state;
    return total;
  }
}
