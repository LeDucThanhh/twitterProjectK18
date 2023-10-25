import { NextFunction, Request, Response } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'

// đây là nơi mà tất cả lỗi trên hệ thống sẽ dồn về

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('error handler tổng')
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(omit(err, ['status']))
}
