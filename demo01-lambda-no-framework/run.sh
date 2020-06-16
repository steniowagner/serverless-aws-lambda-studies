# 1 - Create a file to keep the security policies

# 2 - Create a security role on AWS

aws iam create-role \
    --role-name lambda-example \
    --assume-role-policy-document file://policies.json \
    | tee logs/role.log

# 3 - Zip the handler file

zip handler.zip index.js

# 4 - Create the Lambda-function, indicate the zip-file where the handler-function is zipped and define the run-time and the role (previously created - copy the "arn")

aws lambda create-function \
    --function-name hello-cli \
    --zip-file fileb://handler.zip \
    --handler index.handler \
    --runtime nodejs12.x \
    --role arn:aws:iam::933144550434:role/lambda-example \
    | tee logs/lambda-creation.log

# 5 - Run the Lambda

aws lambda invoke \
    --function-name hello-cli \
    --log-type Tail \
    logs/lambda-exec.log

# 6 - If need to update the code...

# 6.1 - Zip the code again

zip handler.zip index.js

# 6.2 - Update the Lambda

aws lambda update-function-code \
    --zip-file fileb://handler.zip \
    --function-name hello-cli \
    --publish \
    | tee logs/lambda-update.log

# 6.3 - Run the Lambda again and check if it's updated

aws lambda invoke \
    --function-name hello-cli \
    --log-type Tail \
    logs/lambda-exec-update.log

# 7 - After the usage of the example, remove the Lambda and the Role

aws lambda delete-function \
    --function-name hello-cli 

aws iam delete-role \
    --role-name lambda-example 