import { CreateChallengeSubmission } from './create-challenge-submission'
import { InMemoryStudentsRepository } from '../../../tests/repositories/in-memory-students-repository';
import { InMemoryChallengesRepository } from '../../../tests/repositories/in-memory-challenges-repository';
import { Student } from '../../domain/entities/student';
import { Challenge } from '../../domain/entities/challenge';

describe('Create challenge submission use case', () => {
    it('should be able to create a new challenge submission', () => {
        const studentsRepository = new InMemoryStudentsRepository();
        const challengesRepository = new InMemoryChallengesRepository();

        const student = Student.create({
            name: 'Diego',
            email: 'doe@teste.com.br'
        });

        const challenge = Challenge.create({
            title: 'challenge title',
            instructionUrl: 'http://google.com.br'
        });

        studentsRepository.items.push(student);
        challengesRepository.items.push(challenge);

       

        const sut = new CreateChallengeSubmission(
            studentsRepository,
            challengesRepository
        );

        const response = sut.execute({
            studentId: student.id,
            challengeId: challenge.id
        })

        expect(response).toBeTruthy();
    })
})