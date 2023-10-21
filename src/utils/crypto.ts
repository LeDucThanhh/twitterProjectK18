import { createHash } from 'crypto'
import { config } from 'dotenv'
config()
// viết 1 hàm nhận vào 1 chuỗi và mã hoá theo chuẩn SHA256 và trả về chuỗi mã hoá
// SHA256 : rất khó để decode ngược lại

function sha256(content: string) {
  return createHash('sha256').update(content).digest('hex')
}

// viết 1 hàm nhận vào password và mà hoá password đó
export function hashPassword(password: string) {
  return sha256(password + (process.env.PASSWORD_SECRET as string))
}
