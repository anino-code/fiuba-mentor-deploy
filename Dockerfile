# -----------------------------------------------------------
# ETAPA 1: Definición del Sistema Operativo (Base Image)
# -----------------------------------------------------------
# Usamos Alpine Linux con Node 18. Alpine es una versión minimalista
# de Linux (pesa solo unos 5MB), ideal para producción por seguridad y rapidez.
FROM node:18-alpine

# Definimos el directorio de trabajo dentro del contenedor.
# Es como hacer un 'cd /app' virtual.
WORKDIR /app

# -----------------------------------------------------------
# ETAPA 2: Gestión de Dependencias (Caché)
# -----------------------------------------------------------
# Estrategia Robusta: Copiamos SOLO los archivos de definición de paquetes primero.
# ¿Por qué? Docker guarda en caché cada línea. Si no cambias tus dependencias,
# Docker se salta el 'npm install' en el futuro y construye super rápido.
COPY backend/package*.json ./backend/

# Nos movemos a la carpeta del backend para instalar
WORKDIR /app/backend
RUN npm install

# -----------------------------------------------------------
# ETAPA 3: Código Fuente
# -----------------------------------------------------------
# Volvemos a la raíz del contenedor
WORKDIR /app

# Ahora sí, copiamos el código real.
# Copiamos explícitamente las carpetas para evitar traer archivos basura.
COPY backend ./backend
COPY Frontend ./Frontend

# -----------------------------------------------------------
# ETAPA 4: Configuración de Ejecución
# -----------------------------------------------------------
# Documentamos que el contenedor usará el puerto 3000 (buena práctica)
EXPOSE 3000

# Definimos el directorio final de ejecución
WORKDIR /app/backend

# Comando de arranque. Usamos el array JSON ["npm", "start"]
# para que el proceso reciba correctamente las señales del sistema (como apagado).
CMD ["npm", "start"]