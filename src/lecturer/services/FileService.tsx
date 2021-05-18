import { saveAs } from 'file-saver';

function formatDate(date: Date) {
    let stringDate = date
        .toLocaleString()
        .replaceAll(" ", "")
        .replaceAll(".", "-")
        .replaceAll(",", "_")
        .replaceAll(":", "-");
    return stringDate;
}

const exportToJsonFile = (object: Object, fileName: string = "object.lazare") => {
    var blob = new Blob([JSON.stringify(object, null, "\t")], { type: "text/plain;charset=utf-8" })
    saveAs(blob, `${fileName}_${formatDate(new Date())}.json`);
}

export { exportToJsonFile };