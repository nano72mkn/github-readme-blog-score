// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { SvgBase } from '../../src/common/svgBase';

const getZennScore = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const svgBase = new SvgBase();
  const svg = svgBase.render(`<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />`);

  res.statusCode = 200;
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader(
    "Cache-Control",
    "public, max-age=31536000"
  );
  return res.send(svg);
}

export default getZennScore;
