export default{
    apiUrl: process.env.VUE_APP_API_URL,
    ssoUrl: process.env.VUE_APP_SSO_URL + process.env.VUE_APP_BASE_URL,
    apiContact: process.env.VUE_APP_API_URL + 'account',
    apiSMSUrl: process.env.VUE_APP_API_SMS,
    authUrl: process.env.VUE_APP_API_LOGINPASS,
    baseUrl: process.env.VUE_APP_BASE_URL
}