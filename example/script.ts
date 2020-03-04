import { EdgeScroller } from "edge-scroller";

window.document.addEventListener("DOMContentLoaded", () => {
  const button = window.document.getElementById("button");
  const box = window.document.getElementById("box");
  let isDisabled = false;

  const edgeScroller = new EdgeScroller(box);
  edgeScroller.enable();

  button.addEventListener("click", (event) => {
    isDisabled = !isDisabled;

    const element = event.currentTarget as HTMLButtonElement;
    element.innerHTML = isDisabled ? "Enable" : "Disable";

    if (isDisabled) edgeScroller.disable();
    else edgeScroller.enable();
  });
});
