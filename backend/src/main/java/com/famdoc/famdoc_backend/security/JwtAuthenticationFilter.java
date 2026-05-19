package com.famdoc.famdoc_backend.security;

import java.io.IOException;
import java.util.ArrayList;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
    
    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil){
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        //get authorization header fron the react fetch request
        final String authHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        //check if the header exists and starts with "Bearer"
        if (authHeader != null && authHeader.startsWith("Bearer ")){
            jwt = authHeader.substring(7); //cut off Bearer
            try{
                //extract username from token
                username = jwtUtil.extractAllClaims(jwt).getSubject();
            }catch (Exception e){
                System.out.println("Invalid or expired token.");
            }
        }
        //if we found a username and they aren't authenticated in this transaction
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            //ask if the token is completely valid
            if (jwtUtil.isTokenValid(jwt)){
                //create authentication object
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    username, null, new ArrayList<>()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        //pass request to next step
        filterChain.doFilter(request, response);
    }
}
