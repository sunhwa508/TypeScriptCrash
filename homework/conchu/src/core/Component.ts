export default class Component {
  $target;
  $props;
  $state?: any;
  constructor($target: any, $props: any) {
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
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  setEvent() {
    //
  }
  setup() {
    //
  }
  setState(newState: any) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
