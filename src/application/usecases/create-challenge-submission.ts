import { Submission } from "../../domain/entities/submission";
import { StudentsRepository } from "../repositories/StudentsRepository";
import { ChallengesRepository } from '../repositories/ChallengesRepository';

type CreateChallengeSubmissionRequest = {
  studentId: string;
  challengeId: string;
};

export class CreateChallengeSubmission {
  constructor(
    private studentsRepository: StudentsRepository,
    private challengesRepository: ChallengesRepository
  ) {}

  async execute({ studentId, challengeId }: CreateChallengeSubmissionRequest): Promise<Submission> {

    const student = await this.studentsRepository.findById(studentId);
    if(!student) {
      throw new Error('Students does not exists.');
    }

    const challenge = await this.challengesRepository.findById(challengeId);
    if(!challenge) {
      throw new Error('Challenges does not exists.');
    }

    const submission = Submission.create({
      studentId,
      challengeId,
    });

    return submission;
  }
}