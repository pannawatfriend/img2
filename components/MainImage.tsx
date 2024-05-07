import Image from "next/image"
import jsonData from "../datas/out.json"
import styles from "./styles.module.css"

// import InProcessImg from "../public/images/inProcess.png";
// import InTransitImg from "../public/images/inTransit.png"
// import InTransitAltImg from "../public/images/inTransit-alt.png"
// import InDeliveryImg from "../public/images/inDelivery.png"
// import InDeliveryAltImg from "../public/images/inDelivery-alt.png"
// import SuccessImg from "../public/images/success.png"
// import SuccessAltImg from "../public/images/success-alt.png"

// import MinecrafterReg from "../../assets/fonts/nKKZ-Go6G5tXcraBGwCKd6xBDFs.woff2";
// interface ParcelStatus {
//     barcode: string
//     status: string
//     status_description: string
//     status_date: string
//     location: string
//     postcode: string
//     delivery_status: null | string
//     delivery_description: null | string
//     delivery_datetime: null | string
//     receiver_name: null | string
//     signature: null | string
//     status_detail: string
//     delivery_officer_name: null | string
//     delivery_officer_tel: null | string
//     office_name: null | string
//     office_tel: null | string
//     call_center_tel: string
// }

// interface ParcelStatusProps {
//     parcelStatuses: ParcelStatus[]
// }

