import { Request, Response, NextFunction } from 'express'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'

export const loginController = async (req: Request, res: Response) => {
  // nếu nó vào được đây thì đã đăng nhập thành công

  const { user }: any = req // lấy user từ req
  const user_id = user._id // lấy _id từ user -> ObjectId
  // server phải tạo ra access_token và refresh_token đưa cho cilent

  const result = await usersService.login(user_id.toString())
  //login nhận vào user_id:string, nhưng user_id ta có
  //là objectid trên mongodb, nên phải toString()
  //trả ra kết quả, thiếu cái này là sending hoài luôn
  return res.json({
    message: 'Login Successfully',
    result
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await usersService.register(req.body) // thay luôn
  return res.status(400).json({
    message: 'Register Successfully',
    result
  })
}
