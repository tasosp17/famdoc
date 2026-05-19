package com.famdoc.famdoc_backend.security;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
    //this generates a secure and random cryptographic key for the server
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    //tokens expire after 24 hours
    private final long EXPIRATION_TIME = 86400000;

    public String generateToken(String username, Long id, String role){
        return Jwts.builder()
        .setSubject(username)
        .claim("id", id)
        .claim("role", role)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
        .signWith(key)
        .compact();
    }

    public Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
        .setSigningKey(key)
        .build()
        .parseClaimsJws(token)
        .getBody();

    }

    public boolean isTokenValid(String token){
        try{
            extractAllClaims(token);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
