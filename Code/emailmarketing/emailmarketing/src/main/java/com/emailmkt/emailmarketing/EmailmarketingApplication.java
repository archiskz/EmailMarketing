package com.emailmkt.emailmarketing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiKey;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@Configuration
@EnableSwagger2
public class EmailmarketingApplication {
	@Bean
	public Docket studentAPI() {
		return new Docket(DocumentationType.SWAGGER_2)
				.groupName("EmailMarketing")
				.apiInfo(new ApiInfoBuilder().title("EmailMarketing").description("Email Marketing").build())
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.emailmkt.emailmarketing"))
				.paths(PathSelectors.regex("/api.*"))
				.build();
	}
	public static void main(String[] args) {
		SpringApplication.run(EmailmarketingApplication.class, args);
	}
//	private ApiKey apiKey() {
//		return new ApiKey("Authorization", "Bearer", "header");
//	}
}
