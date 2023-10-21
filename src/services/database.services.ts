import { MongoClient, ServerApiVersion, Db } from 'mongodb'
import { config } from 'dotenv'
config()
const uri = `mongodb+srv://${process.env.DB_USERSNAME}:${process.env.DB_PASSWORD}@piedteamk18f3.tmwpnbf.mongodb.net/?retryWrites=true&w=majority`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 }) //đổi cách xài
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('lỗi trong quá trình kết nối MongoDB', error)
      throw error
    }
  }
  get users() {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
