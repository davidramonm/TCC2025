package com.unip.EstablishmentsService.infra;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String uploadPath = System.getenv().getOrDefault("UPLOAD_DIR", "uploads/");
        System.out.println(System.getenv("UPLOAD_DIR"));
        String location = "file:" + (uploadPath.endsWith("/") ? uploadPath : uploadPath + "/");
        registry
                .addResourceHandler("/uploads/**")
                .addResourceLocations(location);
    }
}

