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

  const articlesCount = user.articles_count.toLocaleString();
  const booksCount = user.books_count.toLocaleString();
  const totalLikedCount = user.total_liked_count.toLocaleString();

  const svg = new Svg(
    width,
    height,
    [
      new Card(),
      new ZennIcon({ x: -5, y: height - 50, height: 20 }),
      new Text({ x: 30,  y: 45,  fontWeight: 'bold', text: user.username }),
      new Text({ x: 30,  y: 90,  fontWeight: 'bold', fontSize: 24, text: articlesCount }),
      new Text({ x: 40 + (articlesCount.length * 14), y: 90, fontSize: 14, text: "記事" }),
      new Text({ x: 30,  y: 125,  fontWeight: 'bold', fontSize: 24, text: booksCount }),
      new Text({ x: 40 + (booksCount.length * 14), y: 125,  fontSize: 14, text: "冊の本" }),
      new Text({ x: 30,  y: 160, fontWeight: 'bold', fontSize: 24, text: totalLikedCount }),
      new Text({ x: 40 + (totalLikedCount.length * 14), y: 160, fontSize: 14, text: "Liked" }),
    ]
  ).render();

  res.statusCode = 200;
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader(
    "Cache-Control",
    "no-cache"
  );
  return res.send(svg);
}

export default getZennScore;
