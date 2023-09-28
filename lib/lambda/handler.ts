export async function handler(event: string, context: string) {
    console.log('stage name: '+process.env.stage);

    return {
        body: 'Hello from a Lambda function',
        statusCode: 200
    }
}