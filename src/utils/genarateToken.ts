import JWT from 'jsonwebtoken'
import {Response} from 'express'

const genarateToken = (res: Response, uid: string) => {
    const token = JWT.sign({ uid }, process.env.REFRESH_SECRET as string, { expiresIn: '1D' });
    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'strict'
    })
};

export default genarateToken;