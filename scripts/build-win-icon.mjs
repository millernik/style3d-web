import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const sourcePath = path.join(projectRoot, "electron", "assets", "app-icon.png");
const targetPath = path.join(projectRoot, "electron", "assets", "app-icon.ico");

function assertPngSignature(buffer) {
  const pngSignature = "89504e470d0a1a0a";
  if (buffer.subarray(0, 8).toString("hex") !== pngSignature) {
    throw new Error(`Expected PNG input at ${sourcePath}`);
  }
}

function readPngDimensions(buffer) {
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function toIcoDimension(value) {
  return value >= 256 ? 0 : value;
}

function buildSingleIconIco(pngBuffer) {
  assertPngSignature(pngBuffer);
  const { width, height } = readPngDimensions(pngBuffer);

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(toIcoDimension(width), 0);
  entry.writeUInt8(toIcoDimension(height), 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);

  return Buffer.concat([header, entry, pngBuffer]);
}

const resizedPngPath = path.join(os.tmpdir(), "style3d-app-icon-256.png");

execFileSync("sips", ["-z", "256", "256", sourcePath, "--out", resizedPngPath], {
  stdio: "pipe",
});

const pngBuffer = fs.readFileSync(resizedPngPath);
const icoBuffer = buildSingleIconIco(pngBuffer);

fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, icoBuffer);

console.log(`Windows icon written to ${targetPath}`);
