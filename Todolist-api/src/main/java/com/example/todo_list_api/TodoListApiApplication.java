package com.example.todo_list_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.todo_list_api"})
public class TodoListApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(TodoListApiApplication.class, args);
    }
}