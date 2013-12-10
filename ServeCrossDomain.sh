#!bin/bash
while true
do
cat crossdomain.xml | nc -l 843
done