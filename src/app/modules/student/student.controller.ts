import { Request, Response } from 'express'
import { StudentServices } from './student.service'
// import studentVAlidationSchema from './student.validation';

// createStudents akn user theke hobe


const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()

    res.status(200).json({
      success: true,
      message: 'Students are retrived successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    // const studentId = req.params.studentId
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)

    res.status(200).json({
      success: true,
      message: 'Student is retrived successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
}
