import { watch } from "chokidar";
import copyfiles from "copyfiles";
import ts from "typescript";
import fs from "fs";

const outputDirectory = "build/";
const compilerOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2015,
  module: ts.ModuleKind.CommonJS,
  rootDir: "./src",
  outDir: outputDirectory,
  removeComments: true,
  esModuleInterop: true,
  forceConsistentCasingInFileNames: true,
  strict: true,
  noImplicitAny: true,
  skipLibCheck: true,
};

const watchFiles = () => {
  watch(".").on("change", (filePath) => {
    handleFileChange(filePath, compilerOptions);
  });

  watch(".").on("unlink", (filePath) => {
    handleFileUnlink(filePath, outputDirectory);
  });
  watch(".").on("unlinkDir", (dirPath) => {
    handleFileUnlinkDir(dirPath, outputDirectory);
  })
};

const handleFileChange = (filePath: string, options: ts.CompilerOptions) => {
  if (!filePath.startsWith("src\\")) return;
  
  if (filePath.endsWith(".html") || filePath.endsWith(".css")) {
    copyFile(filePath, outputDirectory);
  }

  if (filePath.endsWith(".ts")) {
    transpileTypeScript(filePath, options);
  }
};

const handleFileUnlink = (filePath: string, outputDirectory: string) => {
  if (!filePath.startsWith("src\\")) return;

  let fileName = filePath.split("\\").slice(1).join("/");

  if (fileName.endsWith(".ts")) fileName = fileName.replace(".ts", ".js");

  const destinationDirectory = outputDirectory + fileName;

  console.log("File deleted:", destinationDirectory);
  fs.unlinkSync(destinationDirectory);
};

const handleFileUnlinkDir = (dirPath: string, outputDirectory: string) => {
  if (!dirPath.startsWith("src\\")) return;

  const currentDirectory = dirPath.split("\\").slice(1).join("/");
  const destinationDirectory = outputDirectory + currentDirectory;

  console.log("Directory deleted:", destinationDirectory);
  fs.rmdirSync(destinationDirectory);
};

const copyFile = (filePath: string, outputDirectory: string) => {
  const currentDirectory = filePath.split("\\")[1];
  const destinationDirectory = outputDirectory + currentDirectory;

  copyfiles([filePath, destinationDirectory], 2, () => {});
  console.log("Copy file:", destinationDirectory);
};

const transpileTypeScript = (filePath: string, options: ts.CompilerOptions) => {
  const fileName = filePath.split("\\").slice(1).join("/");
  const outputPath = fileName.replace(".ts", ".js");

  const source = fs.readFileSync(filePath, "utf-8");
  const result = ts.transpileModule(source, { compilerOptions });

  fs.writeFileSync(`${outputDirectory}${outputPath}`, result.outputText);
  console.log(`Transpile file: ${outputDirectory}${outputPath}`);
};

export default watchFiles;
