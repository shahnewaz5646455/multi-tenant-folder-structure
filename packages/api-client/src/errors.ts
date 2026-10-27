// Blueprint, section C: `errors.ts` maps 4xx responses — specifically 422 field
// errors — into { field: message } so React Hook Form can show them per input.

export type FieldErrors = Record<string, string>;

export class ApiError extends Error {
  readonly status: number;
  readonly code: string | undefined;
  readonly fieldErrors: FieldErrors | undefined;

  constructor(status: number, message: string, code?: string, fieldErrors?: FieldErrors) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }

  static async fromResponse(res: Response): Promise<ApiError> {
    let body: unknown;
    try {
      body = await res.clone().json();
    } catch {
      body = undefined;
    }
    const b = (body ?? {}) as { message?: string; code?: string; errors?: FieldErrors };
    const fieldErrors = res.status === 422 ? b.errors : undefined;
    return new ApiError(res.status, b.message ?? res.statusText, b.code, fieldErrors);
  }
}

export function isApiError(err: unknown): err is ApiError {
  return err instanceof ApiError;
}
