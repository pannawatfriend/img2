import { saveAs } from 'file-saver';
import { toBlob } from 'html-to-image';
const convertHTML = async (strHTML:string) => {
    console.log("============================================================================")

    const cutString = (str: string) => {
        return str.substring(15, str.length - 7)
    }
    const htmlEle = document.createElement('html')
    htmlEle.innerHTML = cutString(strHTML)

    
    return htmlEle
    
}

export default convertHTML