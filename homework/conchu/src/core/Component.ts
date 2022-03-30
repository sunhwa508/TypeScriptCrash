import {
  CountriesObjectType,
  PickCountriesDetailType,
  SummaryType,
} from 'Covid';

export default class Component {
  $target;
  $props;
  $state: {
    data?: any;
    total?: string;
  };
  constructor($target: any, $props: any) {
    this.$state = { data: [], total: '' };
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.render();
  }
  mounted() {
    //
  }
  template() {
    //
  }
  setEvent() {
    //
  }
  setup() {
    //
  }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  setState<T>(newState: T) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
