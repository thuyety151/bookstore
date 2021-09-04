/* eslint-disable @typescript-eslint/no-var-requires */

export const {createProxyMiddleware}=require("http-proxy-middleware")
const cors = require('cors');

module.exports= function(app:any){
    app.use(cors())
    app.options('*',cors())
    app.use('/api2', createProxyMiddleware({ 
        target: 'https://api.trackingmore.com', 
        changeOrigin: true,
        pathRewrite: {
            [`^/api2`]: '',
        },
    })); 
}
