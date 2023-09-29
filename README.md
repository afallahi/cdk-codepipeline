# CI/CD With AWS CodePipeline and CDK TypeScript




![CDK_CodePipeline](https://github.com/afallahi/cdk-codepipeline/assets/73287428/b27e9630-fb79-4876-946b-1cec4efc8052)


## Stack

- AWS CodePipeline
- AWS CDK
- CloudFormation
- AWS Lambda
- Node.js
- Typescript
- Jest for Unit Tests


## Deployment

For the first time, delpoy the pipeline with
```
cdk deploy
```

Otherwise, avoid deploy directly and push to the repo to trigger the pipeline.


## Tests

### Run Unit Tests Locally

```
npm test
```

### Run Unit Tests In CI/CD Pipeline

```
testingStage.addPre(new CodeBuildStep('unit-tests', {
      commands: [
        'npm ci',
        'npm test'
      ]
    }))
```

## Pipeline

![pipeline-1](https://github.com/afallahi/cdk-codepipeline/assets/73287428/19622dc3-87ca-4069-b9a0-3657c9afa985)
![pipeline-2](https://github.com/afallahi/cdk-codepipeline/assets/73287428/51a35f86-cac6-431c-83f5-7c9e334e676b)

