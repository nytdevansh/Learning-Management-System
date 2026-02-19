package com.hms.user.UserMS.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.hms.user.UserMS.entity.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class UserDTO {
    private Long Id;
    @NotBlank(message = "Name is mandatory")
    private String name;
    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;
    @NotBlank(message = "Password is mandatory")
    private String password;
    private Roles role;

    public User toEntity() {
       return new User(this.Id, this.name, this.email, this.password, this.role);
    }
    
}
