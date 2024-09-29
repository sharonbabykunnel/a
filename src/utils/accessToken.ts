import JWT from 'jsonwebtoken'

export default (uid:string) => JWT.sign({ uid }, process.env.ACCESS_SECRET as string);