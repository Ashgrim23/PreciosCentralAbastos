const mysql=require('mysql')
const dotenv =require('dotenv')

dotenv.config()

const conn=mysql.createPool({
    host:process.env.PCA_HOST,
    user:process.env.PCA_USER,
    password:process.env.PCA_PASSWORD,
    database:process.env.PCA_DB
})

module.exports=conn;
