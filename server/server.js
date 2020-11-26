const express=require('express')
const cors = require('cors')
const bodyParser=require('body-parser')
const router=express.Router();
const conn=require('./db')
const dotenv =require('dotenv');
const moment=require('moment')

dotenv.config()

const app=express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

router.post('/api/precios',async(req,res)=>{
    const {filtro,fecha,producto} =req.body
    
    var fchIni
    switch(filtro) {
        case '6D':
            fchIni=moment(fecha).subtract(6,'days')
            break;
        case '1M':
            fchIni=moment(fecha).subtract(1,'months')
            break;
        case '6M':
            fchIni=moment(fecha).subtract(6,'months')
            break;
        case 'TODO':
            fchIni=moment('2013-12-31')
            break;
    }
    
     conn.query(`select JSON_ARRAYAGG(JSON_OBJECT("x",date_format(FECHA,'%m/%d/%Y'),"y",PRECIO )) SERIE  from PCA.PRECIOS  
                  where DESCRIPCION=? and FECHA>=? and FECHA<=?               
                  ORDER BY FECHA DESC`,[producto,moment(fchIni).format("YYYY-MM-DD"),moment(fecha).format("YYYY-MM-DD")],(err,rows,fields)=>{
          if(!err){
              res.send(rows)
          } else {
              console.log(err)
          }
      })
})

router.get('/api/precios/:fecha',async(req,res)=>{
    const fecha = req.params.fecha
    conn.query(`select s.FECHA,s.CATEGORIA,s.DESCRIPCION,s.PRECIO,s.UNIDAD, s2.precio PRECIOANT,s2.fecha FECHAANT 
                from PCA.PRECIOS s
                LEFT OUTER JOIN PCA.PRECIOS s2 on (s.CATEGORIA=s2.CATEGORIA and s.DESCRIPCION=s2.DESCRIPCION)
                where s.fecha=(select max(FECHA) from PRECIOS t where t.FECHA<=?)
                and s2.fecha=(select max(FECHA) from PRECIOS t where t.FECHA<s.FECHA)`,[fecha],(err,rows,fields)=>{
        if(!err){
            res.json({
                exito:true,
                rows:rows
            })            
        } else {
            console.log(err)
            res.json({
                exito:false,
                mensaje:err.message
            })
        }
    })
})

app.use(router)

app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log(err)
    } else {
        console.log(`puerto ${process.env.PORT}`)
    }
})