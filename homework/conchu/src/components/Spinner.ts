const Spinner = ($target: HTMLOListElement, id: string, isAppend: boolean) => {
  const template = () => {
    const html = document.createRange().createContextualFragment(`
      <div id=${id} class="spinner-wrapper flex justify-center align-center">
            <div class="ripple-spinner">
              <div></div>
              <div></div>
            </div>
         </div>`);
    return html;
  };
  const render = () => {
    isAppend
      ? $target.appendChild(template())
      : $target.appendChild(template());
  };

  render();
};
export default Spinner;
