package com.example.demo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserNameController {
private List<String> usersName = new ArrayList<>();
	
	@GetMapping(value="/nameList")
	public List<String> getUsersName(){
		//System.out.println("hola");
		return usersName;
	}
	
	@PostMapping(value="/nameList")
	public ResponseEntity<Boolean> addUser(@RequestBody String name){
		if(usersName.contains(name)) {
			return new ResponseEntity<Boolean> (false, HttpStatus.CREATED);
		}else {
			usersName.add(name);
			return new ResponseEntity<Boolean> (true, HttpStatus.CREATED);
		}	
	}
	
	
	@DeleteMapping(value="/nameList/{name}")
	 public ResponseEntity<Boolean> borraName(@PathVariable String name){
		
		if(usersName.contains(name)) {
			usersName.remove(name);
			return new ResponseEntity<Boolean> (true, HttpStatus.OK);
		}else {
			return new ResponseEntity<Boolean> (false, HttpStatus.NOT_FOUND);
		}
	 }

}
