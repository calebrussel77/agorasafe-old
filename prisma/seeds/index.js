const { PrismaClient } = require('@prisma/client');
const { skills } = require('../data/skills.js');

const prisma = new PrismaClient();

const importData = async () => {
  try {
    await prisma.skill.deleteMany();

    await prisma.skill.createMany({
      data: skills,
    });
    console.log('Data imported !');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await prisma.skill.deleteMany();
    console.log('Data destroyed !');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const load = async () => {
  try {
    //check the flag of the script and
    //run function according to the flag
    if (process.argv[2] === '-d') {
      destroyData();
    } else {
      importData();
    }
  } catch (e) {
    console.log(e);
  } finally {
    await prisma.$disconnect();
  }
};

load();
