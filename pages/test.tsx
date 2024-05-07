// 'use server'
// import React from "react"

let strBody: string

async function getBody() {
    const res = await fetch("/api/test", {
        method: "POST",
        body: JSON.stringify({ test: "test" }),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const data = await res.json()
    console.log(data)
}

export default async function test() {
    let str 
    if (!str) {
        str = "hfjkdslahfjdkslahfjdkslahfjdksla"
    }

    const custom = {
        fontFamily: "CustomFont, sans-serif",
        "@font-face": {
            fontFamily: "CustomFont",
            src: `url("/fonts/nKKZ-Go6G5tXcraBGwCKd6xBDFs.woff2") format("woff2")`,
            fontWeight: "normal",
            fontStyle: "normal",
        },
    }

    const color = {
        color: "red",
    }

    return (
        <div style={color}>
            test najaaaaa
            <div>{str}</div>
            {/* <img src={require('/public/images/inDelivery.png')} alt="inDelivery" /> */}
            {/* <img
                src="https://th.bing.com/th/id/OIG3.5u5ZBGkvLQn1ELp4UqXH"
                alt="inDelivery"
            /> */}
        </div>
    )
}

export async function getServerSideProps(context: any) {
    if (context.req.method === "POST") {
        const body = await context.req
        console.log(body)
        const testb = JSON.stringify(context.req.method)
        // strBody = testb

        // You can return data to the page if needed
        return {
            props: {
                postData: 200,
            },
        }
    }

    // If it's not a POST request, return an empty object
    return {
        props: {},
    }
}
