<div align="center">
	<a><img width="150" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/></a>
	<a><img width="150" src="https://user-images.githubusercontent.com/25181517/183896132-54262f2e-6d98-41e3-8888-e40ab5a17326.png" alt="AWS" title="AWS"/></a>
</div>

<p align="center">
	<a><img width="60" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/></a>
	<a><img width="60" src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" title="npm"/></a>	
</p>



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

