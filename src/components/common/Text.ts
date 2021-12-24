import { SvgComponent } from "../common/Svg";

type TextData = {
  x: number;
  y: number;
  fontSize?: number;
  fontWeight?: "normal" | "bold";
  textAnchor?: "start" | "middle" | "end";
  text: string;
}

export class Text extends SvgComponent {
  data: TextData;

  constructor(data: TextData) {
    super();

    this.data = {
      fontSize: 16,
      fontWeight: "normal",
      textAnchor: "start",
      ...data,
    };
  }

  render() {
    return `
      <text
        x="${this.data.x}"
        y="${this.data.y}"
        font-family="Super Sans"
        font-size="${this.data.fontSize}"
        font-weight="${this.data.fontWeight}"
        text-anchor="${this.data.textAnchor}"
      >
        ${this.data.text}
      </text>
    `
  }
}
