import express from 'express';
import { UserControllers } from './user.controller';
import { studentValdattion } from '../student/student.zod.validation';
import validateRequest from '../../middlwares/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValdattion.createStudentValdattionSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
