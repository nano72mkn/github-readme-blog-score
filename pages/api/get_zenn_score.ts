// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { SvgBase } from '../../src/common/svgBase';

type QueryType = {
  zennId?: string;
}

type ZennUserData = {
  username: string;
  avatar_small_url: string;
  avatar_url: string;
  total_liked_count: number;
  follower_count: number;
  following_count: number;
  articles_count: number;
  books_count: number;
  scraps_count: number;
}

const getZennScore = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { zennId }: QueryType = req.query

  if (!zennId) {
    res.status(404).end();
  };

  const data = await fetch(`https://zenn.dev/api/users/${zennId}`);
  const { status } = data;
  
  if (status !== 200) {
    res.status(status).end();
  }

  const { user }: { user: ZennUserData } = await data.json();

  const svgBase = new SvgBase();
  const svg = svgBase.render(`
    <text x="0" y="10" font-family="Verdana" font-size="10">${user.username}</text>
    <text x="0" y="25" font-family="Verdana" font-size="10">${user.articles_count}</text>
    <text x="0" y="35" font-family="Verdana" font-size="10">${user.total_liked_count}</text>
  `);

  res.statusCode = 200;
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader(
    "Cache-Control",
    "public, max-age=31536000"
  );
  return res.send(svg);
}

export default getZennScore;
