# Página de proyecto ATI UANL

proyecto de página web, base de construcción Webpack, barbaJS y plugin offline-webpack

construir modulos node:
````
npm install
````

generar carpeta docs
````
npm run build
````

El modulo de barbaJS se implementa para poder recargar solo una parte de la página simulando un 'frame'.
El wrapper del modulo carga la página principal y las vistas 'galeria' y 'proyectos'.

Dentro de la página principal se carga el menu de navegación, con adecuaciones de estilo en resoluciones de 590px y 890px. (pantalla móvil y pantalla tablet).

La carpeta assets carga las imagenes y con el modulo offline-webpack se carga todo en el cache del navegador. De hecho el propio plugin es el que construye el Service Worker cargado en la carpeta DOCS.
Es indispensable por la generación del SW que la página se cargue en un servidor HTTPS o para pruebas en localhost (en particular en webpack-dev-server).