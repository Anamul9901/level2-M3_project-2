import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlwares/validateRequest';
import { studentValdattion } from './student.zod.validation';

const router = express.Router(); // router ekta object return kore

// will call controller function

router.get('/', StudentControllers.getAllStudents);

router.patch(
  '/:studentId',
  validateRequest(studentValdattion.updateStudentValdattionSchema),
  StudentControllers.updatStudent,
);

router.delete('/:studentId', StudentControllers.deleteStudent);

router.get('/:studentId', StudentControllers.getSingleStudent);

export const StudentRoutes = router; // router nejee ekta object, tai object akare export korbo nah
