# Keeping Up With the Javascripts - Part 1: ES6

## Project 4

**Screencast:** [https://vimeo.com/album/5932648/video/336087626](https://vimeo.com/album/5932648/video/336087626)

## JavaScript Lambda file

```javascript
exports.square = function(event, context, callback) {
  const square = Math.pow(parseInt(event.number), 2);

  console.log({"square": square});
}
```

## AWS Lambda actions

### Install AWS CLI

Follow the instructions from [Command Line Tools](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-tools.html) guide from **AWS Lambda Developer Guide**, and then configure your CLI calling:

```
$ aws configure
```

### Show list of functions

```
$ aws lambda list-functions
```

### Create a new AWS Lambda Function

```
$ zip -r project4.zip project4.js
$ aws lambda create-function --function-name project4 --role "arn:aws:iam::389329251810:role/service-role/pirple" --handler project4.square --runtime nodejs8.10 --zip fileb://project4.zip
```

### Invoke an AWS Lambda Function with a payload

```
$ aws lambda invoke --function-name project4 --payload '{"number": 2}' out --log-type Tail --query 'LogResult' --output text | base64 -D
```

### Update an AWS Lambda Function

```
$ zip -r project4.zip project4.js
$ aws lambda update-function-code --function-name project4 --zip-file fileb://project4.zip
```

### Delete an AWS Lambda Function

```
$ aws lambda delete-function --function-name project4
```
