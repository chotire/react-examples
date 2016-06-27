package com.gsitm.todo.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gsitm.todo.model.Todo;
import com.gsitm.todo.repository.TodoRepository;

@RestController
@RequestMapping(value="/api")
public class TodoController {
	@Autowired
	private TodoRepository todoRepository;
	
	@RequestMapping(value="/todos", method=RequestMethod.GET)
	public List<Todo> findAll() {
		return todoRepository.findAll();
	}
	
	@RequestMapping(value="/todos", method=RequestMethod.POST)
	public List<Todo> save(Todo todo) {
		todoRepository.save(todo);
		return findAll();
	}
	
	@RequestMapping(value="/todos", method=RequestMethod.PUT)
	public List<Todo> complete(Todo todo) {
		return save(todo);
	}
}