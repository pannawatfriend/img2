import { NextApiRequest, NextApiResponse } from "next"
import convertHTML from "../../libs/convertHTML"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const body = await req.body
        const nodeHtmlToImage = require('node-html-to-image');
            const all = await convertHTML(JSON.stringify(body))
            const image =  await nodeHtmlToImage({
                html: all,
            })
            res.setHeader("Content-Type", "image/png")
                res.status(200).send(image);
              
    } else {
        // Handle other HTTP methods if needed
        res.status(405).end() // Method Not Allowed
    }
}
