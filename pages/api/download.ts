import { NextApiRequest, NextApiResponse } from "next"
import * as puppeteer from "puppeteer"
import contertHTML from "../../libs/convertHTML"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    async function renderHTMLToImage(html: string): Promise<Buffer> {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.setContent(html, { waitUntil: "networkidle0" }) // Wait for content to load

        const dimensions = { width: 370, height: 400 } // Adjust dimensions as needed
        await page.setViewport({
            width: dimensions.width * 2,
            height: dimensions.height * 2,
        })
        const buffer = await page.screenshot({ type: "png", ...dimensions })

        await browser.close()

        return buffer
    }

    if (req.method === "POST") {
        const body = await req.body
        // const htmlRes = await fetch("/api/dataslot/api/display", {
        //     method: "POST",
        //     body: body,
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // })

            const all = await contertHTML(JSON.stringify(body))
            const html =  all

            const test = `<div>test</div>`

            const imageBuffer = await renderHTMLToImage(html)

            // // res.status(200).send(`data:image/png;base64,${toBase64}`)
            res.setHeader("Content-Type", "image/png")
            res.status(200).send(imageBuffer)
    } else {
        // Handle other HTTP methods if needed
        res.status(405).end() // Method Not Allowed
    }
}
