import { Router } from 'express'
import { access } from 'fs'
import { register } from 'module'
import {
  emailVerifyTokenController,
  loginController,
  logoutController,
  registerController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'
const usersRouter = Router() //lưu những route liên quan đến user //khai báo Router
usersRouter.get('/login', loginValidator, wrapAsync(loginController))

usersRouter.post('/register', registerValidator, wrapAsync(registerController))

usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))

/*des: verify email
khi người dùng đăng kí họ sẽ nhận được mail có link dạng:

      https://localhost:3000?user/verify-email?token=<email_verify_token>

nếu mà em nhấp vào link thì sẽ tạo ra 1 req gửi lên email_verify_token lên server
server sẽ kiểm tra email_verify_token có hợp lệ hay không
thì từ đó decoded_email_verify_token lấy ra user_id
và vào user_id đó để update email_verify_token thành '', verify = 1 update_at

path: /user/verify-email
method: POST
body: {email_verify_token: string}
*/

usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapAsync(emailVerifyTokenController))

export default usersRouter

// vào trong file index.ts ta fix
// //middleware demo (nhạn 3 cái)
// usersRouter.use(
//   (req, res, next) => {
//     console.log('Time: ', Date.now())
//     next() //ok mày đc phép đi tiếp , ko có next thì ko đc xuống
//     // res.status(400).send('not allowed')
//     // console.log(12345) vẫn chạy
//   },
//   (req, res, next) => {
//     console.log('Time 2: ', Date.now())
//     next()
//   }
// )

//viết  1 route giúp get data /tweets
//controller ,router (nhận 2 cái)
// usersRouter.get('/login', loginValidator, (req, res) => {
//   res.json({ trả về đóng dữ liệu json cơ bản
//     data: [
//       { fname: 'Điệp', yob: 1999 },dữ liệu là object chứa data
//       { fname: 'Hùng', yob: 2003 },
//       { fname: 'Được', yob: 1994 }
//     ]
//   })
// }) cái này giống như 1 cái hàm zậy nên em viết zậy là chưa xài đc, mà ai là người xài cái hàm này thằng app là thằng xài bộ route này
