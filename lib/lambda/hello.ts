export async function handler(event: string, context: string) {
    return {
        body: 'Hello World! I am a Lambda function',
        statusCode: 200
    }
}