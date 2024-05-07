export default async function contertHTML(body: any) {

    function calDateTime(inputString: string) {
        return inputString.substring(0, 16)
    }

    const style = `
    <style> 
        body {
            width: 100%;
            height: 100%;
        }
        h1 {
            color: red;
        }
        
        .content {
            width: 700px;
            height: fit-content;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
            padding-bottom: 40px;
            position: relative;
        }
        
        .textGreen {
            color: #00B034;
            font-size: 18px;
        }
        
        .lable {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 100px;
            margin-top: 20px;
        }

        .leftCode {
            display: flex;
            flex-direction: row;
            margin-left: 20px;
            margin-top: 10px;
        }

        .lableDesc {
            margin-left: 10px;
        }

        .heart{
            color: #d6d4d4;
        }

        .rightCode {
            padding-right: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
        
        .statusBar {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 500px;
            height: 100px;
            /* border: 1px solid #000; */
        }
        
        .imgtext {
            position: relative;
        }
        
        .text {
            position: absolute;
            top: 64px;
            right: -25px;
        
            width: 90px;
        }
        
        .redLine {
            width: 80px;
            height: 3px;
            background-color: red;
            position: absolute;
            left: 65px;
            top: 30px;
        }

        .signature {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 15px;
            width: 100%;
            text-decoration: underline;
            color: #00f;
            margin-bottom: 20px;
            
        }
        
        .detailsLine {
            display: flex;
            flex-direction: row;
            width: 100%;
        }
        
        .leftDetail {
            width: 50%;
            display: flex;
            padding-left: 170px;
            flex-direction: row;
            position: relative;
        }
        
        .checkMark {
            width: 18px;
            height: 18px;
            color: #2e9a7b;
            background-color: #fff;
            z-index: 3;
            position: absolute;
            left: 145px;
        }
        
        .greenLine {
            border-left: 2px dashed #2e9a7b;
            height: 100%;
            position: absolute;
            top: 5px;
            left: 152.5px;
        }
        
        .rightDetail {
            width: 100%;
            padding-bottom: 15px;
            padding-right: 30px;
        }

        .signatureBox {
            border: 1px solid #000;
            background-color: #fff;
            position: absolute;
            z-index: 2;
            top: 310px;
            right: 50px;
        }

        .kanit-extralight {
            font-family: "Kanit", sans-serif;
            font-weight: 300;
            font-style: normal;
            color: #606266
        }

        .kanit-bold {
            font-family: "Kanit", sans-serif;
            font-weight: 400;
            font-style: bold;
            color: #606266
        }

        .black-light{
            font-weight: 400;
        }

        .black {
            color: #3B3C4E;
            font-weight: 500;
        }

    </style>`

    const googleFont = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">`

    const pre = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="initial-scale=1.0"><title>Document</title>${style}${googleFont}</head><body>`
    const end = `</body></html>`

    const inPro64 =
        "data:image/png;base64,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"
    const inTran64 =
        "data:image/png;base64,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"
    const inDel64 =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAOVBMVEVHcEz+NDD+NDD+NDD+NDD+NDD+NDD+NDD+NDD+NDD/////sK7/6ur+hIH+ZmP/mZf/0tH/vbz+SkfrL5mTAAAACnRSTlMA3cX/GF+lfjfukDGmrwAACKVJREFUeNrtXduW2yoMNb5gbHP//49tJmemTWJhJJAvyRl1rT60Uzc70pa2BIam+bX/g/VqGEcpWyGmqbvZNAnRSjmOg+rfBsIo2/uHT9nUyvHicNQgRYc0IQd1TU8McuqINsnhYp5Ro+gKTYzqA1BcCEtfi+IHy7kxpmTHZvI8twyiYzUxnBNTU8du0/ERtgeM/6B8BIyDoXBz4ySuqLbb3dr9M1gvu0NM7sz6YeoOsl3j6yh37O2U49zxnb+GD3DHfk5RojvBBHv6GrqTjDm8ZHeaSU56tN2J1vbvTQ9+oqipO9km9dY0Z6Y8J45oXPDeL84ej2Tkg2HD/Ne0i8R/PV4FR3yAcYdijkTCh8Pq+dWW45Aw+mMG7DAkjPwIEJDZHsN4xnwFOmSezSG5i7MOOhiId46GpaQy9pz1HI6su9HS8ETWXT2rvvJcQDpBRcKrd9NAAlkLn5awNoD4Aq1CS8LcQpEn+9JTV88t3MGspUtFfX8SQb4EChhYxS3jSQT5Ms2gUMg0UdSv2wD2Ev8LR13/Z7i6SKsgNpWRsrFly4EI/sAyyAqhq0shNbhogRXTJXvOuERXkU4xB9aCBdKFRVfWdFrmGuuzUSq7voB2dXlwZC2FW5G1ZIqJqQOSKYvEGa/ZAGIy7ouVpUlylpAtisTt+YPuak0xDt03+gydGQf5aiCSzyEEiqzGQUu3o0uoYtGiKfL0k/praBrrgbRcDtmkiE27znZMprjUO5YiUW+XwiWwuoTskG7DIWELcFxFqON0CXmdcIsibqs/dOv+kTFx9Vxjt1ce2Jx6Wcp507P0hQ4ntLIK3pUrL0hx0QcO6dDScRuuXQmdQiATzwQo5RIfM0XTrOpqqRYeeCYndgHseeoWEILSl2vhtp7qNeFnVj9U/B/0+4+ANmqmWU0i2Ros4vDdLD5pwWTzgVv1NVwDFVpVtxva5Dn5alwbbCvarL48suycsyX3k6+fW1um2KLkrDjnLWZU5WvbFf4CIev7tjhneQQQmxpmQaXmqyK5aIxbgtb0ktIXVkM7o4H4dbaywM6H6L2u6FeGQuHrMEDgGHRP/1wvP2FU1wXLQp2FiSwPFnXgT31wzhhdNZeYCpMvxiEOdIjNN8jQsJXQXu1DEZcqHkbjch6dJOwUiVAxfOCw8ZxAZJE+CViK2M3SYZ1Hz/bQKoVURTQCyAIlhVV5iNYFrzlWSfsCrmPK+l3cRly8xGhvlbBywUEVCC2DpYijfM2Vc/qxgOsLAoeGQtBkiXer7/dfdP0oCxQjhiIBytIx+/WUK/kf3bgHRRYSgU3dWtxET1oGWw5puwNM5YpJT05aDkkRQ6txtnIxTpEFClYxrsqmNzELpDy2BnL21UiKQICDzQApj61xFyBpz+nUjrlYudA7ksuIRyrfpCKDQyxW7iGQ5DJiUYG1nRSAEIuVK710ILm09VOWt+vN6qWLWLmJoC3Zn+VC0haLVvsOBFI6yhaFCyMcHbGHItZfEEg2L3iIeoWxNVGl1lpbpMMsm+AcAMScA8RiygpmWGJrd6PVAYlznVlAi8YzgBjCh9abyz2mdjtaHRCHx+GhsYkBnhQqOFKctSwxiuLLOCtCDfQZQFAzrucE5eDxVajc6ihKlg+fgstryDZ22HjwI/vKXbRin3cTbjGUHEo7cJ6o57rYancC8kIfB2Y6l8jjthjILscg+MQo10EVI9ZudpT77RUwCfp6iAumZnWkrNUtiC0NiwGbLEjFL5AN+3rEgBNXnU7jBbE1FO5lJHEEHl64dO9SsEdb7bYxyMKtICwObfWrPn2zT2f1WEdiluorgaCp25sn5DTewPU7bamOFqY61A3oQJEqLW59xNX0HAiqJ56vF7RbJG7FiqkLfHySwz0/WEr2zaatGhwhT/VNCR0iPmll01YNEJeluqU8YTtp5YS8Z2nLHz+ypfT9PusUgdz5ECuQxBzVNfHb2OJ6XqSAb+OCtvVeAqBBoqanvpRAYRYpSzJpAVRHz8UMiuu8tT259q/Xu4TKuJaq68y9lUkoWfv69VpfXI9SFGFV8iYRFC9UN6GiIKUowiqAzeqkDeO+7J/0MMYFXZXIE1WEdwBRpcxyG1y2FCP3Hn+9E5CkS8bKN95qh49kW/LJFzVutA5jfjccqdhqie+PmPl0s4jIyuYtez6ORHnvae9YhQsAcZjIytVEfQEgS64aYvTWVYFM1DdDrxBaAUH1LN3tRT3Sk9+edpdMv7LgfXbwJdBDLWar+m7ng+1tLdeZD2ebOuzItnMcknWJ+YnWFe3+xnHFQsS3pf4iEhyS691DSoi6un0LT8Mik3i2RaYsjEtSO0Zs+SsswNQrws+2FIdkXGLhKmvrlpZfB7MaXsyKFIfkztcCtpN20VUu9q/craF9XCt9kjt2ckCXd+9uFDRPB7LVHDX1OM0O913OT5uJLEL2EnreymkzfvyiX17f9fjUi+K7LRoPkFe0t6f6eaYj5LwpGwbigkvjXY06BFSUIanFkV6IWR8/gDo5M6eCddEaRsWYElhHRJ7xPdL/txA7FrMh9doAObAQ4jG+zOH0wnaG2cvDPfhk/LHY+WMnbwXEaz1r7YNjRPGNxRrnFmcSGzkoR65f4vIUzHrIGYcwcxnxqojL9ljEc+OZT/LnM0G/k2C6Io6p4E4rdUEkZfdADW+esC6MpPgOqPGtE+9lkVzk/qdzcVwISfX9x8Ob8/zzbt/7nPsQP+eGys+5M/RzbnH9oHt1P+em48+5e7r5mNvAm8+5n/1Qp4ih2dWOcsqu7vhOXwdUx1Y1R9gg3juqHruUHakyjc2RtheUg2HsBUUcD+POFWbat0NzlinGZCxVc6b1o+CJqb453VQtFjGq5iJWgeVCKL5jbJDkNDbJoW+uaGqQaM8IOajmytarUbabvplaOaq+eQ/r1TCOUrZCTNMN1e03IVopx3F4Gwi/9mu/dlH7AzUvTREpyadEAAAAAElFTkSuQmCC"
    const success64 =
        "data:image/png;base64,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"
    const barCode64 =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAqBAMAAADxKEDRAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURe8lJUdwTO8kJO8nJ+8lJe8lJeoqKu8kJO8lJcFhiTgAAAAIdFJOU2AA4COgwQyFG0hhnQAAAKZJREFUOMtjcAEBZ0EswAQsxdABAg3YFHCApaihoNXY2NgMm4JkoEQESIEgHkCkAjGgFcLGhkAzEwWNjVG4EAUCQEcKdSgCXcUoqNGEwqWKAhd3fApKXBiATsWjQFBwVMEQVCDuUgjMSoYgBcLAjAbioioAgUQgBCoQA0JIvkBXAAJABYiMQ5wCaJLD4QZgkqNDsicm61GcuwkVILQvxHAWpGKQghQA0gsCEuRFPD4AAAAASUVORK5CYII="

    const objBody = JSON.parse(body)
    // const objBody = body

    const barcode = objBody[0].barcode
    const firstLocation = objBody[0].location
    const lastStatusDetail = objBody[objBody.length - 1].status_detail
    const receiverName = objBody[objBody.length - 1].receiver_name
    const lastDeliveryDescription =
        objBody[objBody.length - 1].delivery_description
    const signatureUrl = objBody[objBody.length - 1].signature

    const lableCode = `<div class="lable">
                <div class="leftCode">
                    <svg class="heart" 
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        fill="currentColor" 
                        viewBox="0 0 24 24">
                            <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
                    </svg>
                    <div class="lableDesc">
                        <div class="black-light">${barcode}</div>
                        <div class="black">${firstLocation}</div>
                    </div>
                    <img
                        src="${barCode64}"
                        width="20"
                        height="16"
                    />
                </div>
                <div class="rightCode">
                    <div class="textGreen">${lastStatusDetail}</div>
                    <div>ชื่อผู้รับ: ${receiverName}</div>
                    <div>สถานะ: ${lastDeliveryDescription}</div>
                </div>
            </div>`

    const statusBar = `<div class="statusBar">
                <div class="imgtext">
                    <img
                        class="statusIcon"
                        src="${inPro64}"
                        width="64"
                        height="64"
                    />
                    <span class="text">รับเข้าระบบ</span>
                    <div class="redLine"></div>
                </div>

                <div class="imgtext">
                    <img
                        class="statusIcon"
                        src="${inTran64}"
                        width="64"
                        height="64"
                    />
                    <span class="text">ระหว่างขนส่ง</span>
                    <div class="redLine"></div>
                </div>
                <div class="imgtext">
                    <img
                        class="statusIcon"
                        src="${inDel64}"
                        width="64"
                        height="64"
                    />
                    <span class="text">ออกไปนำจ่าย</span>
                    <div class="redLine"></div>
                </div>

                <div class="imgtext">
                    <img
                        class="statusIcon"
                        src="${success64}"
                        width="64"
                        height="64"
                    />
                    <span class="text">นำจ่ายสำเร็จ</span>
                </div>
            </div>`

    let detailsDiv = ""
    for (let i = objBody.length - 1; i > -1; i--) {
        detailsDiv += `<div class="detailsLine">
                    <div class="leftDetail">
                        <svg
                            class="checkMark"
                            data-v-609009d6=""
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="check-circle"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="svg-inline--fa fa-check-circle"
                        >
                            <path
                                data-v-609009d6=""
                                fill="currentColor"
                                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                            ></path>
                        </svg>
                        <div class="dateTime kanit-bold">${calDateTime(objBody[i].status_date)} น.</div>
                        ${i === 0 ? "" : '<div class="greenLine"></div>'}
                    </div>
                    <div class="rightDetail">
                        ${objBody[i].status_detail}
                    </div>
                </div>`
    }

    const signatureBox = `<div class="signatureBox">
                <img src="${signatureUrl}" 
                    alt="signature"
                    width="150"
                    height="150" />
            </div>`

    const content = `<div class="content kanit-extralight" id="content">
                ${lableCode}
                ${statusBar}
                <div class="signature">
                    <a>ลายเซ็น</a>
                    <a>ติดต่อเจ้าหน้าที่</a>
                </div>
                ${detailsDiv}
                ${signatureBox}
            </div>`

    let all = pre + content + end

    return all
}
