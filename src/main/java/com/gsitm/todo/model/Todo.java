package com.gsitm.todo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Todo {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name;
	private String dueDate;
	private String note;
	private Boolean deleted = Boolean.FALSE;

	public Todo() {}
	
	public Todo(String name, String dueDate, String note) {
		this.name = name;
		this.dueDate = dueDate;
		this.note = note;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDueDate() {
		return dueDate;
	}

	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	@Override
	public String toString() {
		return String.format("Todo[id=%d, name='%s', "
				+ "dueDate='%s', note='%s', boolean='%b']", id, name, dueDate, note, deleted);
	}
}