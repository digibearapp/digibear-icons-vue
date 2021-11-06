import external from 'rollup-plugin-peer-deps-external';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import vue from 'rollup-plugin-vue';

const packageJson = require('./package.json');

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true
            }
        ],
        plugins: [
            external(),
            resolve(),
            typescript({ tsconfig: './tsconfig.json'}),
            vue(),
            commonjs(),
            terser()
        ]
    },
    {
        input: 'dist/esm/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: "esm" }],
        external: [/\.css$/],
        plugins: [dts()],
    },
]
