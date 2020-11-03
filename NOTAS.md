# BACKEND TEST

nodejs DDD

## Installation
```bash
  docker-compose build
  docker-compose up -d
```
La aplicación estara corriendo en el puerto 3000

## Detalles a tener en cuenta

- test de integración para bbdd, funcionales para los controladores HHTP 
y unitarios para servicios.

- abstraer los values object de dominio a tipos primitivos.

- abstraer repositorio de mongo.

- hacer un boostraping correcto de la aplicación, utilizando un contenedor de inyección de dependencias.

- interface de eventos de dominios, etc. 