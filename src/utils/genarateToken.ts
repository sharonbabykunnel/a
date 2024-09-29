import JWT from 'jsonwebtoken'

const genarateToken = (res, uid) => {
    const token = JWT.sign({ uid }, process.env.REFRESH_SECRET, { expiresIn: '1D' });
    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'strict'
    })
};

export default genarateToken;