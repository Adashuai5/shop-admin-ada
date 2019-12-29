module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/shop-admin-ada/' : '/',
  lintOnSave: false,
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        echarts: 'echarts',
        nprogress: 'NProgress',
        'vue-quill-editor': 'VueQuillEditor'
      })
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')
    })
    config.when(process.env.NODE_ENV === 'development', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main.js')
    })
  }
}
