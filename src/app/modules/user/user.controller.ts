

const createStudent = async (req: Request, res: Response) => {
    try {
      //creating a schema validation Zod
  
      //   const student = req.body.student
      const { student: studentData } = req.body
  
      //data validation using zod
      const zodParsedData = studentValdattionSchema.parse(studentData)
  
      //will call service fun to send this data
      const result = await StudentServices.createStudentIntoDB(zodParsedData)
  
      // send response
      res.status(200).json({
        success: true,
        message: 'Student is created successfully',
        data: result,
      })
    } catch (err: any) {
      // console.log(error)
      res.status(500).json({
        success: false,
        message: err.message || 'something went wrong',
        error: err,
      })
    }
  }
  