var configData = {
  LOGIN_ERROR_TRY_COUNT: 5,
  //登陆失败后多长时间间隔重新发起登陆请求
  LOGIN_ERROR_TRY_TIMEOUT: 1000,
  UPLOAD_TEMP_URL: "applet/file/upload_temp.jhtml"
}
module.exports = {
  config: configData
}