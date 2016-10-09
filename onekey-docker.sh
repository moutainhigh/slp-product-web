git reset --hard origin/master 
git pull 
chmod a+x onekey-docker.sh 
gradle clean && gradle build -x test 
docker build -t 10.19.13.18:5000/slp-product-web:v1.0 .   
docker push 10.19.13.18:5000/slp-product-web:v1.0 

docker rmi aioptapp/slp-product-web:v1.0  
docker tag 10.19.13.18:5000/slp-product-web:v1.0  aioptapp/slp-product-web:v1.0  
docker login --username=aioptapp --password=aioptapp@123 --email=wuzhen3@asiainfo.com 
docker push aioptapp/slp-product-web:v1.0  