import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const STORIES_PATH = path.join(
  __dirname,
  "../src/stories/DbIcon.stories.tsx"
);
export const TYPES_PATH = path.join(__dirname, "../types");
export const DIST_PATH = path.join(__dirname, "../dist");
export const DIST_CJS_PATH = path.join(__dirname, "../dist/cjs");
export const DIST_ESM_PATH = path.join(__dirname, "../dist/esm");
