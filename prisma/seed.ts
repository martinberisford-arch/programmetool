import { PrismaClient, QuestionType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      passwordHash: await bcrypt.hash('ChangeMe123!', 10),
      role: 'ADMIN'
    }
  });

  const questions = [
    {
      text: 'Are you currently employed in a healthcare setting?',
      type: QuestionType.YESNO,
      optionsJson: JSON.stringify(['Yes', 'No']),
      order: 1
    },
    {
      text: 'Which level best describes your qualification?',
      type: QuestionType.SINGLE,
      optionsJson: JSON.stringify(['GCSE', 'A-Level', 'Undergraduate', 'Postgraduate']),
      order: 2
    },
    {
      text: 'Which topics interest you?',
      type: QuestionType.MULTI,
      optionsJson: JSON.stringify(['Mental Health', 'Nursing', 'Leadership', 'Digital Health']),
      order: 3,
      required: false
    }
  ];

  for (const question of questions) {
    await prisma.question.create({ data: question });
  }

  await prisma.programme.createMany({
    data: [
      {
        name: 'Nursing Associate Fast Track',
        slug: 'nursing-associate-fast-track',
        shortDesc: 'Accelerated route into nursing associate practice.',
        longDesc: 'A 12-month blended pathway for healthcare staff progressing to nursing associate roles.',
        link: 'https://example.org/programmes/nursing-associate',
        contactEmail: 'nursing@example.org',
        order: 1,
        logicJson: JSON.stringify({ operator: 'AND', conditions: [{ questionOrder: 1, op: 'EQUALS', value: 'Yes' }] })
      },
      {
        name: 'Digital Health Leadership',
        slug: 'digital-health-leadership',
        shortDesc: 'Build leadership confidence in modern digital care settings.',
        longDesc: 'Develop strategic and practical digital transformation leadership skills for healthcare.',
        link: 'https://example.org/programmes/digital-health',
        contactEmail: 'digital@example.org',
        order: 2,
        logicJson: JSON.stringify({ operator: 'OR', conditions: [{ questionOrder: 3, op: 'IN', value: ['Leadership', 'Digital Health'] }] })
      }
    ]
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
