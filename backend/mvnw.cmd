@echo off
@REM Maven Wrapper for Windows
@REM This script uses the maven-wrapper.jar to download and run Maven automatically
setlocal

set WRAPPER_JAR="%~dp0.mvn\wrapper\maven-wrapper.jar"
set WRAPPER_PROPERTIES="%~dp0.mvn\wrapper\maven-wrapper.properties"

java -jar %WRAPPER_JAR% %*
