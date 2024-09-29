import JWT from 'jsonwebtoken'

export default (uid) => JWT.sign({ uid }, process.env.ACCESS_SECRET);