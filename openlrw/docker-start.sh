#!/usr/bin/env bash

#Possibility to set JVM options (https://www.oracle.com/technetwork/java/javase/tech/vmoptions-jsp-140102.html)
export JAVA_OPTS="-Djava.security.egd=file:/dev/./urandom" 

# Pass in some spring boot opts https://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html

export SPRING_BOOT_OPTS="--spring.data.mongodb.uri=$OPENLRW_URI"

# If SSL/TLS is enabled, add Java options
if [ $OPENLRW_SSL = 'true' ]; then
  mydir=$OPENLRW_SSL_CA_FILE_DIR
  truststore=${mydir}/rds-truststore.jks
  storepassword=$OPENLRW_SSL_STORE_PASS

  awk 'split_after == 1 {n++;split_after=0} /-----END CERTIFICATE-----/ {split_after=1}{print > "rds-ca-" n ".pem"}' < ${mydir}/rds-combined-ca-bundle.pem

  for CERT in rds-ca-*; do
    alias=$(openssl x509 -noout -text -in $CERT | perl -ne 'next unless /Subject:/; s/.*(CN=|CN = )//; print')
    echo "Importing $alias"
    keytool -import -file ${CERT} -alias "${alias}" -storepass ${storepassword} -keystore ${truststore} -noprompt
    rm $CERT
  done

  rm ${mydir}/rds-combined-ca-bundle.pem

  echo "Trust store content is: "

  keytool -list -v -keystore "$truststore" -storepass ${storepassword} | grep Alias | cut -d " " -f3- | while read alias
  do
    expiry=`keytool -list -v -keystore "$truststore" -storepass ${storepassword} -alias "${alias}" | grep Valid | perl -ne 'if(/until: (.*?)\n/) { print "$1\n"; }'`
    echo " Certificate ${alias} expires in '$expiry'"
  done

  JAVA_OPTS="${JAVA_OPTS} -Djavax.net.ssl.trustStore=$truststore -Djavax.net.ssl.trustStorePassword=$storepassword"
fi

#tail -f /dev/null
java ${JAVA_OPTS} -jar app.jar ${SPRING_BOOT_OPTS}
sleep 15
