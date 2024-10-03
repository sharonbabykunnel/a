import express from 'express'
import * as taskRouter from '../controllers/task.controller'

const router = express.Router();

router.get('/getTasks/:id',taskRouter.getTasks);
router.get('/getCompletedTasks/:id',taskRouter.getCompletedTasks);
router.post('/postTask',taskRouter.postTask);
router.put('/editTask',taskRouter.editTask);
router.delete('/deleteTask/:id',taskRouter.deleteTask);
router.delete('/deleteCompletedTask/:id',taskRouter.deleteTask);
router.patch('/updateTask',taskRouter.updateTask);
router.get('/stats/:userId', taskRouter.getTaskStats);

export default router