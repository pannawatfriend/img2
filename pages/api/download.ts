import { NextApiRequest, NextApiResponse } from "next"
import { saveAs } from 'file-saver';
import { toBlob } from 'html-to-image';

export default async function handler(req: NextApiRequest, res: NextApiResponse
) {
    if (req.method === 'POST') {
        const body = await req.body
        const objBody = JSON.parse(JSON.stringify(body))
        // const htmlRes = await fetch("/api/dataslot/api/display", {
        //     method: "POST",
        //     body: body,
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // })

        try {
            const htmlRes = await fetch("http://localhost:3000/api/display", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
                
            })
            if (!htmlRes.ok) {
                res.status(500).send(objBody)
                throw new Error("Failed to fetch data")
            }
            const html = await htmlRes.text()
            // // const htmlEle = document.createElement('html')
            // // htmlEle.innerHTML = html

            // const toBase64 = Buffer.from(html).toString('base64')
            // // const toBlobRes = await toBlob(html)
           
            // // res.status(200).send(`data:image/png;base64,${toBase64}`)
            // // res.setHeader('Content-Type', 'text/html');
            res.status(200).send(html)
        }
        catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
        
    } else {
        // Handle other HTTP methods if needed
        res.status(405).end(); // Method Not Allowed
    }
}
