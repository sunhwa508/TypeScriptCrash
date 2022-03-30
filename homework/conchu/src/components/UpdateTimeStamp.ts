import Component from '../core/Component';

export default class UpdateTimeStamp extends Component {
  render() {
    this.$target.innerHTML = this.template();
  }

  async setup() {
    const { data } = this.$props;
    const result = new Date(data.Date).toLocaleString();
    this.setState({ total: result });
  }

  template() {
    const { total } = this.$state;
    return total;
  }
}
