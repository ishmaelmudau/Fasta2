import fs from "fs";

export function stdin() {
  return fs.readFileSync(0, "utf-8");
}

export function strings(): string[] {
  return stdin().split("\n");
}

// Not using file