import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from "./stage";

export class CdkCodepipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'CdkPipeline', {
      pipelineName: 'my-pipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('afallahi/cdk-codepipeline', 'cdk-init'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ],
      }),
    });

    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: { account: "558532633158", region: "us-east-1" }
    }));

    testingStage.addPost(new ManualApprovalStep("Manual approval before production"));

    const prodStage = pipeline.addStage(new MyPipelineAppStage(this, "prod", {
      env: { account: "558532633158", region: "us-east-1" }
    }));

    

  }
}
