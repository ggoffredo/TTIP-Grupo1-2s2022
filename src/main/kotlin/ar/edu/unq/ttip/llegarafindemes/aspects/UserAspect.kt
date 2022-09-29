package ar.edu.unq.ttip.llegarafindemes.aspects

import ar.edu.unq.ttip.llegarafindemes.services.UserService
import org.aspectj.lang.ProceedingJoinPoint
import org.aspectj.lang.annotation.Around
import org.aspectj.lang.annotation.Aspect
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Aspect
@Component
class UserAspect(@Autowired var userService: UserService) {

    @Around(
        "execution(* ar.edu.unq.ttip.llegarafindemes.controllers.GastosController.*(..)) || execution(* ar.edu.unq.ttip.llegarafindemes.controllers.IngresosController.*(..))"
    )
    fun validateUserExists(joinPoint: ProceedingJoinPoint): Any {
        if (joinPoint.args.isNotEmpty()) {
            val userId = joinPoint.args.first().toString().toInt()
            userService.getUser(userId)
        }
        return joinPoint.proceed(joinPoint.args)
    }
}