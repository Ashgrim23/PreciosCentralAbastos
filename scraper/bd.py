import  mysql.connector
import credenciales
from datetime import date


insertDataRow= ("INSERT INTO PCA.PRECIOS"
                "(FECHA,CATEGORIA,DESCRIPCION,PRECIO,UNIDAD)"
                "VALUES (%s,%s,%s,%s,%s)")


def insertaPrecios(row):    
    print('insertando: '+str(row[0][0]))    
    cnx=mysql.connector.connect(**credenciales.config)
    cursor = cnx.cursor()    
    cursor.executemany(insertDataRow, row)
    cnx.commit()
    cursor.close()
    cnx.close()
