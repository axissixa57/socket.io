var path = require('path');
var webpack = require('webpack');
// Extract text from a bundle, or bundles, into a separate file.
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    // multi-main entry
    entry: [path.resolve(__dirname, './client/index.js'), path.resolve(__dirname, './client/index.css')],

    output: {
        path: __dirname,
        filename: 'dist/application.bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader', 
                    query: {
                        cacheDirectory: true, // the loader will use the default cache directory in node_modules/.cache/babel-loader or fallback to the default OS temporary file directory if no node_modules folder could be found in any root directory.
                        plugins: [
                            'babel-plugin-transform-class-properties', // This plugin transforms es2015 static class properties as well as properties declared with the es2016 property initializer syntax
                            'babel-plugin-syntax-dynamic-import',
                            'babel-plugin-transform-object-rest-spread' // This plugin allows Babel to transform rest properties for object destructuring assignment and spread properties for object literals.
                        ]
                    }
                }]
            },
            {
                test: /\.(css|scss)/,
                use: ExtractTextPlugin.extract({ // It moves all the required *.css modules in entry chunks into a separate CSS file. So your styles are no longer inlined into the JS bundle, but in a separate CSS file (styles.css). If your total stylesheet volume is big, it will be faster because the CSS bundle is loaded in parallel to the JS bundle.
                    fallback: 'style-loader',
                    use: [
                        'css-loader'
                    ]
                })
            }
        ]
    },

    plugins: [
        // Все css файлы будует помещены в отдельный файл, настройки произведены в секции rules (ExtractTextPlugin.extract)
        new ExtractTextPlugin('dist/style.bundle.css'),
    ],

    stats: {
        colors: true
    },

    // This option controls if and how source maps are generated
    devtool: 'source-map' //  A full SourceMap is emitted as a separate file. It adds a reference comment to the bundle so development tools know where to find it. 
};
