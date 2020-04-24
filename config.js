module.exports = {
    baseURL: process.env.URL || "http://automationpractice.com/index.php",
    headless: process.env.HEADLESS== 'false' ? false : true
}