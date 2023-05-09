#!/bin/bash
cd /home/ec2-user
aws s3 cp s3://my-bucketbingye/demo_springboot_crud_h2-0.0.1-SNAPSHOT.jar .
java -jar demo_springboot_crud_h2-0.0.1-SNAPSHOT.jar
