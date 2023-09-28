import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class MyLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, stageName: string, props?: cdk.StackProps) {
      super(scope, id, props);

      new Function(this, 'LambdaFunction', {
        runtime: Runtime.NODEJS_14_X,
        handler: 'handler.handler',
        code: Code.fromAsset(path.join(__dirname, 'lambda')),
        environment: { "stageName": stageName} 
      });
    }
}