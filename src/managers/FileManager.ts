import {Class} from 'types/types';
import f from 'fs';
import p from 'path';

export default class FileManager {
    private projectAbsolutePath: string;

    constructor() {
        this.projectAbsolutePath = '';
    }

    public init(): void {
        this.projectAbsolutePath = this.findProjectRoot(__dirname);
    }

    public toProjectAbsolutePath(relativePath: string): string {
        /** If relativePath starts with / character then trimming it */
        return p.resolve(this.projectAbsolutePath, relativePath.startsWith('/') ? relativePath.slice(1) : relativePath);
    }

    public readFileContent(projectRelativePath: string): string {
        return f.readFileSync(this.toProjectAbsolutePath(projectRelativePath), 'utf8');
    }

    public listFiles(dirPath: string): string[] {
        return f.readdirSync(this.toProjectAbsolutePath(dirPath));
    }

    public readClassContent(classPath: string): string {
        const fullClassPath = this.toProjectAbsolutePath(classPath);

        if (!['.ts', '.js'].includes(p.extname(fullClassPath)) || !f.statSync(fullClassPath).isFile()) {
            throw new Error(`Invalid file extension!\nPath: ${fullClassPath}`);
        }

        return this.readFileContent(classPath);
    }

    public async createClassInstance<T>(classPath: string, classType: Class<T>): Promise<T> {
        classPath = this.toProjectAbsolutePath(classPath);
        const imported = await import(classPath);
        if (!imported.default || !(imported.default.prototype instanceof classType)) {
            throw new Error(`Class definition error!\nPath: ${classPath}`);
        }

        return new imported.default();
    }

    private findProjectRoot(directory: string): string {
        if (f.existsSync(p.join(directory, 'package.json'))) {
            return directory;
        }

        const parentDirectory = p.dirname(directory);
        if (parentDirectory === directory) {
            throw new Error('Project root with package.json not found');
        }

        return this.findProjectRoot(parentDirectory);
    }
}
