# 스프링 부트 프로젝트 생성 
1. Ctrl + shift + p 
2. spring initializer : create Gradle Projecty
3. Project Name : todo 
4. Dependency : 
        - Spring Web
        - Spring Boot Dev Tools
        - Lombok
        - MySQL
        - MyBatis
        - OpenAPI


# To Do List - Spring Boot 
1. todos 테이블 생성 

2. domain
        - Todoes.java(앤터티 생성)
3. mapper
        - BaseMapper.java
        - TodoMapper.xml
        - TodoMapper.java
4. service
        - BaseService.java
        - TodoService.java
        - TodoServiceImpl.java
5. controller 
        - TodoController.java

6. Pagination 추가 

7. OpenAPI Config 

8. Data Source - application.properties 

spring.application.name=todo

<!-- # PageHelper 설정
pagehelper.helperDialect=mysql
pagehelper.reasonable=true
pagehelper.supportMethodsArguments=true
pagehelper.params=count=countSql

# 데이터 소스 - MySQL
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/aloha?serverTimezone=Asia/Seoul&allowPublicKeyRetrieval=true&useSSL=false&autoReconnection=true&autoReconnection=true
spring.datasource.username=aloha
spring.datasource.password=123456

# Mybatis 설정
mybatis.configuration.map-underscore-to-camel-case=true
mybatis.type-aliases-package=com.aloha.todo.domain
mybatis.mapper-locations=classpath:mybatis/mapper/**/**.xml -->



10. HomeController.java 
        - : (redirect) ➡ /swagger-ui/index.html




# react 프로젝트 
1. 프로젝트 생성
        - npx create-react-app todo-app
        - create-vite todo-app --template react
2. 모듈 설치 
        -npm install
3. 서버 실행 
        - npm start
        - npm run dev

4. Component 
        - Todo
                - Container.jsx
                - Header.jsx
                - Input.jsx
                - List.jsx
                - Card.jsx
                - Footer.jsx

5. App
        - App.js
        - App.css
 
