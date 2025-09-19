package com.asd.board_game_statistics_api.test_utils;

import com.asd.board_game_statistics_api.util.ResourceReader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
public class TestResourceReaderConfig {

    @Autowired
    private ResourceLoader autowiredResourceLoader;

    @Bean
    public ResourceReader resourceReader() throws IllegalAccessException, NoSuchFieldException {
        ResourceReader resourceReader = new ResourceReader();
        java.lang.reflect.Field field = ResourceReader.class.getDeclaredField("resourceLoader");
        field.setAccessible(true);
        field.set(resourceReader, autowiredResourceLoader);
        return resourceReader;
    }
}
