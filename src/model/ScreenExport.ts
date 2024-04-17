export class ScreenExport {
    fileName: string;
    content: Uint8Array;

    constructor(fileName: string, content: Uint8Array) {
        this.fileName = fileName;
        this.content = content;
    }
}