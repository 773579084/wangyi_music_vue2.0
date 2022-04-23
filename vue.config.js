'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// 设置网站的名称
const name = defaultSettings.title || 'VUE 2.0' // 项目标题

const port = process.env.port || process.env.npm_config_port || 8080 // 配置默认端口

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 代理跨域配置
    proxy: {
      // 代理的地址：真正的请求地址：当我们调用的接口是以/api开头的，说明这个接口走的就是我们的代理
      // 例如：http://localhost:8080/api/
      '/api': {
        target: 'http://localhost:3000/', // 跨域请求的地址；
        changeOrigin: true // 只有这个值位true的情况下，才表示开启跨域；
      }
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')// 配置scss@路径
      }
    }
  },
  chainWebpack(config) {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    config.plugins.delete('prefetch')
  }
}
