import express from 'express'
import { StudentControllers } from './student.controller'

const router = express.Router() // router ekta object return kore

// will call controller function

router.get('/', StudentControllers.getAllStudents)

router.get('/:studentId', StudentControllers.getSingleStudent)

export const StudentRoutes = router // router nejee ekta object, tai object akare export korbo nah
