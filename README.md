# DSSD-2024-Express

API REST para la aplicación de la asignatura Desarrollo de Software en Sistemas Distribuidos (cursada 2024).

Ecocycle es un proyecto gubernamental desarrollado a nivel municipal donde se agrupa diferentes eslabones integrados en la economía circular. Los materiales recolectados luego se comercializan y así logran formar parte de eslabones de producción de diferentes productos consumidos a nivel global.

La API permite el registro de usuarios y depósitos, realizar consultas sobre las órdenes y generar solicitudes de materiales. También se encarga de manejar la autenticación mediante JWT.

## Tecnologías utilizadas

* Node.js
* Express.js
* Sequelize
* JSON Web Token

# Uso

A continuación se detallarán los pasos para ejecutar la aplicación localmente.

## Pre-requisitos

La aplicación se ejecuta en Node.js, por lo que es necesario tener el entorno instalado. Puede descargarse en https://nodejs.org/en.

Es necesaria una base de datos PostgreSQL para ejercer las funciones de persistencia. Esta puede ser local o alojada en otro servidor.

Por último, la aplicación trabaja en conjunto con el gestor de procesos Bonita Open Solution, por lo que debe existir una instancia con la que pueda comunicarse, además de contar con los procesos necesarios.

## Instalación

La aplicación se instala con los siguientes pasos:
1. Clonar el repositorio:
    ```bash
    git clone https://github.com/joakospinelli/DSSD-2024-Express.git
    ```

2. Instalar las dependencias declaradas en `package.json`:
    ```bash
    npm install
    ```

3. Crear un archivo `.env` con las variables de entorno necesarias para la aplicación, a partir de la plantilla que se encuentra en el archivo `.env.template`

4. La aplicación tiene dos modos de ejecución distintos: uno para desarrolladores y otro para producción. Estos se inicializan con los comandos:

    ```bash
    npm run start:dev # para el modo de desarrollo
    npm run start:prod # para el modo productivo
    ```