export default function MainImage() {
    const datas = jsonData
    const reverseDatas = [...datas].reverse()

    const { barcode, location } = datas[0]
    const currentStatus = datas[datas.length - 1]
    const statusNumber: number = parseInt(currentStatus.status)
    const detail = currentStatus.status_detail

    const calStatus = () => {
        if (statusNumber <= 104) {
            return 1
        } else if (statusNumber <= 220) {
            return 2
        } else if (statusNumber <= 402) {
            return 3
        }
        return 4
    }
    const status = calStatus()
    // const status = 4

    function calDateTime(inputString: string) {
        // const date = new Date(inputString)
        // console.log(date)
        // const formattedDate = date.toLocaleDateString("th-TH", {
        //     day: "numeric",
        //     month: "numeric",
        //     year: "numeric",
        //     hour: "numeric",
        //     minute: "numeric",
        // })
        // return formattedDate

        return inputString.substring(0, 16)
    }

    const color = {
        color: "red",
    }

    return (
        <div
            style={{
                width: "700px",
                height: "100%",
                backgroundColor: "#fff",
                paddingBottom: "30px",
            }}
        >
            <div
                style={{
                    height: "100px",
                    width: "100%",
                    backgroundColor: "#c3cdde",
                    color: "blue",
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundImage: `url("../../../public/images/inProcess.png")`,
                }}
            >
                <div
                    style={{
                        fontSize: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "10px",
                        color: "#34D399",
                    }}
                >
                    <div style={{ color: "blue" }}>
                        <div>{barcode}</div>
                        <div>{location}</div>
                    </div>
                </div>
                <div className="max-w-[200px] ">
                    <div className="text-green-500 text-lg">{detail}</div>
                    <span className="text-xs">ชื่อผู้รับ:{detail}</span>
                </div>
            </div>
            <div
                style={{
                    height: "80px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                    }}
                >
                    <Image
                        src="../public/images/inProcess.png"
                        alt="process"
                        width={60}
                        height={60}
                        priority={true}
                    />
                    <span
                        style={{
                            position: "absolute",
                            width: "90px",
                            top: "60px",
                        }}
                    >
                        รับเข้าระบบ
                    </span>
                </div>
                <div
                    style={{
                        width: "60px",
                        height: "3px",
                        backgroundColor: status >= 2 ? "#EF4444" : "#CBD5E0",
                    }}
                    className={`w-[60px] h-[3px] ${
                        status >= 2 ? "bg-red-500" : "bg-slate-200"
                    }`}
                ></div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                        position: "relative",
                    }}
                >
                    {status >= 2 ? (
                        <Image
                            src="../public/images/inProcess.png"
                            alt="process"
                            width={64}
                            height={64}
                        />
                    ) : (
                        <Image
                            src="../public/images/inProcess.png"
                            alt="process"
                            width={64}
                            height={64}
                        />
                    )}
                    <span
                        style={{
                            position: "absolute",
                            top: "60px",
                            width: "90px",
                        }}
                    >
                        ระหว่างขนส่ง
                    </span>
                </div>
                <div
                    style={{
                        width: "60px",
                        height: "3px",
                        backgroundColor: status >= 3 ? "#EF4444" : "#CBD5E0",
                    }}
                    className={`w-[60px] h-[3px] ${
                        status >= 3 ? "bg-red-500" : "bg-slate-200"
                    }`}
                ></div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                    }}
                >
                    {status >= 3 ? (
                        <Image
                            src="../public/images/inProcess.png"
                            alt="InDeliveryImg"
                            width={64}
                            height={64}
                        />
                    ) : (
                        <Image
                            src="../public/images/inProcess.png"
                            alt="InDeliveryAltImg"
                            width={64}
                            height={64}
                        />
                    )}
                    <span
                        style={{
                            position: "absolute",
                            width: "90px",
                            top: "60px",
                        }}
                    >
                        ออกไปนำจ่าย
                    </span>
                </div>
                <div
                    style={{
                        width: "60px",
                        height: "3px",
                        backgroundColor: status >= 4 ? "#EF4444" : "#CBD5E0",
                    }}
                    className={`w-[60px] h-[3px] ${
                        status >= 4 ? "bg-red-500" : "bg-slate-200"
                    }`}
                ></div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                    }}
                >
                    {status >= 4 ? (
                        <Image
                            src="../public/images/inProcess.png"
                            alt="SuccessImg"
                            width={64}
                            height={64}
                        />
                    ) : (
                        <Image
                            src="../public/images/inProcess.png"
                            alt="SuccessAltImg"
                            width={64}
                            height={64}
                        />
                    )}
                    <span
                        style={{
                            position: "absolute",
                            width: "90px",
                            top: "60px",
                        }}
                    >
                        นำจ่ายสำเร็จ
                    </span>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <span>ลายเซ็น</span>
                <span>ติดต่อเจ้าหน้าที่</span>
                <div
                    style={{
                        backgroundImage: `url("../public/images/inProcess.png")`,
                        width: "60px",
                        height: "60px",
                    }}
                ></div>
            </div>

            <div style={{ marginTop: "30px" }}>
                {reverseDatas.map((data, index) => (
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                        }}
                        key={index}
                    >
                        <div
                            style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "center",
                                gap: "10%",
                                position: "relative",
                            }}
                        >
                            {index === reverseDatas.length - 1 ? null : (
                                <div
                                    style={{
                                        borderLeft: "dashed",
                                        borderLeftWidth: "2px",
                                        height: "100%",
                                        borderColor: "#2e9a7b",
                                        position: "absolute",
                                        left: "68px",
                                        top: "2px",
                                    }}
                                ></div>
                            )}
                            {/* <div className="dashedLine h-full border-green-600 absolute left-[67px]"></div> */}
                            <svg
                                style={{
                                    width: "18px",
                                    position: "absolute",
                                    left: "60px",
                                    top: "2px",
                                    color: "#2e9a7b",
                                    backgroundColor: "#fff",
                                }}
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
                                    className=""
                                ></path>
                            </svg>
                            {/* <div>{calDateTime(data.status_date)} น.</div> */}
                        </div>
                        {/* <div className="bg-red-200 w-full">{data.status_date}</div> */}
                        <div
                            style={{
                                width: "100%",
                                paddingBottom: "22px",
                                marginRight: "40px",
                            }}
                        >
                            {/* {data.status_detail} */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
