/**
 * Created by scott on 2019-03-14
 */
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/',
    productionSourceMap: false,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_api', resolve('src/api'))
            .set('_assets', resolve('src/assets'))
            .set('_components', resolve('src/components'))
            .set('_views', resolve('src/views'))
            .set('_common', resolve('src/common'))
        config.module.rule('pug')
            .test(/\.pug$/)
            .use('pug-html-loader')
            .loader('pug-html-loader')
            .end()
    },
    lintOnSave: true,
    devServer: {
      open: false, //配置自动启动浏览器
      host: '0.0.0.0',
      port: 8080,
      https: false,
      proxy: {
        // '/dsdpy': {
          '/api': {
              target: 'http://192.168.0.122:8000/',
          // target: 'http://192.168.0.104:3000',
          // target: 'http://web.base.tenv.dsdiot.com/',
          // target: 'http://192.168.0.126:8000',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    },
    css: {
        loaderOptions: {
            stylus: {
                'resolve url': true,
                'import': [
                    './src/style/theme',
                    './src/style/mixin',
                    './src/style/_var',
                ]
            }
        }
    },
    pluginOptions: {
        'cube-ui': {
            postCompile: true,
            theme: false
        }
    }
}
