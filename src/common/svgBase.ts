export class SvgBase {
  width: number;
  height: number;

  constructor(
    width = 100,
    height = 100
  ) {
    this.width = width;
    this.height = height;
  }

  render(body: string) {
    return `
      <svg
        width="${this.width}"
        height="${this.height}"
        viewBox="0 0 ${this.width} ${this.height}"
        xmlns="http://www.w3.org/2000/svg"
      >
      ${body}
      </svg>`
  }
}
