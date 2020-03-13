module.exports = {
          devServer: {
            proxy: {
                // proxy all requests starting with /api to jsonplaceholder
                '/api': {
                    target: 'http://192.168.0.171:80/folder_name/public/index.php', //代理接口
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': '' //代理的路径
                    }
                }
            }
        }

  

}