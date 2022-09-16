import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.7.3"
	id("io.spring.dependency-management") version "1.0.13.RELEASE"
	id("org.sonarqube") version "3.3"
	id("jacoco")
	war
	kotlin("jvm") version "1.6.21"
	kotlin("plugin.spring") version "1.6.21"
	kotlin("plugin.jpa") version "1.6.21"
}

group = "ar.edu.unq.ttip"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa:2.7.3")
	implementation("org.springframework.boot:spring-boot-starter-security:2.7.3")
	implementation("org.springframework.boot:spring-boot-starter-web:2.7.3")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.13.3")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("org.postgresql:postgresql:42.5.0")
	implementation("joda-time:joda-time:2.11.1")
	testImplementation("org.springframework.boot:spring-boot-starter-test:2.7.3")
	testImplementation("org.springframework.security:spring-security-test:5.7.3")
	implementation ("org.apache.commons:commons-csv:1.5")
}

sonarqube {
	properties {
		property("sonar.projectKey", "ggoffredo_TTIP-Grupo1-2s2022")
		property("sonar.organization", "lfm")
		property("sonar.host.url", "https://sonarcloud.io")
		property("sonar.coverage.jacoco.xmlReportPaths", "build/reports/jacoco/test/jacocoTestReport.xml")
		property("sonar.exclusions", "'**/jobs/**', '**/configuration/**'")
	}
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "11"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.jacocoTestReport {
	dependsOn(tasks.test)
	reports {
		xml.required.set(true)
	}
	afterEvaluate {
		classDirectories.setFrom(files(classDirectories.files.map {
			fileTree(it) {
				exclude("**/jobs/**", "**/configuration/**")
			}
		}))
	}
}

springBoot {
	mainClass.set("ar.edu.unq.ttip.llegarafindemes.LlegarAFinDeMesApplicationKt")
}
