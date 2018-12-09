# Overview

Serverless Node.js examples using TypeScript are organized into groups and designed to illustrate the techniques needed to build great microservices. To use the samples clone our GitHub repository using Git.

## Build and Run from Source

1. Checkout the code and install dependencies
```shell
sls create --template-url https://github.com/alertbox/serverless-basics-device-detect-ts --path my-basics-device-detect-svc
```
2. Compile and run example
```shell
cd my-basics-device-detect-svc
npm start
```
3. [Play with the serverless]() example

## Packagin and Deploying

We use [Lambda@Edge functions](https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html) to change CloudFront requests and responses before it forwards to the origin. Please see [Adding CloudFront Triggers](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-add-triggers-cf-console.html) page on AWS for a comprehensive documentation about Customizing CloudFront using Lambda@Edge functions.

With VS Code:

1. Open VS Code Terminal
2. Build and deploy
```shell
npm run build
npm run deploy
```

With AWS Console:

3. Login to AWS Console and go to CloudFront Console
4. Go to the Edit Behavior pattern of your CloudFront Distribution
5. Whitelist `CloudFront-Is-Mobile-Viewer` and `Origin` headers
6. Associate lambda function `basics-device-detect` ARN as the `Origin Request` event type