module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 解决路径问题，设置一个路径，可以解决文件路径问题
        // 使用./ ../ 的兼容性很差，一旦改变文件路径就会出现bug
        // 通过对当前文件进行一个绑定，让导入导出的时候定位到那个文件当中，进行搜索，大大提高了效率
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}