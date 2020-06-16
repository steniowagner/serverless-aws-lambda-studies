# 1 - Install Servereless Framework

npm i -g serverless

# >>> You can use "sls" or "serverless" command

# 2 - Init the Serverless Framework

sls 

# 3 >>> ALWAYS DEPLOY THE CODE IN ORDER TO VERIFY IF EVERYTHIG'S WORKING FINE!

sls deploy 

# 4 - Invoking the function

# From the AWS

sls invoke -f hello

# Locally

sls invoke local -f hello --log

# 5 - Setup the Serverless Dashboard

sls deploy

# 6 - Check the logs
sls logs -f hello -t

# 7 - Remove everything after the usage

sls remove