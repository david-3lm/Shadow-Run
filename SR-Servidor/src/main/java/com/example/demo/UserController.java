package com.example.demo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	
	private List<User> users = new ArrayList<>();
	
	@GetMapping(value="/users")
	public List<User> getUsers(){
		//System.out.println("hola");
		return users;
	}
	
	@PostMapping(value="/users")
	public ResponseEntity<Boolean> addUser(@RequestBody User user){
		users.add(user);
		return new ResponseEntity<Boolean> (true, HttpStatus.CREATED);
	}
}
