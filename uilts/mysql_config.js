const mysqlConfig = {
    //本地数据库服务
    user: "root",
    password: "root",
    database: "bos",
    host: "localhost",
    port: 3306,

    //公司服务器数据库
    // user: "root",
    // password: "root",
    // database: "insect_predict",
    // host: "42.192.155.37",
    // port: 3306,

    // //服务器数据库   个人服务器的数据库
    // host: '121.199.46.223',
    // user: 'blonger', // 用户名
    // password: 'root', // 密码
    // database: 'blonger', // 数据库名
    // port: 3306,// 端口号
    timezone: '08:00'
};

module.exports = mysqlConfig;