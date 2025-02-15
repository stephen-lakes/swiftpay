import { Response } from "express";

export type ResponseType = {
  status: `success` | `error` | `failed`;
  message: string;
  code: number;
  data?: any; // Optional data property
};

export const Utility = {
  sendResponse: (
    res: Response,
    data?: ResponseType
  ) => {
    const response: ResponseType = {
      status: data?.status || `success`,
      message: data?.message || `success`,
      code: data?.code || 200,
      data: data?.data
    }

    res.status(response.code).json(response)
  },
  
};