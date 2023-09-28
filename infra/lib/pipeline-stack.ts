import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipelineActions from 'aws-cdk-lib/aws-codepipeline-actions';
import { SecretValue } from "aws-cdk-lib";
import { PipelineAppStage } from './pipelin-app-stage';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';

const GITHUB_USERNAME = 'afallahi';
const GITHUB_REPO = 'https://github.com/afallahi/cdk-codepipeline';
const GITHUB_BRANCH = 'cdk-init';
const secret_name = "GitHubAccessToken-AWS_CodeBuild";
const codePipelineName = "MyPipeline";

export class PipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const githubAccessToken = SecretValue.secretsManager(secret_name);
        const sourceArtifact = new codepipeline.Artifact();
        const cfnBuildOutput = new codepipeline.Artifact();

        //========= CodeBuild Project ==========================================
        const project = new codebuild.Project(this, 'MyProject', {
            buildSpec: codebuild.BuildSpec.fromObject({
              version: '0.2',
              phases: {
                install: {
                  commands: [
                    'npm install -g aws-cdk',
                    'npm install'
                  ]
                },
                build: {
                  commands: [
                    'npm run build',
                    'npm run cdk synth'
                  ]
                }
              },
              artifacts: {
                'base-directory': 'cdk.out',
                files: [
                  'MyStack.template.json'
                ]
              }
            }),
            environment: {
              buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
            }
        });

        //================= CodePipeline =======================================
        const pipeline = new codepipeline.Pipeline(this, codePipelineName);

        //=============================== Source: connect to GitHub ============
        pipeline.addStage({
            stageName: 'Source',
            actions: [
                new codepipelineActions.GitHubSourceAction({
                    actionName: 'GitHub',
                    owner: GITHUB_USERNAME,
                    repo: GITHUB_REPO,
                    oauthToken: githubAccessToken,
                    output: sourceArtifact,
                    branch: GITHUB_BRANCH
                })
            ]
        });

        //======================= Build ========================================
        pipeline.addStage({
            stageName: 'Build',
            actions: [
                new codepipelineActions.CodeBuildAction({
                    actionName: 'Build',
                    project,
                    input: sourceArtifact,
                    outputs: [cfnBuildOutput]
                })
            ]
        });

        //======================= Deploy =======================================
        pipeline.addStage({
            stageName: 'Deploy',
            actions: [
                new codepipelineActions.CloudFormationCreateUpdateStackAction({
                    actionName: 'Deploy',
                    templatePath: cfnBuildOutput.atPath('MyStack.template.json'), //new codepipeline.ArtifactPath(project, 'MyStack.template.json'),
                    stackName: 'MyStack',
                    adminPermissions: true,
                    parameterOverrides: {
                        'BucketName': 'my-bucket-name'
                    },
                    extraInputs: [cfnBuildOutput]
                })
            ]
        });

        const testStage = pipeline.addStage(new PipelineAppStage(this, "PipelinetestStage", {
            stageName: 'test',
            env: { account: '558532633158', region: 'us-east-1' }
        }));

        

        //testStage.addPost(new ManualApprovalStep('Manaul approval step'));

    } //constructor

}