const path = require("path");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/main.jsx", // входная точка - исходный файл
   
    output:{
        path: path.resolve(__dirname, "./dist"),     // путь к каталогу выходных файлов - папка public
        publicPath: "js/dist/",
        filename: "bundle.js"       // название создаваемого файла
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "/"),
        },
        port: 8081,
        open: true
    },
    module:{
        rules:[   //загрузчик для jsx
            {
                test: /\.jsx?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:[ "@babel/preset-react"]    // используемые плагины
                }
            },
            {
                test: /\.css$/, // Добавляем обработку CSS файлов
                use: ["style-loader", "css-loader"], // Используем лоадеры для стилей
            },
        ]
    },
    plugins: [
        new NodePolyfillPlugin()
    ],
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "fs": false,
            "process": require.resolve("process/browser")
        }
    }
    
   
}


