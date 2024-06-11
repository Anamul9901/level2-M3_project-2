import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseController } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);

router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourses,
);

router.get('/:id', CourseController.getSingleCourses);

router.get('/', CourseController.getAllCourses);

router.delete('/:id', CourseController.deleteCourses);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.assignFacultiesWithCourseValidatonSchema),
  CourseController.assignFacultiesWithCourse,
);

export const CourseRoutes = router;
