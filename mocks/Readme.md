
Para instalar json-server se debe ejecutar:

    npm install -g json-server
	
En el archivo application.properties reemplazar el valor de bcra.api.base-url por http://localhost:4000/
	
Para correr el mocker se debe ejecutar:
	
	json-server --watch -p 4000 mocks/db.json