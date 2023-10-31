import { rejects } from 'assert'
import jwt from 'jsonwebtoken'
import { resolve } from 'path'
import { config } from 'dotenv'
import { error } from 'console'
import { decode } from 'punycode'
import { TokenPayload } from '~/models/requests/User.requests'
export const signToken = ({
  payload,
  //privateKey = process.env.JWT_SECRET as string,
  privateKey,
  options = { algorithm: 'HS256' }
}: {
  payload: object | string | Buffer
  privateKey: string
  options?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) reject(err)
      resolve(token as string)
    })
  })
}

export const verifyToken = ({
  token,
  //secretOrPublicKey = process.env.JWT_SECRET as string
  secretOrPublicKey
}: {
  token: string
  secretOrPublicKey: string
}) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    //TokenPayload
    jwt.verify(token, secretOrPublicKey, (error, decoded) => {
      if (error) throw reject(error)
      resolve(decoded as TokenPayload) //đổi thành TokenPayload
    })
  })
}
