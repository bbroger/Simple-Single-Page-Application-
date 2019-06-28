class FileRequest {
    constructor() {
        throw new Error("This class can't be instanced, please use the static method")
    }
    static fetchFile(path, callback) {
        const request = new XMLHttpRequest;
        request.onload = () => {
            callback(request.responseText);
        }
        request.open('GET', path);
        request.send(null);
    }
}

