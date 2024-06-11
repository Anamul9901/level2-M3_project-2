import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlwares/validateRequest';
import { studentValdattion } from './student.zod.validation';

const router = express.Router(); // router ekta object return kore

// will call controller function

router.get('/', StudentControllers.getAllStudents);

router.patch(
  '/:id',
  validateRequest(studentValdattion.updateStudentValdattionSchema),
  StudentControllers.updatStudent,
);

router.delete('/:id', StudentControllers.deleteStudent);

router.get('/:id', StudentControllers.getSingleStudent);

export const StudentRoutes = router; // router nejee ekta object, tai object akare export korbo nah
