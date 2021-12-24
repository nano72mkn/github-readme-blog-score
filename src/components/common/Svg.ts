import { SvgBase } from "./SvgBase";

export class SvgComponent {
  SvgBase: SvgBase = new SvgBase(100, 100);

  render(): string {
    return ''
  };
};

export class Svg {
  width: number = 100;
  height: number = 100;
  SvgBase: SvgBase;
  SvgComponents: SvgComponent[];

  constructor(
    width: number,
    height: number,
    SvgComponents: SvgComponent[],
  ) {
    this.SvgBase = new SvgBase(width, height);
    this.SvgComponents = SvgComponents;
    this.render = this.render.bind(this);
  }

  render() {
    const inner = this.SvgComponents.map((SvgComponent: SvgComponent) => {
      SvgComponent.SvgBase = this.SvgBase;
      return SvgComponent.render();
    }).join('');
    return this.SvgBase.render(inner);
  }
}
