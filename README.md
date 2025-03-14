# Agendas FrontEnd

Este projeto é um Frontend simples para testar integração com o agendas-api (https://github.com/eduardopeixinho/agendas-api.git), desenvolvido em **React**.

## Como construir e rodar o contêiner

### Clonar o repositório
```sh
git clone https://github.com/eduardopeixinho/agenda.git
```
### Acessar diretório com os arquivos
```sh
cd agenda/artefatos/
```

### Construir a imagem Docker
Execute o seguinte comando para criar a imagem Docker a partir do `Dockerfile`:

```sh
docker build -f artefatos/agenda.Dockerfile -t agenda-front .
```

### Rodar o contêiner
Após construir a imagem, execute o contêiner com:

```sh
docker run -d -p 3000:3000 --name agenda-front agenda-front
```

### Link para acesso
Utilizar o seguinte link para acessar o frontend:
```sh
http://127.0.0.1:3000/
```
---