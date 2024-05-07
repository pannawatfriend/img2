import type { NextApiRequest, NextApiResponse } from 'next'
import contertHTML from "../../libs/convertHTML"

export default async function handler(req: NextApiRequest, res: NextApiResponse
) {
    if (req.method === 'POST') {
        const body = await req.body
        const objBody = JSON.parse(JSON.stringify(body))

        res.setHeader('Content-Type', 'text/html');
        const all = await contertHTML(JSON.stringify(objBody))
        res.status(200).send(all)


    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
