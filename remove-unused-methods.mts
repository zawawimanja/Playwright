import { Project, SyntaxKind } from 'ts-morph';
import fs from 'fs';

const project = new Project();
project.addSourceFilesAtPaths('src/**/*.ts'); // Adjust the path as needed

const files = project.getSourceFiles();

files.forEach((file) => {
  let modified = false;
  const classes = file.getClasses();

  classes.forEach((cls) => {
    const methods = cls.getMethods();

    methods.forEach((method) => {
      const methodName = method.getName();

      // Search for method usage across all files
      const isUsed = files.some((f) => {
        return f
          .getDescendantsOfKind(SyntaxKind.CallExpression)
          .some((call) => {
            const expression = call.getExpression();
            return expression.getText().endsWith(`.${methodName}`);
          });
      });

      if (!isUsed) {
        console.log(
          `Removing unused method: ${methodName} from ${file.getFilePath()}`,
        );
        method.remove();
        modified = true;
      }
    });
  });

  if (modified) {
    fs.writeFileSync(file.getFilePath(), file.getFullText(), 'utf-8');
  }
});

console.log('Unused method removal complete!');
