const path = require("path");

module.exports = Object.freeze({
    STORIES_PATH: path.join(__dirname, "../src/stories/DbIcon.stories.tsx"),
    TYPES_PATH: path.join(__dirname, "../types"),
    DIST_PATH: path.join(__dirname, "../dist"),
    DIST_CJS_PATH: path.join(__dirname, "../dist/cjs"),
    DIST_ESM_PATH: path.join(__dirname, "../dist/esm"),
});