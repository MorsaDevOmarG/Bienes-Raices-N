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
- Template Engine
  - Motores de plantilla, son tecnologías que nos permiten crear el código _HTML_ y mostrar información contenida en variables de una forma mpas compacta y clara.
  - _Pug, Handlebars, EJS_ son las opciones más polulares para **Node.js**.
  - También es posible utilizar _React, Angular, Svelte o Vue_ como tu Templa Engine; pero necesitarás crear una **API** con respuestas _JSON_.
  - ## Ventjas
    - La forma en que se crea el código _HTML_ tiene a ser más simple.
    - Puede utilizar e imprimir información del servidor o base de datos de una forma más sencilla.
    - La seguridad es más sencilla de implementar ya que la información es renderizada por el mismo servidor.
  - ## Desventajas
    - C_uando mostramos información con un template engine, esta información y sus interacciones no son muy dinámicas a comparación de _React o Vue_.
    - Consumen más recursos ya que el código _HTML_ es creado por el servidor a diferencia de: _Vue o React_ donde es creado por el cliente (navegador).
- PUG
  - **_npm i pug_**
- MVC
  - Son las iniciales de:
    - **Model View Controller**
    - Es un patrón de arquitectura de software que permite la separación de obligaciones de cada pieza de tu código.
    - Enfatiza la separación de la lógica de programación con la presentación.
  - ## Ventajas
    - MVC no mejora el perfomance del código, tampoco da seguridad, pero tu código mantendrá un mejor orden y será fácil de mantener.
    - En un grupo de trabajo, el tener el código ordenado permite que más de una persona pueda entender que es lo que hace cada parte de él.
    - Aprender _MVC_, hará que otras tecnologías como: _Laravel, Nests, Rails, Django, Net Core, Spring Boot_, te sean más sencillas de aprender.
  - Model
    - Model / Modelo
    - Encargado de todas las interacciones en la base de datos, obtener datos, actualizarlos y eliminar.
    - El modelo se encarga de consultar una base de datos, obtiene la información pero no la muestra, eso es trabajo de la vista.
    - El modelo tampoco se encarga de actualizar la información directamente, es el **Controlador** quien decide cuándo llamarlo.
  - View
    - View / Vista
    - Se ebcarga de todo lo que se ven en pantalla (HTML).
    - Node soporte múltiples _Template Engine_ como: **EJS, PUG, HANDLEBARS**.
    - Si utilizas _React, Vue, Angular, Svelte_, estos serían tu vista.
    - El modelo consulta la base de datos, pero es por medio del **Controlador** que se decide que _Vista_ hay que llamar y que datos presentar.
  - Controller  
    - Controller / Controlador
    - Es el que comunica el **Modelo y la Vista**, antes de que el _Modelo_ consulta la base de datos, el _Controlador_ es el encargado de llamar un _Modelo_ en específico.
    - Una vez consultado el _Modelo_, el **Controlador** recibe esa información, manda a llamar la vista y le pasa la información.
    - El **Controlador** es el que manda llamar la vista y modelos que se requieren en cada parte de tu aplicación.
  - Router
    - Es el encargado de registrar todas las _URL'S_ o _Endpoints_ que se va a soportar nuestra aplicación.
    - Ejemplo: Si el Usuario accede a: **/clientes**, el routes ya tiene registrada esa ruta y un controlador con una función que sabe que que _Modelo_ debe llamar y que _Vista_ mostrar cuando el suuario visia esa _URL_.
