// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Card } from '../../components/Card';
import { Svg, Text } from '../../components/common';
import { ZennIcon } from '../../components/Icon/ZennIcon';

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

  const width = 200;
  const height = 250;

  const svg = new Svg(
    width,
    height,
    [
      new Card(),
      new ZennIcon({ x: 0, y: height - 50, height: 20 }),
      new Text({ x: 30, y: 40, fontWeight: 'bold', text: user.username }),
      new Text({ x: 30, y: 60, fontWeight: 'bold', text: user.articles_count.toString() }),
      new Text({ x: 30, y: 80, fontWeight: 'bold', text: user.total_liked_count.toString() }),
    ]
  ).render();

  res.statusCode = 200;
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader(
    "Cache-Control",
    "public, max-age=31536000"
  );
  return res.send(svg);
}

export default getZennScore;
