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

router.get('/api/maxfecha',async(req,res)=>{
    conn.query('select max(fecha) maxfecha from PCA.PRECIOS',[],(err,row,fields)=>{
        if(!err)
        res.send(row)
        else 
        console.log(err)
    })
})

router.post('/api/precios',async(req,res)=>{
    
    const {id_producto, fecha} =req.body    
    
     conn.query(`select JSON_ARRAYAGG(
                JSON_OBJECT("x",date_format(FECHA,'%m/%d/%Y'),"y",PRECIO )) SERIE  from PCA.PRECIOS  
                where ID_PRODUCTO=? and FECHA<=?`,[id_producto,fecha],(err,rows,fields)=>{
        
          if(!err){
              res.send(rows)
          } else {
              console.log(err)
          }
      })
})

router.get('/api/precios/:fecha',async(req,res)=>{
    const fecha = req.params.fecha
    conn.query(`select  p.FECHA,c2.descripcion CATEGORIA,c1.DESCRIPCION,p.PRECIO,c1.UNIDAD,p2.precio PRECIOANT,p2.FECHA FECHAANT,p.ID_PRODUCTO
                from PCA.PRECIOS p
                inner join PCA.CAT_PRODUCTOS c1 on (c1.id_producto=p.id_producto)
                inner join PCA.CAT_CATEGORIAS c2 on (c1.id_categoria=c2.id_categoria)
                LEFT OUTER JOIN PCA.PRECIOS p2 on (p2.id_producto=p.id_producto)
                where p.fecha=(select max(FECHA) from PRECIOS t where t.FECHA<=?)
                and p2.fecha=(select max(FECHA) from PRECIOS t where t.FECHA<p.FECHA)`,[fecha],(err,rows,fields)=>{
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