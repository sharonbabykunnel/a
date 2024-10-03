import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import CustomError from '../helpers/customError';
import handleError from '../middlewares/errorHadler';
import * as taskServices from '../services/task.services';
import { io } from '..';

export const getTasks = asyncHandler(async(req:Request, res:Response) => {
    try {
        const id = req.params.id;

        const response = await taskServices.getTasks(id)
        res.status(200).json({success:true,data:response,message:'Success'})
    } catch (error) {
        console.log(error);
        if (error instanceof CustomError)
           handleError(res, error.statusCode, error.message, error.code);
        else handleError(
          res,
          500,
          "An unexpected errro occured. Please try again later."
        );
      }
})

export const getCompletedTasks = asyncHandler(async(req:Request, res:Response) => {
    try {
        const id = req.params.id;
    console.log(id)

        const response = await taskServices.getCompletedTasks(id)
        res.status(200).json({success:true,data:response,message:'Success'})
    } catch (error) {
        console.log(error);
        if (error instanceof CustomError)
           handleError(res, error.statusCode, error.message, error.code);
        else handleError(
          res,
          500,
          "An unexpected errro occured. Please try again later."
        );
      }
})

export const postTask = asyncHandler(async(req:Request, res:Response) => {
    try {
        const values = req.body;
        const response = await taskServices.postTask(values)
        io.to(values.user).emit('taskCreated',response)
        res.status(200).json({success:true,message:'Success'})
    } catch (error) {
        console.log(error);
        if (error instanceof CustomError)
           handleError(res, error.statusCode, error.message, error.code);
        else handleError(
          res,
          500,
          "An unexpected errro occured. Please try again later."
        );
      }
})

export const editTask = asyncHandler(async(req:Request, res:Response) => {
    try {
        const values = req.body;
        const response = await taskServices.editTask(values);
        io.to(values.user).emit('taskEdited', response);
        res.status(200).json({success:true,message:'Success'})
    } catch (error) {
        console.log(error);
        if (error instanceof CustomError)
           handleError(res, error.statusCode, error.message, error.code);
        else handleError(
          res,
          500,
          "An unexpected errro occured. Please try again later."
        );
      }
});

export const deleteTask = asyncHandler(async(req:Request, res:Response) => {
    try {
        const id = req.params.id;
        const response  = await taskServices.deleteTask(id);
        const userId = response.user.toString()
        io.to(userId).emit('taskDeleted', id);
        res.status(200).json({success:true,data:response,message:'Success'})
    } catch (error) {
        console.log(error);
        if (error instanceof CustomError)
           handleError(res, error.statusCode, error.message, error.code);
        else handleError(
          res,
          500,
          "An unexpected errro occured. Please try again later."
        );
      }
});

export const deleteCompletedTask = asyncHandler(async(req:Request, res:Response) => {
    try {
        const id = req.params.id;
        const response = await taskServices.deleteCompletedTask(id);
        const userId = response.user.toString()
        io.to(userId).emit('taskDeleted', id);
        res.status(200).json({success:true,data:response,message:'Success'})
    } catch (error) {
        console.log(error);
        if (error instanceof CustomError)
           handleError(res, error.statusCode, error.message, error.code);
        else handleError(
          res,
          500,
          "An unexpected errro occured. Please try again later."
        );
      }
});

export const updateTask = asyncHandler(async(req:Request, res:Response) => {
    try {
        const {id,completedOn} = req.body;
        const response = await taskServices.updateTask(id,completedOn);
        const userId = response.user.toString()
        io.to(userId).emit('taskUpdated', id);
        res.status(200).json({success:true,data:response,message:'Success'})
    } catch (error) {
        console.log(error);
        if (error instanceof CustomError)
           handleError(res, error.statusCode, error.message, error.code);
        else handleError(
          res,
          500,
          "An unexpected errro occured. Please try again later."
        );
      }
});

export const getTaskStats = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.userId;
        const stats = await taskServices.getTaskStatsService(userId);
        
        res.status(200).json({success:true,data:stats});
    } catch (error) {
        console.log(error);
        if (error instanceof CustomError) {
            handleError(res, error.statusCode, error.message, error.code);
        } else {
            handleError(res, 500, "An unexpected error occurred. Please try again later.");
        }
    }
});