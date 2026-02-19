package com.hms.user.UserMS.service;

import com.hms.user.UserMS.dto.UserDTO;
import com.hms.user.UserMS.exception.LMSException;



public interface UserService {
        public void registerUser(UserDTO userDTO) throws LMSException, LMSException;
        public UserDTO loginUser(UserDTO userDTO) throws LMSException;
        public UserDTO getUserById(Long id) throws LMSException;
        public void updateUser(UserDTO userDTO) throws LMSException;
    
} 