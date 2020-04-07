//这个文件用来存放自定义的开发配置
module.exports = {
          devServer: {
                  //配置请求代理
                  proxy: {
                          '/':{
                                  target: 'http://localhost:3000'
                          }
                  }
          }
};