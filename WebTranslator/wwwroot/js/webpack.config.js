//const path = require("path");
//const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

//module.exports = {
//    mode: "development",
//    entry: "./src/main.jsx", // входная точка - исходный файл

//    output:{
//        path: path.resolve(__dirname, "./dist"),     // путь к каталогу выходных файлов - папка public
//        publicPath: "js/dist/",
//        filename: "bundle.js"       // название создаваемого файла
//    },
//    devServer: {
//        historyApiFallback: true,
//        static: {
//            directory: path.join(__dirname, "/"),
//        },
//        port: 8081,
//        open: true
//    },
//    module:{
//        rules:[   //загрузчик для jsx
//            {
//                test: /\.jsx?$/, // определяем тип файлов
//                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
//                loader: "babel-loader",   // определяем загрузчик
//                options:{
//                    presets:[ "@babel/preset-react"]    // используемые плагины
//                }
//            },
//            {
//                test: /\.css$/, // Добавляем обработку CSS файлов
//                use: ["style-loader", "css-loader"], // Используем лоадеры для стилей
//            },
//        ]
//    },
//    plugins: [
//        new NodePolyfillPlugin()
//    ],
//    resolve: {
//        fallback: {
//            "path": require.resolve("path-browserify"),
//            "fs": false,
//            "process": require.resolve("process/browser")
//        }
//    }


//}


//const path = require("path");

//module.exports = {
//    mode: "development",
//    entry: "./src/main.jsx", // Входная точка - исходный файл
//    output: {
//        path: path.resolve(__dirname, "./dist"),     // Путь к каталогу выходных файлов
//        publicPath: "/dist/",
//        filename: "bundle.js"       // Название создаваемого файла
//    },
//    devServer: {
//        historyApiFallback: true,
//        static: {
//            directory: path.join(__dirname, "/"),
//        },
//        port: 8081,
//        open: true
//    },
//    module: {
//        rules: [   // Загрузчики
//            {
//                test: /\.jsx?$/, // Определяем тип файлов
//                exclude: /(node_modules)/,  // Исключаем из обработки папку node_modules
//                loader: "babel-loader",   // Используем загрузчик
//                options: {
//                    presets: ["@babel/preset-react"]    // Используемые пресеты
//                }
//            },
//            {
//                test: /\.css$/, // Обрабатываем CSS-файлы
//                use: ["style-loader", "css-loader"], // Загрузчики для CSS
//            }
//        ]
//    },
//    resolve: {
//        extensions: [".js", ".jsx"], // Расширения, которые Webpack будет обрабатывать
//    }
//};


const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/main.jsx", // Входная точка - исходный файл
    output: {
        path: path.resolve(__dirname, "./dist"),     // Путь к каталогу выходных файлов
        publicPath: "/dist/",
        filename: "bundle.js"       // Название создаваемого файла
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "/"),
        },
        port: 8081,
        open: true
    },
    module: {
        rules: [   // Загрузчики
            {
                test: /\.jsx?$/, // Определяем тип файлов
                exclude: /(node_modules)/,  // Исключаем из обработки папку node_modules
                loader: "babel-loader",   // Используем загрузчик
                options: {
                    presets: ["@babel/preset-react"]    // Используемые пресеты
                }
            },
            {
                test: /\.css$/, // Обрабатываем CSS-файлы
                use: ["style-loader", "css-loader"], // Загрузчики для CSS
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"], // Расширения, которые Webpack будет обрабатывать
        alias: {
            path: "path-browserify" // Заменяем модуль path на path-browserify
        },
        fallback: {
            process: require.resolve("process/browser"), // Добавляем поддержку process
        }
    }
};
