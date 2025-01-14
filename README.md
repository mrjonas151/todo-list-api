# To-Do List App ✅


**O App To Do List** é uma aplicação web desenvolvida com Spring Boot (Java 17) no backend e React no frontend. A aplicação permite que os usuários criem novas tarefas, visualizem todas as tarefas e visualizem detalhes de tarefas específicas, além de oferecer uma experiência em light ou dark mode.

## ☀️ Página principal em light mode:

![image](https://github.com/user-attachments/assets/2716147c-f00d-40d6-b8fa-b84d84aa4b2f)

![image](https://github.com/user-attachments/assets/1257fad5-51df-4a53-a43d-143bcadda326)

![image](https://github.com/user-attachments/assets/73ff495f-5f4c-4e9a-adf6-51910f236f65)

![image](https://github.com/user-attachments/assets/9bf70e80-763f-4198-acae-147f6e3fa102)

## 🌑 Página principal em dark mode:

![image](https://github.com/user-attachments/assets/47d5de6e-ce11-4d97-81b2-779fba6c3137)

![image](https://github.com/user-attachments/assets/0e79af06-9324-4ee9-a0e5-a7c61bd945a6)

![image](https://github.com/user-attachments/assets/4dffaacb-f54f-49f5-9927-e6d0ef076b9f)


## 🚀 Começando 

Estas instruções ajudarão você a colocar uma cópia do projeto em funcionamento em sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré Requisitos

Certifique-se de que seu ambiente de desenvolvimento está configurado corretamente com Java 17 e Node.js instalados. 

Backend (Spring Boot)
Para rodar o backend em Spring Boot, verifique se você tem o Java 17 instalado. Além disso, você vai precisar do Maven para gerenciar as dependências. Para verificar se o Java está instalado corretamente, execute o seguinte comando no terminal:

```
java -version
```

Frontend (React)
Para rodar o frontend em React, verifique se o Node.js está instalado. Para isso, execute o seguinte comando no terminal:

```
node -v
```

### 🔧 Instalação

Uma série de exemplos passo a passo para configurar o ambiente de desenvolvimento e rodar a aplicação:

Primeiro, identifique as 2 principais pastas em nossa aplicação: "my-todo-app" (Frontend) e "Todolist-api" (Backend).

Navegue até a pasta "my-todo-app" e certifique-se de que possui o Java 17 e o Maven instalados.
Antes de rodar a aplicação, é necessário configurar o banco de dados. A aplicação foi desenvolvida para utilizar PostgreSQL.
Certifique-se de que o PostgreSQL está instalado e em execução na sua máquina.
Crie um banco de dados chamado todolistbd.
Atualize o arquivo application.properties no diretório do backend com as informações do banco de dados:

```
spring.application.name=todo-list-api
server.port=8080

spring.datasource.url=jdbc:postgresql://localhost:5432/todolistbd
spring.datasource.username=(Seu username, sendo padrão postgres)
spring.datasource.password=(Sua senha do BD)
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

Para instalar as dependências do backend, rode o comando:

```
mvn clean install
```

Alternativamente ao comando anterior caso não funcione:

```
./mvnw clean install
```

Logo após isso o comando:

```
mvn spring-boot:run
```

Novamente, em alternativa ao comando anterior, utilize este:

```
./mvnw spring-boot:run
```

Configuração do Frontend:
Navegue até a pasta "my-todo-app".
Certifique-se de que o Node.js está instalado.
Instale as dependências necessárias com o comando

```
npm install
```

Após instalar as dependências, inicie o servidor do frontend com o comando:

```
npm run dev
```

Com o backend e o frontend configurados e em execução, você poderá acessar a aplicação no navegador pelo link fornecido pelo terminal do frontend. Certifique-se de que o backend está ativo antes de testar as funcionalidades da aplicação.

## 📚 API Endpoints

## URL Completa = Base URL + URL Complementar

### Base URL
http://localhost:8080/ (Porta 8080 como configuramos, caso contrário adicione sua porta específica)

### Listar todas as tarefas (URL COMPLEMEMENTAR: /tasks)
Método: GET  
Descrição: Retorna uma lista de todas as tarefas cadastradas.  
Resposta:  
200 OK: Lista de tarefas no formato JSON.  

URL: http://localhost:8080/tasks  

### Buscar tarefa por ID (URL COMPLEMEMENTAR: /tasks/{id})
Método: GET  
Descrição: Retorna uma tarefa específica com base no ID fornecido.  
Parâmetro -> id (Long): ID da tarefa.  
Resposta:  
200 OK: Objeto da tarefa no formato JSON.  
404 Not Found: Caso a tarefa não seja encontrada.  

URL: http://localhost:8080/tasks/{id}  

### Criar uma nova tarefa (URL COMPLEMEMENTAR: /tasks)
Método: POST  
Descrição: Cria uma nova tarefa.  
Corpo da Requisição como exemplo:  

```
{
  "title": "Estudar Engenharia de Software",
  "description": "Estudar os conceitos básicos da Engenharia de Software",
  "status": "NOT_STARTED"
}
```
Resposta:  
200 OK: Objeto da tarefa criada no formato JSON.  

URL: http://localhost:8080/tasks  


### Atualizar uma tarefa existente (URL COMPLEMEMENTAR: /tasks/{id})
Método: PUT  
Descrição: Atualiza uma tarefa existente com base no ID fornecido.  
Parâmetro -> id (Long): ID da tarefa.  

Corpo da Requisição como exemplo:  

```
{
  "title": "Estudar Engenharia de Software",
  "description": "Estudar os conceitos básicos da Engenharia de Software",
  "status": "IN_PROGRESS"
}
```

Resposta:  
200 OK: Objeto da tarefa atualizada no formato JSON.  
404 Not Found: Caso a tarefa não seja encontrada.  

URL: http://localhost:8080/tasks/{id}  

### Deletar uma tarefa (URL COMPLEMEMENTAR: /tasks/{id})
Método: DELETE  
Descrição: Remove uma tarefa com base no ID fornecido.  
Parâmetro-> id (Long): ID da tarefa.  
Resposta:  
200 OK: Caso a tarefa seja removida com sucesso.  
404 Not Found: Caso a tarefa não seja encontrada.  

URL: http://localhost:8080/tasks/{id}   

## 🚢 Rodando com Docker  
*Para rodar a aplicação utilizando Docker, siga os passos abaixo  

1-> Certifique-se de que o Docker está instalado em sua máquina  
Para verificar se o Docker está instalado corretamente, execute o seguinte comando no terminal:  

```
docker --version
```

2-> Construa e suba os containers.  
Com o Docker instalado, você pode usar o Docker Compose para facilitar o processo de build, já deixei configurado e basta apenas fazer a execução do código de múltiplos containers (frontend, backend e banco de dados).  

```
docker-compose up --build
```

3-> Altere o link de acesso ao BD nas properties:
![image](https://github.com/user-attachments/assets/88c31a3e-5fc1-4c89-b77a-ad817d86fbde)  
OBS: No caso da utilização do docker, comentar o bd local e descomentar o do docker no arquivo application.properties.

4-> Acesse a aplicação
Frontend: Depois de os containers estarem em execução, acesse a aplicação no navegador através de http://localhost:5173.  
Backend: A API estará disponível em http://localhost:8080  

## 🛠️ Construído com

* [React Vite] - Biblioteca utilizada para o desenvolvimento da interface web.
* [Java] - Linguagem de programação utilizada no backend.
* [Spring Boot] - Framework utilizado para o desenvolvimento do servidor.
* [PostgreSQL] - Banco de dados relacional utilizado para armazenar as informações.
* [Maven] - Ferramenta de gerenciamento de dependências do backend.

## ✒️ Author

Aplicação desenvolvida por um autor

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/mrjonas151">
          <img src="https://avatars.githubusercontent.com/u/89425034?v=4" width="100px;" alt="Jonas's Photo"/><br>
          <sub>
            <b>Jonas Tomaz de Aquinos</b>
          </sub>
        </a>
      </td>
    </tr>
  </table>
</div>

## 🎁 Agradecimentos
Agradeço a atenção do leitor e de quem esteja querendo testar essa aplicação em sua própria máquina, espero que contribua significativamente com o aprendizado de alguém.

---
⌨️ com ❤️ por Jonas Tomaz 😉
