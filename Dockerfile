FROM openjdk:18

ENV ENVIRONMENT=prod

LABEL maintainer="b.koeroglu@proton.me"

ADD backend/target/my_supplier.jar my_supplier.jar

CMD [ "sh", "-c", "java Dserver.port=$PORT -jar /my_supplier.jar" ]
