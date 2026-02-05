
FROM node:18-alpine


WORKDIR /app


COPY backend/package*.json ./backend/


WORKDIR /app/backend
RUN npm install


WORKDIR /app


COPY backend ./backend
COPY Frontend ./Frontend


EXPOSE 3000


WORKDIR /app/backend


CMD ["npm", "start"]