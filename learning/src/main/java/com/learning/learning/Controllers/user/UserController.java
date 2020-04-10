package com.learning.learning.Controllers.user;

import com.learning.learning.Entities.User;
import com.learning.learning.Exception.ResourceNotFoundException;
import com.learning.learning.Repositories.RoleRepository;
import com.learning.learning.Repositories.UserRepository;
import com.learning.learning.payload.ApiResponse;
import com.learning.learning.payload.JwtAuthenticationResponse;
import com.learning.learning.payload.LoginRequest;
import com.learning.learning.payload.SignUpRequest;
import com.learning.learning.token.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;


@CrossOrigin(origins = "${app.origin}")
@RestController
@RequestMapping("${app.login}")
public class UserController {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username already exists!"),
                    HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }


        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(), signUpRequest.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));


        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

    @PutMapping("/user/{username}")
    public ResponseEntity<User> EditUser(@PathVariable(value = "username") String userid,
                                         @Valid @RequestBody User userDetails) throws ResourceNotFoundException {

        User user = userRepository.findByUsernameOrEmail(userid, userid)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non identifie" + userid));

        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setPassword(passwordEncoder.encode(userDetails.getPassword()));

        final User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);


    }

    @GetMapping("/roles/{username}")
    public ResponseEntity<Object> Find(@PathVariable(value = "username") String roleId)
            throws ResourceNotFoundException {
        Object role = roleRepository.FindRoles(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur inexistant:: " + roleId));
        return ResponseEntity.ok().body(role);
    }
}