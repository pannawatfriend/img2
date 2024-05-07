import { NextApiRequest, NextApiResponse } from "next"
import convertHTML from "../../libs/convertHTML"
import { saveAs } from "file-saver"
import { toBlob } from "html-to-image"
import parse5 from "parse5"
import * as puppeteer from "puppeteer"

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

        try {
            const htmlRes = await fetch("http://localhost:3000/api/display", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
            if (!htmlRes.ok) {
                res.status(500).send(body)
                throw new Error("Failed to fetch data")
            }
            const html = await htmlRes.text()

            const test = `<div>test</div>`

            const imageBuffer = await renderHTMLToImage(html)

            // // res.status(200).send(`data:image/png;base64,${toBase64}`)
            res.setHeader("Content-Type", "image/png")
            res.status(200).send(imageBuffer)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    } else {
        // Handle other HTTP methods if needed
        res.status(405).end() // Method Not Allowed
    }
}
