package sevice.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class LoginController {

    @GetMapping(value = {"/", "/home", "/login", "/editor", "/project"})
    public String index() {
        return "index";
    }

    @PostMapping(value = {"/login"})
    public void login() {

    }
}