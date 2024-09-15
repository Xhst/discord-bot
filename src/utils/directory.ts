import { readdirSync } from "fs";
import { join } from "path";

export function readDir(directory: string, recursive: boolean = true): string[] {
    function readDirRecursive(dir: string): string[] {
        let results: string[] = [];
        const list = readdirSync(dir, { withFileTypes: true });
        const extension = process.env.AMBIENT === 'development'? 'ts' : 'js'
    
        list.forEach(dirent => {
            const filePath = join(dir, dirent.name);
            if (dirent.isDirectory() && recursive) {
                // Recursively read subdirectory
                results = results.concat(readDirRecursive(filePath));
            } else if (filePath.endsWith(extension)) {
                results.push(filePath);
            }
        });
    
        return results;
    }

    return readDirRecursive(directory)
    
}