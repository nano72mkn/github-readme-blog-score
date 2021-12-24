import { SvgComponent } from "./common/Svg";

export class Card extends SvgComponent {
  constructor() {
    super();
  }

  render() {
    const margin = 10;
    const width = this.SvgBase.width - (margin * 2);
    const height = this.SvgBase.height - (margin * 2);
    return `
      <filter
        id="card_shadow"
        x="5"
        y="5"
        width="${this.SvgBase.width}"
        height="${this.SvgBase.height}"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
          <feDropShadow in="SourceGraphic" flood-color="#000000" stdDeviation="3" dx="2" dy="2" flood-opacity="0.2"/>
      </filter>
      <rect
        filter="url(#card_shadow)"
        x="${margin}"
        y="${margin}"
        rx="10"
        width="${width}"
        height="${height}"
        fill="white"
      />
    `
  }
}
