package vadmark.afp.web;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vadmark.afp.service.RouteService;
import vadmark.afp.service.UserService;

/**
 * @author Markitanov Vadim
 * @since 08.11.2024
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    private final RouteService routeService;

    @GetMapping("/info")
    public String info() {
        return userService.getInfo();
    }
}
