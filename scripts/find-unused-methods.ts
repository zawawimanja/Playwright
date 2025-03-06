const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const approvalMethods = new Set();
const usedMethods = new Set();

try {
    const approvalTs = fs.readFileSync(path.join(rootDir, 'pages', 'approval.ts'), 'utf8');

    const methodRegex = /(?:async\s+)?(?:get\s+)?(\w+)\s*\([^)]*\)\s*{|get\s+(\w+)\s*\(\s*\)\s*{/g;
    let match: RegExpExecArray | null;

    while ((match = methodRegex.exec(approvalTs)) !== null) {
        const methodName = match[1] || match[2];
        if (methodName) approvalMethods.add(methodName);
    }

    function scanDir(dir: string): void {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                scanDir(fullPath);
            } else if (file.endsWith('.spec.ts')) {
                const content = fs.readFileSync(fullPath, 'utf8');
                for (const method of approvalMethods) {
                    const patterns = [
                        `approvalPage.${method}`,
                        `approval.${method}`,
                        `const { ${method} }`,
                        `this.${method}`
                    ];
                    if (patterns.some(pattern => content.includes(pattern))) {
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
    process.exit(1);
}