package com.alura.foro.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AluraForoApplication {
	@Value("${spring.datasource.url}")
    private static long DATABASE_URL;
	public static void main(String[] args) {
		System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + DATABASE_URL);
		SpringApplication.run(AluraForoApplication.class, args);
	}

}
