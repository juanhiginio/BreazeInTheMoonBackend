# Dockerfile
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Compilar el proyecto
RUN npm run build

# Exponer puerto (ajústalo si cambias el puerto)
EXPOSE 3000

# Variable de entorno para identificar el entorno de Docker
ENV NODE_ENV=docker

# Ejecutar la app
CMD ["npm", "run", "start:prod"]
