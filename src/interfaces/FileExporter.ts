import { WriteStream } from "fs"

interface FileExporter {
    exportFile(): Promise<void | WriteStream>
}

export default FileExporter