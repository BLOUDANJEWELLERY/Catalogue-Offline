import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/lib/sanity.client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const items = await client.fetch(`
    *[_type == "catalogueItem"] | order(modelNumber desc){
      _id,
      modelNumber,
      image,
      sizes,
      weightAdult,
      weightKids
    }
  `);

  res.status(200).json(items);
}