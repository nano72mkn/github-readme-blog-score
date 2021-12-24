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
          <feColorMatrix
            in="SourceGraphic"
            result="ChangeAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .2 0"
          />
          <feGaussianBlur in="ChangeAlpha" stdDeviation="2" result="GaussianBlur"/>
          <feMerge>
            <feMergeNode in="offsetBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
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
