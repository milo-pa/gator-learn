package dev.tutoring.service;

import dev.tutoring.model.UserAccount;
import dev.tutoring.repository.UserAccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserAccountService
{
    private final UserAccountRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserAccountService(UserAccountRepository userRepository, PasswordEncoder passwordEncoder)
    {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserAccountRepository getUserRepository()
    {
        return userRepository;
    }

    public UserAccount createAccount(UserAccount user)
    {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<UserAccount> authenticate(String email, String rawPassword)
    {
        Optional<UserAccount> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent())
        {
            UserAccount user = userOpt.get();

            if (passwordEncoder.matches(rawPassword, user.getPassword()))
            {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }
}

