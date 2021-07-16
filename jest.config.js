/**
 * @author 雪糕
 * @description
 */

//ts-jest配置: https://kulshekhar.github.io/ts-jest/user/config/
//jest配置文档: https://jestjs.io/docs/zh-Hans/getting-started.html
//jest使用文档: https://jestjs.io/docs/zh-Hans/api#describename-fn
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    preset: 'ts-jest', // 配置基础预设值（ 指向npm模块， 该模块的根目录下有jest-preset.json 或 jest-preset.js 文件）
    rootDir: './', // 必须是包含jest.config.js 或package.json文件的根目录（代表根目录，下面<rootDir>/就是使用以当前的根目录来搜索）
    roots: [
        // 测试文件文件目录
        '<rootDir>/__tests__/'
    ],
    transform: {
        ...tsjPreset.transform
    },
    testRegex: '(/__tests__/.*\\.(test|spec))\\.[tj]sx?$', // 查找测试文件
    /**
     * 测试代码覆盖率
     * % stmts是语句覆盖率（statement coverage）：每个语句是否都执行了
     * % Branch分支覆盖率（branch coverage）：条件语句是否都执行了
     * % Funcs函数覆盖率（function coverage）：函数是否全都调用了
     * % Lines行覆盖率（line coverage）：未执行的代码行数
     */
    collectCoverage: true, // 是否搜集测试时的覆盖率信息
    collectCoverageFrom: [
        // 应收集覆盖率信息的一组文件
        '**/node_modules/**',
        '**/vendor/**'
    ],
    coveragePathIgnorePatterns: [
        // 排除哪些目录或文件跳过覆盖率信息
        'node_modules'
    ],
    coverageReporters: [
        // 控制台输出覆盖率报告，值为text或text-summary
        'text'
    ],
    coverageThreshold: {
        // 最小覆盖率指标
        // global: {
        //   // 默认全局覆盖率指标
        //   branches: 80,
        //   functions: 80,
        //   lines: 80,
        //   statements: 80,
        // },
    },
    extraGlobals: [
        // 加快查找全局属性（如： Math, window 这类全局属性）
        'Math'
    ],
    // setupFilesAfterEnv: ['./jest.setup.js'], // 新增全局初始化内容
    moduleFileExtensions: [
        // 查找扩展名
        'ts',
        'js',
        'json'
    ],
    moduleNameMapper: {
        // 模块映射，相当于webpack中的alias别名
        '^@test/(.*)$': '<rootDir>/src/$1',
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    modulePathIgnorePatterns: [
        // 防止意外忽略不同环境中可能具有不同根目录的所有文件
    ],
    testEnvironment: 'jest-environment-jsdom'
};
