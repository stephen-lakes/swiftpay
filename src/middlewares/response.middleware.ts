import { Request, Response, NextFunction } from "express";

interface CustomResponse extends Response {
  customResponse?: (statusCode: number, statusText: string, data?: any, message?: string) => Response;
}

const responseMiddleware = (req: Request, res: CustomResponse, next: NextFunction): void => {
  res.customResponse = (statusCode: number, statusText: string, data: any = null, message: string = ""): Response => {
    const response = {
      message,
      STATUS_CODE: statusCode,
      STATUS_TEXT: statusText,
    };

    if (data !== null) response.data = data;

    return res.status(statusCode).json(response);
  };
  next();
};

export default responseMiddleware;
