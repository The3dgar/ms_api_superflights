# API gateway & Microservices

- El proyecto se divide en 2 tipos elementos
  - api gateways
  - microservicios
- se debe configurar servicio de colas de [rabbitMq ](https://www.cloudamqp.com/)

# .env file
  APP_URL=http://localhost:3000

  <!-- # RABBIT -->
  AMQP_URL=AMQP_URL

  <!-- # DB -->
  MONGO_URI=mongodb://localhost:27017/superflights

  <!-- jwt keys  -->
  JWT_SECRET=JWT_SECRET

  <!-- weather api -->
  WEATHER_API=https://www.metaweather.com/api/location

    
<br>
<br>

This examples are part from the [Node Js: Microservicios con NestJs, AWS, Docker Profesional](https://www.udemy.com/course/node-js-microservicios-ac/)