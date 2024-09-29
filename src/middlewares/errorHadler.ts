const handleError = (res, status, message, errorCode = null)=>{
    const errorResponse = {
        success: false,
        status,
        message
    }

    if (errorCode) errorResponse.errorCode = errorCode;

    return res.status(status).json(errorResponse)
}

export default handleError