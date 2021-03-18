package com.example.restuser.controller;

import java.util.HashMap;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.restuser.exception.ResourceNotFoundException;
import com.example.restuser.model.User;
import com.example.restuser.repository.UserRepository;


@CrossOrigin(origins="http://localhost:3000")
@RestController
class Controller { 

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/create")
    public User create(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> 
        update(@PathVariable(value="id") long id, @RequestBody User userDetail) throws ResourceNotFoundException {
            User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Kullanıcı bulunamadı"));

            user.setTckn(userDetail.getTckn());
            user.setEmail(userDetail.getEmail());
            user.setPassword(userDetail.getPassword());
            user.setGsm(userDetail.getGsm());
            user.setAdress(userDetail.getAdress());

            final User updatedUser = userRepository.save(user);
            return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{id}")
    public Map<String, Boolean> delete(@PathVariable(value="id") Long id) throws ResourceNotFoundException {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("kullanıcı bulunamadı"));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }



}