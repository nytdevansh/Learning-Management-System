package com.hms.user.UserMS.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.user.UserMS.dto.UserDTO;
import com.hms.user.UserMS.exception.LMSException;
import com.hms.user.UserMS.service.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.hms.user.UserMS.dto.ResponseDTO;


@RestController
@RequestMapping("/users")
@Validated
@CrossOrigin
public class UserAPI {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> registerUser(@RequestBody @Valid UserDTO userDTO) throws LMSException {
        userService.registerUser(userDTO);
        return new ResponseEntity<>(new ResponseDTO("Account Created"), HttpStatus.CREATED);
    }
    
    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@RequestBody UserDTO userDTO) throws LMSException {

        return new ResponseEntity<>(userService.loginUser(userDTO),HttpStatus.OK);
    }
    
}
