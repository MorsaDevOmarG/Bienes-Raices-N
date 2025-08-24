# Bienes-Raices

## Herramientas y/o Tecnologías

- Node.js
  - Entorno de ejecución de JavaScript orientado a eventos Asíncronos.
  - Utiliza un enfoque de eventos asíncronos, lo que significa que puede realizar múltiples tareas asincrónas tales como: ller y escribir en el servidor, conectarse a una base de datos o enviar Request de Formularios.
  - ### Ventajas
    - Código JavaScript (ES6+)
    - NPM con una gran cantidad de paquetes
    - APPS monolíticas, micro servicios y API'S
- Express.js
  - Framework para NODE.JS, muy minimalista y con una serie de opciones que son comunes para crear sitios web y aplicaciones móviles.
  - Su principal ventaja es que puedes instalar los paquetes que veas necesarios en tu aplicación y no tiene un gran cantidad de herramientas ya incluidas.
  - ### ¿Qué incluye?
    - Routing y Redireccionamiento
    - Soport a los diferentes métdos https
    - Middleware
    - Manejo de errores
    - Soporte de template engines
    - En caso de necesitar algo extra, se puede instalar con NPM

### Creando proyecto

- En consola ejecutamos:
  - **_npm init_**
  - Esto nos crea el:
    - **package.json**
  - Otra opción si no queremos poner algo en las preguntas y que lo cree, ingresamos:
    - **_npm init -y_**
  - **package name**
    - ENTER
  - **version**
    - ENTER
  - **description**
    - Ponemos una breve descripción del proyecto
  - **entry point**
    - ENTER
  - **test command**
    - ENTER
  - **git repository**
    - Ponemos el repositorio si tenemos alguno, cuando ya lo ligaste a _GIT_, por default lo pone
  - **keyword**
    - Ponemos las tecnologías con las que se trabajará el proyecto, MySQL, Sequelize
  - **author**
    - Puedes poner tu nombre
  - **license**
    - ENTER
  - **type**
    - ENTER
  - **Is this OK?**
    - ENTER / yes

#### Dependencias

- Instalando dependencias
  - **DEPENDENCIA PRODUCCION**
    - **_npm install nombreDependencia_**
  - Primero instalamos:
    - **_npm i express_**
  - Al instalar una dependencia, se generan nuevos archivos:
    - **node_modules**
    - **package-lock.json**
  - **Nota**
    - La carpeta: _node\_modules_ , no es necesario subirla a **GIT**, la podemos eliminar, simplemente si queremos que se cree, ejecutamos:
      - **_npm i_**
  - **DEPENDENCIAS DESARROLLO**
    - **_npm i --save-dev nombreDependencia_**
    - **_npm i -D nombreDependencia_**