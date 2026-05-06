package com.feestverhuur.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class RateLimitInterceptor implements HandlerInterceptor {

    // Aparte bucket-map per endpoint-type
    private final Map<String, Bucket> contactBuckets = new ConcurrentHashMap<>();
    private final Map<String, Bucket> bookingBuckets = new ConcurrentHashMap<>();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String ip = getClientIp(request);
        String uri = request.getRequestURI();
        String method = request.getMethod();

        Bucket bucket = null;

        if ("POST".equals(method) && uri.equals("/api/contact")) {
            // Contactformulier: max 5 berichten per 15 minuten per IP
            bucket = contactBuckets.computeIfAbsent(ip, k ->
                Bucket.builder()
                    .addLimit(Bandwidth.builder()
                        .capacity(5)
                        .refillIntervally(5, Duration.ofMinutes(15))
                        .build())
                    .build()
            );
        } else if ("POST".equals(method) && uri.equals("/api/bookings")) {
            // Boekingen: max 10 per uur per IP
            bucket = bookingBuckets.computeIfAbsent(ip, k ->
                Bucket.builder()
                    .addLimit(Bandwidth.builder()
                        .capacity(10)
                        .refillIntervally(10, Duration.ofHours(1))
                        .build())
                    .build()
            );
        }

        if (bucket != null && !bucket.tryConsume(1)) {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Te veel verzoeken. Probeer het later opnieuw.\"}");
            return false;
        }

        return true;
    }

    private String getClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
