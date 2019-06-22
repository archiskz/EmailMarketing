package com.emailmkt.emailmarketing;

import com.google.common.base.Predicates;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.SecurityScheme;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@SpringBootApplication
@Configuration
@EnableSwagger2
public class EmailmarketingApplication {
	@Bean
	public Docket studentAPI() {
//		return new Docket(DocumentationType.SWAGGER_2)
//				.groupName("EmailMarketing")
//				.apiInfo(new ApiInfoBuilder().title("EmailMarketing").description("Email Marketing").build())
//				.select()
//				.apis(RequestHandlerSelectors.basePackage("com.emailmkt.emailmarketing"))
//				.paths(PathSelectors.regex("/api.*"))
//				.build()
//		     .securitySchemes(securitySchemes())
//		Adding Header
//		ParameterBuilder aParameterBuilder = new ParameterBuilder();
//		aParameterBuilder.name("Authorization")                 // name of header
//				.modelRef(new ModelRef("string"))
//				.parameterType("header")               // type - header
//				.defaultValue("Bearer")        // based64 of - zone:mypassword
//				.required(true)                // for compulsory
//				.build();
//		java.util.List<Parameter> aParameters = new ArrayList<>();
//		aParameters.add(aParameterBuilder.build());             // add parameter
//		return new Docket(DocumentationType.SWAGGER_2).select()
//				.apis(RequestHandlerSelectors
//						.any())
//				.paths(PathSelectors.any())
//				.build().
//						pathMapping("")
//				.globalOperationParameters(aParameters);
        List<SecurityScheme> schemeList = new ArrayList<>();
        schemeList.add(new ApiKey(HttpHeaders.AUTHORIZATION, "Authorization", "header"));
        return new Docket(DocumentationType.SWAGGER_2)
                .produces(Collections.singleton("application/json"))
                .consumes(Collections.singleton("application/json"))
                .ignoredParameterTypes(Authentication.class)
                .securitySchemes(schemeList)
                .useDefaultResponseMessages(false)
                .select()
                .apis(Predicates.not(RequestHandlerSelectors.basePackage("org.springframework.boot")))
                .paths(PathSelectors.any())
                .build();
}

	public static void main(String[] args) {
		SpringApplication.run(EmailmarketingApplication.class, args);
	}

}
