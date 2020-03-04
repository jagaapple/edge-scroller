import { boundMethod } from "autobind-decorator";

type Options = {
  /**
   * An offset value to begin scrolling.
   * @default 50
   */
  offset: number;
  /**
   * A coefficient of scroll speed.
   * @default 0.5
   */
  scrollSpeedCoefficient: number;
};
type ScrollDirection = "LEFT_TOP" | "RIGH_TOP" | "RIGHT_BOTTOM" | "LEFT_BOTTOM" | "TOP" | "RIGHT" | "BOTTOM" | "LEFT";

export class EdgeScroller<T extends HTMLElement> {
  // ---------------------------------------------------------------------------------------------------------------------------
  // Variables
  // ---------------------------------------------------------------------------------------------------------------------------
  // Private Variables
  private targetElement: T;
  private targetElementBoundingRect: DOMRect;
  private options: Options;
  private isInTargetElement = false;
  private isInArea = false;
  private currentPointerXY: [number, number] = [0, 0];

  // ---------------------------------------------------------------------------------------------------------------------------
  // Functions
  // ---------------------------------------------------------------------------------------------------------------------------
  // Public Functions
  // ---------------------------------------------------------------------------------------------------------------------------
  constructor(element: T, options: Partial<Options> = {}) {
    this.targetElement = element;
    this.targetElementBoundingRect = this.targetElement.getBoundingClientRect();
    this.options = {
      offset: options.offset ?? 50,
      scrollSpeedCoefficient: options.scrollSpeedCoefficient ?? 0.5,
    };
  }

  enable() {
    this.targetElement.addEventListener("mousemove", this.onMouseMove);
    this.targetElement.addEventListener("mouseover", this.onMouseOver);
    this.targetElement.addEventListener("mouseout", this.onMouseOut);
  }

  disable() {
    this.targetElement.removeEventListener("mousemove", this.onMouseMove);
    this.targetElement.removeEventListener("mouseover", this.onMouseOver);
    this.targetElement.removeEventListener("mouseout", this.onMouseOut);
  }

  // Private Functions
  // ---------------------------------------------------------------------------------------------------------------------------
  @boundMethod
  private onMouseMove(event: MouseEvent) {
    const rect = this.targetElementBoundingRect;
    const x = Math.max(event.clientX - rect.left, 0);
    const y = Math.max(event.clientY - rect.top, 0);
    this.currentPointerXY = [x, y];

    const offset = this.options.offset;
    const isInAreaX = x <= offset || x >= rect.width - offset;
    const isInAreaY = y <= offset || y >= rect.height - offset;
    this.isInArea = isInAreaX || isInAreaY;
  }

  @boundMethod
  private onMouseOver() {
    this.targetElementBoundingRect = this.targetElement.getBoundingClientRect();
    this.isInTargetElement = true;

    this.scroll();
  }

  private scroll() {
    window.requestAnimationFrame(() => {
      if (!this.isInTargetElement) return;
      if (this.isInArea) {
        const offset = this.options.offset;
        const rect = this.targetElementBoundingRect;
        const [x, y] = this.currentPointerXY;

        let scrollAmountX = 0;
        let scrollAmountY = 0;
        const type = this.getType(offset, rect, x, y);
        if (type === "TOP" || type === "LEFT_TOP" || type === "RIGH_TOP") scrollAmountY = -(offset - y);
        if (type === "RIGHT" || type === "RIGH_TOP" || type === "RIGHT_BOTTOM") scrollAmountX = x - (rect.width - offset);
        if (type === "BOTTOM" || type === "RIGHT_BOTTOM" || type === "LEFT_BOTTOM") scrollAmountY = y - (rect.height - offset);
        if (type === "LEFT" || type === "LEFT_TOP" || type === "LEFT_BOTTOM") scrollAmountX = -(offset - x);

        const coefficient = this.options.scrollSpeedCoefficient;
        this.targetElement.scrollBy(scrollAmountX * coefficient, scrollAmountY * coefficient);
      }

      this.scroll();
    });
  }

  private getType(offset: number, rect: DOMRect, x: number, y: number): ScrollDirection | undefined {
    const isInTop = y <= offset;
    const isInRight = x >= rect.width - offset;
    const isInBottom = y >= rect.height - offset;
    const isInLeft = x <= offset;

    if (isInLeft && isInTop) return "LEFT_TOP";
    if (isInRight && isInTop) return "RIGH_TOP";
    if (isInRight && isInBottom) return "RIGHT_BOTTOM";
    if (isInLeft && isInBottom) return "LEFT_BOTTOM";

    if (isInTop) return "TOP";
    if (isInRight) return "RIGHT";
    if (isInBottom) return "BOTTOM";
    if (isInLeft) return "LEFT";

    return undefined;
  }

  @boundMethod
  private onMouseOut() {
    this.isInTargetElement = false;
    this.isInArea = false;
    this.currentPointerXY = [0, 0];
  }
}
