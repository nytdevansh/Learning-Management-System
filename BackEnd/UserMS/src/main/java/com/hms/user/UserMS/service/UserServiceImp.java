package com.hms.user.UserMS.service;

import java.lang.StackWalker.Option;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.hms.user.UserMS.repository.UserRepository;
import com.hms.user.UserMS.entity.User;
import com.hms.user.UserMS.exception.LMSException;


import java.util.Optional;


import com.hms.user.UserMS.dto.UserDTO;


@Service("userService")
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private  PasswordEncoder passwordEncoder;

    @Override
    public void registerUser(UserDTO userDTO) throws LMSException{
         Optional<User> existingUser = userRepository.findByEmail(userDTO.getEmail());
         if(existingUser.isPresent()) {
            throw new LMSException("USER_ALREADY_EXISTS");
         }

        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userRepository.save(userDTO.toEntity());
    }
 
    @Override
    public UserDTO loginUser(UserDTO userDTO) throws LMSException {
        User user = userRepository.findByEmail((userDTO.getEmail())).orElseThrow(()->
         new LMSException("USER_NOT_FOUND"));
         if(!passwordEncoder.matches(userDTO.getPassword(), user.getPassword())){
            throw new LMSException("INVALID_CREDENTIALS");
         }
         user.setPassword("null");
         return user.toDTO();
    }

    @Override
    public UserDTO getUserById(Long id) throws LMSException {
      return userRepository.findById(id).orElseThrow(()->
        new LMSException("USER_NOT_FOUND")).toDTO();   
        
    }

    @Override
    public void updateUser(UserDTO userDTO) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateUser'");
    }
    
}
