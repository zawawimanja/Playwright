import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.join(__dirname, '..');

const approvalMethods = new Set();
const usedMethods = new Set();

try {
    const approvalTs = fs.readFileSync(path.join(rootDir, 'pages', 'approval.ts'), 'utf8');

    const methodRegex = /(?:async\s+)?(?:get\s+)?(\w+)\s*\([^)]*\)\s*{|get\s+(\w+)\s*\(\s*\)\s*{/g;
    let match;

    while ((match = methodRegex.exec(approvalTs)) !== null) {
        const methodName = match[1] || match[2];
        approvalMethods.add(methodName);
    }

    function scanDir(dir: string) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                scanDir(fullPath);
            } else if (file.endsWith('.spec.ts')) {
                const content = fs.readFileSync(fullPath, 'utf8');
                for (const method of approvalMethods) {
                    if (content.includes(`approvalPage.${method}`) ||
                        content.includes(`approval.${method}`)) {
                        usedMethods.add(method);
                    }
                }
            }
        }
    }

    console.log('Scanning for method usage...');
    scanDir(path.join(rootDir, 'e2e'));

    console.log('\nUnused methods in ApprovalPage:');
    let unusedCount = 0;
    for (const method of approvalMethods) {
        if (!usedMethods.has(method)) {
            console.log(`- ${method}`);
            unusedCount++;
        }
    }
    console.log(`\nFound ${unusedCount} unused methods`);

} catch (error) {
    console.error('Error:', error);
}