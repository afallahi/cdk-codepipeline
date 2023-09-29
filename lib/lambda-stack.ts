import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { Stack, StackProps } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path';

interface LambdaStackProps extends StackProps {
    stageName?: string
}

export class MyLambdaStack extends Stack {
    constructor(scope: Construct, id: string, props: LambdaStackProps) {
      super(scope, id, props);

      new Function(this, 'LambdaFunction', {
        runtime: Runtime.NODEJS_16_X,
        handler: 'handler.handler',
        code: Code.fromAsset(path.join(__dirname, 'lambda')),
        environment: { STAGE: props.stageName ?? "test" } 
      });

      new NodejsFunction(this, 'hello-lambda', {
        runtime: Runtime.NODEJS_16_X,
        handler: 'handler',
        entry: (join(__dirname, '.', 'lambda', 'hello.ts')),
        environment: { STAGE: props.stageName  ?? "test" }
      })
    }
}