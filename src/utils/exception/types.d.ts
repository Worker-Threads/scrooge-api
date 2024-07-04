export interface Exception {
  badRequest(message?: string): void;
  unauthorized(message?: string): void;
  forbidden(message?: string): void;
  notFound(message?: string): void;
}
