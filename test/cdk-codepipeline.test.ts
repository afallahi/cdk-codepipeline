import { handler } from "../lib/lambda/handler"

describe('Demo test suite', () => {
    test('handler should return status code 200', async () => {
        const res = await handler("", "")
        expect(res.statusCode).toBe(200);
    })
})