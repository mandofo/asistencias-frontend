# Utiliza una imagen base de Node para compilar el frontend
FROM node:18 AS build

# Directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto React
COPY package*.json ./
RUN npm cache clean --force
RUN npm install
COPY . .

RUN npm install bootstrap
RUN npm install react-router-dom
RUN npm install axios
RUN npm install react-bootstrap bootstrap


# Compila la aplicación para producción
RUN npm run build

# Utiliza un servidor nginx liviano para servir los archivos estáticos
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
