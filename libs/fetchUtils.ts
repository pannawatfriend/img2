import inProcess from "../public/images/inProcess.png"
import inTransit from "../public/images/inTransit.png"
import inDelivery from "../public/images/inDelivery.png"
import success from "../public/images/success.png"
import barCode from "../public/images/barcode.png"

const getbaseUrl = async (name:String) => {
    switch (name) {
        case "inProcess":
            return inProcess
            break
        case "inTransit":
            return inTransit
            break
        case "inDelivery":
            return inDelivery
            break
        case "success":
            return success
            break
        case "inProcess":
            return inProcess
            break
        default:
            return barCode
            break

    }
}

export default getbaseUrl
