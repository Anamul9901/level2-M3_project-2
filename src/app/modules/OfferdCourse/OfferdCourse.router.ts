import express from 'express';
import { OfferedCourseController } from './OfferdCourse.controller';
import validateRequest from '../../middlwares/validateRequest';
import { OfferedCourseValidation } from './OfferdCourse.validation';

const router = express.Router();

router.get('/', OfferedCourseController.createOfferedCourse);

router.get('/:id', OfferedCourseController.createOfferedCourse);

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);

export const offeredCourseRoutes = router;
