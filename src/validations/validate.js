import { ResponseError } from "../errors/responseError.js";

export default function validate(schema, request) {
    const result = schema.safeParse(request);

    if (!result.success) {
        const massage = result.error.issues.map((e) => e.message).join(", ");
        throw new ResponseError(400, massage);
    }

    return result.data;
}