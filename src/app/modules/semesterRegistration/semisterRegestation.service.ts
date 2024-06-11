import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemister.model';
import { TSemesterRegistration } from './semisterRegestation.interfact';
import { SemesterRegistraton } from './semisterRegestation.model';
import { RegistrationStatus } from './semisterRegestation.constant';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check if there any registered semester that is already 'UPCOMING' | 'ONGOING'
  const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistraton.findOne(
    {
      $or: [
        { status: RegistrationStatus.ONGOING },
        { status: RegistrationStatus.UPCOMINGL },
      ],
    },
  );

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} registered semester !`,
    );
  }

  //check if the semester is exist then ok
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found !',
    );
  }

  // check if the semester is already registered
  const isSemesterRegistrationExists = await SemesterRegistraton.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered !',
    );
  }

  const result = await SemesterRegistraton.create(payload);
  return result;
};

const getAllSemesterRegistrationIntoDB = async (
  query: Record<string, unknown>,
) => {
  const result = await SemesterRegistraton.find().populate('academicSemester');
  return result;
};

const getSingleSemesterRegistrationIntoDB = async (id: string) => {
  const result = await SemesterRegistraton.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  //check if the requested registered semester is exists
  const isSemesterRegisterationExists = await SemesterRegistraton.findById(id);
  if (!isSemesterRegisterationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found !');
  }

  //if the requested semester registration is ended, we will not update anything
  const curentSemesterStatus = isSemesterRegisterationExists?.status;
  const requestedStatus = payload?.status;

  if (curentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${curentSemesterStatus}`,
    );
  }

  // UPCOMING --> ONGOING --> ENDED ==> It's posiball
  // UPCOMING <-- ONGOING <-- ENDED ==> It's NOT posiball
  if (
    curentSemesterStatus === RegistrationStatus.UPCOMINGL &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directy chang status from ${curentSemesterStatus} to ${requestedStatus}`,
    );
  }
  if (
    curentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.ONGOING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directy chang status from ${curentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistraton.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationIntoDB,
  getSingleSemesterRegistrationIntoDB,
  updateSemesterRegistrationIntoDB,
};
