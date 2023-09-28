import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

export class CdkCodepipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'CdkPipeline', {
      pipelineName: 'my-pipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('afallahi/cdk-codepipeline', 'cdk-init'),
        commands: [
          'yarn install --frozen-lockfile',
          'npx projen build',
          'npx projen synth',
        ],
      }),
    });

  }
}
