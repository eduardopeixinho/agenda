# Usa Node.js como base
FROM node:18

VOLUME /app
# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto para o contêiner
COPY ../package.json ../package-lock.json ../.gitignore ../ README.md ./
COPY ../public ./public
COPY ../src ./src

# Instala as dependências
RUN npm install

# Expõe a porta padrão do React
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
