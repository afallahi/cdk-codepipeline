import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, InlineCode, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { StackProps } from 'aws-cdk-lib';

interface LambdaStackProps extends StackProps {
    stageName?: string
}

export class LambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: LambdaStackProps) {
      super(scope, id, props);

      new Function(this, 'LambdaFunction', {
        runtime: Runtime.NODEJS_18_X,
        handler: 'handler.handler',
        code: Code.fromAsset(path.join(__dirname, 'lambda'))
        //environment: {"stageName" : props.stageName}
      });
    }
}