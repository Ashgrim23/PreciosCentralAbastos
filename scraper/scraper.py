import bd
from bs4 import BeautifulSoup as soupp
import requests
from datetime import date, datetime, timedelta



def extraeRows(fecha):
    global catCategos
    global catProds
    print('insertando: '+str(fecha))   
    url='https://www.ficeda.com.mx/app_precios/buscador-precios/created:{fecha}/type_id:2'.format(fecha=fecha)
    r=requests.get(url,allow_redirects=False)
    soup=soupp(r.text,"html.parser")
    sinres=soup.find('h2')
    if sinres.text.strip()=='Sin resultados':
        return 
    encabezado=soup.find('h3').text.strip()
    if len(encabezado)>30:
        return 
    fecha=encabezado.split(" ")[3]        
    categorias=soup.findAll('h2',{"class":"category_title"})      
    tablas=soup.findAll('table')
    
    newRowsArr=[]
    for x in range(len(categorias)):
        catego=categorias[x].text.strip()
        rows=tablas[x].findAll('tr')
        for x in range(1,len(rows)):
            cols=rows[x].findAll('td')
            descripcion=cols[0].text.strip()
            precio=cols[3].text.strip()[1:]
            unidad=cols[4].text.strip()
            if catego not in catCategos:
                bd.insertaCatego(catego)
                print("Nueva categoria: "+catego)
                catCategos=bd.getCategorias()
            if descripcion+unidad not in catProds:
                productRow=(descripcion,unidad,catCategos[catego] )
                bd.insertaProducto(productRow)
                print("Nuevo Producto: "+descripcion)
                catProds= bd.getProductos()
            
            newRow=(fecha,catProds[descripcion+unidad],precio)
            newRowsArr.append(newRow)    
    if len(newRowsArr)>0:       

        bd.insertaPrecios(newRowsArr)
    

def loadHistorico():
    #Carga Inicial
    
    fecha=date(2014,5,19)
    fechaFinal=datetime.today().date()        
    while fecha<=fechaFinal:
        extraeRows(fecha)        
        fecha=fecha+timedelta(days=1)


if __name__=='__main__':   
    
    catCategos=bd.getCategorias()
    catProds=bd.getProductos()
    #loadHistorico()
    extraeRows(datetime.today().date())
    
    