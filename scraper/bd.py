import  mysql.connector
import credenciales
from datetime import date


insertDataRow= ("INSERT INTO PCA.PRECIOS"
                "(FECHA,ID_PRODUCTO,PRECIO)"
                "VALUES (%s,%s,%s)")

insertQueryCatego=("INSERT INTO PCA.CAT_CATEGORIAS (DESCRIPCION)"
                   "VALUES (%s) " )

insertQueryProduct=("INSERT INTO PCA.CAT_PRODUCTOS (DESCRIPCION,UNIDAD,ID_CATEGORIA) VALUES (%s,%s,%s) " )

queryCategorias="SELECT DESCRIPCION,ID_CATEGORIA FROM PCA.CAT_CATEGORIAS"

queryProductos="select CONCAT(descripcion,unidad) IAVE,ID_PRODUCTO FROM PCA.CAT_PRODUCTOS"

cnx=mysql.connector.connect(**credenciales.config)

def insertaProducto(row):
    cursor=cnx.cursor()
    cursor.execute(insertQueryProduct,row)
    cnx.commit()
    cursor.close()
    

def insertaCatego(catego):
    cursor = cnx.cursor()    
    cursor.execute(insertQueryCatego, (catego,) )
    cnx.commit()
    cursor.close()

def getCategorias():
    cursor=cnx.cursor()
    cursor.execute(queryCategorias)
    rows =cursor.fetchall()
    cursor.close()
    return dict(rows)

def getProductos():
    cursor=cnx.cursor()
    cursor.execute(queryProductos)
    rows = cursor.fetchall()
    cursor.close()
    return dict(rows)

def insertaPrecios(row):    
    cursor = cnx.cursor()    
    cursor.executemany(insertDataRow, row)
    cnx.commit()
    cursor.close()
    
