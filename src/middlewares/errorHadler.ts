import { Response} from 'express'
interface Error  {
    success:boolean;
    status:number;
    message:string;
    errorCode ?: string | null;
}
const handleError = (res : Response, status: number, message: string, errorCode: string | null = null)=>{
    const errorResponse: Error = {
        success: false,
        status,
        message
    }

    if (errorCode) errorResponse.errorCode  = errorCode;

    return res.status(status).json(errorResponse)
}

export default handleError