package com.gsitm.todo.repository;

import java.util.List;

import org.springframework.data.repository.Repository;

import com.gsitm.todo.model.Todo;

public interface TodoRepository extends Repository<Todo, Long>{
	List<Todo> findAll();
	
	Todo save(Todo todo);
}