## SpringBoot app starter steps
- Get inside supervisor-mgmt folder
- Build the springbootapplication using below command
  
    mvn clean install
- Build docker image using below command
 
    docker build --tag=supervisor-mgmt:latest .
- Run docker image using below command

   docker run -p8080:8080 supervisor-mgmt:latest
- Once docker image is succesfully running then api can be access on http://localhost:8080

## Angular app starter steps:

- get inside NotificationForm folder
-  Build docker image using below command
 
    docker build –t angular-frontend .
- Run docker image using below command

   docker run -p80:80 angular-frontend:latest
- Once docker image is succesfully running then UI app can be access on http://localhost