- TailwindCSS
  - **_npm i -D tailwindcss_**
  - **NOTA**: para este proyecto **INSTALA VERSIÓN 3**
  - También debemos instalar lo siguiente:
  - Autoprefixer
    - **_npm i -D autoprefixer_**
  - Postcss
    - **_npm i -D postcss_**
  - Potscss-CLI
    - **_npm i -D postcss-cli_**
  - Después de instalar **TAILWINDCSS**, debemos ejecutar:
    - **_npx tailwindcss init -p_**
    - Debemos configurar el archivo:
      - **taildincss.config**: 
        - _content: ['./views/**/*.pug', './public/**/*.js'],_
    - En: **package.json**, debemos crear una línea nueva en: _scripts_
      - **_"css" : "postcss public/css/tailwind.css -o public/css/app.css"_**
      - Esto va compilar el código _css / taildindcss_ en un archivo nuevo: _app.css_
    - Después ejecutamos:
      - **_npm run css_**
      - **NOTA**: cada vez que agregamos una clase nueva, debemos ejecutar el comando...!!!
      - Para que no suceda eso, agregamos: **--watch**
        - **_"css" : "postcss public/css/tailwind.css -o public/css/app.css --watch"_**
      - Si marca error, debemos renombrar 2 archivos:
        - **tailwindcss.config.js** -> **_tailwindcss.config.cjs_**
        - **postcss.config.js** -> **_postcss.config.cjs_**
    - Debemos instalar 2 extensiones en _VSC_:
      - **pug** - amandeepmittal
      - **tailwindcss** - tailwindcss labs
- ORM
  - Object Relational Mapper
  - Es una técnica que se utiliza donde los datos de una base de datos son tratados como **OBJETOS**, utilizando un paradigma de programación _Orientada a Objetos_.
  - _Node.js_ tiene una gran cantidad de: **ORM'S** que se instalan como librería.
  - En _MVC_, es donde un **ORM** se relaciona bastante con el: **MODELO**.
  - ## Ventajas
    - Comenzar a crear aplicaciones que utilicen base de datos, sin necesidad de escribir código _SQL_ y tampoco saber sobre modelado de base de datos.
    - Velocidad en desarrollo ya que tienen una gran cantidad de métodos para: **crear, listar, actualizar o eliminar** datos.
    - La mayoría cuentan con todas las medidas de seguridad.
    - Ejemplo:
      - **SQL** : INSERT INTO 'categorias' ('nombre') VALUES ('Casa');
      - **ORM**: Categoria.create({nombre: 'Casa'});
    - Ejemplos de **ORM'S**:
      - _Prima, Mongoose, TypeORM, Bookshelf.js, Sequelize_ 
      - Este último usaremos en este proyecto.
    -

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
  - Creamos el archivo principal:
    - **_index.js_**
  - Dentro del: **package**, agregamos un _script_ para mandar a llamarlo, ejemplo:
    - ````
        "scripts": {
          "start": "node index.js"
        },
    ```
    - Para mandarlos a llamar, ejecutamos:
      - **_npm run start_**
  - Instalamos **NODEMON** como dependencia de desarrollo para que reinicie el servidor cada vez que tenemos cambios: en archivos **.JS**
    - **_npm i -D nodemon_**
  - Para hacer uso de: _nodemon_
    -  ````
        "scripts": {
          "start": "node index.js"
          "server": "nodemon index.js"
        },
    ```
  - Si creamos o tenemos _EXPRESS_ con la versión antigua: **COMMON**, en el _package.json_ en: **type**, aparecerá: _COMMON_, pero si vamos a usar la nueva sintaxis debemos cambiarlo por: 
    - **"type": "module"**
  - **NOTA**
    - Si subimos el proyecto a _GIT HUB_ y se clona en otra computadora, recordemos no trae el: _NODE MODULES_, para ello solo ejecutamos: **npm install**, como recomendación tendríamos que ejecutarlo con la versión en la que se uso el proyecto, este proyecto usa: **_NODE V.22.18.0_**

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

##### ROUTING

- Es por donde van a transitar los usuarios de nuestro sitio web o aplicación.
- Con diferentes rutas, nuestros usuarios podrán navegar a lo largo de diferentes secciones del sitio web o llenar diferente formularios.
- _HTTP_
- **GET**
  - Utilizado para mostrar información
- **POST**
  - Utilizado para enviar información
- **PUT/PATCH**
  - Utilizado para actualizar información
- **DELETE**
  - Utilizado para eliminar información

## TEMPLATE ENGINE

- 