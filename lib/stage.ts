import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { MyLambdaStack } from './lambda-stack';
import { Stage, StageProps } from 'aws-cdk-lib';

export class MyPipelineAppStage extends Stage {

    constructor(scope: Construct, id: string, props: StageProps) {
      super(scope, id, props);

      const lambdaStack = new MyLambdaStack(this, 'LambdaStack', { 
        stageName: props.stageName
      });
    }
}