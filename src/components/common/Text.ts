import { SvgComponent } from "../common/Svg";

type TextData = {
  x: number;
  y: number;
  fontSize?: number;
  fontWeight?: "normal" | "bold";
  text: string;
}

export class Text extends SvgComponent {
  data: TextData = {x: 0, y: 0, fontSize: 16, fontWeight: "normal", text: '-'};

  constructor(data: TextData) {
    super();

    this.data = data;
  }

  render() {
    return `
      <text
        x="${this.data.x}"
        y="${this.data.y}"
        font-family="Super Sans"
        font-size="${this.data.fontSize}"
        font-weight="${this.data.fontWeight}"
      >
        ${this.data.text}
      </text>
    `
  }
}
