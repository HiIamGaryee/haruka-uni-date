import { PrismaClient, Gender } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
const DEMO_PASSWORD = 'demo1234'

type SeedUser = {
  email: string
  name: string
  age: number
  gender: Gender
  interestedGender: Gender[]
  university: string
  faculty: string
  course: string
  year: string
  personalityType: string
  datingGoal: string
  comfortLevel: string
  relationshipPace: string
  loveLanguage: string
  hobbies: string[]
  musicTaste: string[]
  foodPreference: string
  budgetPreference: string
  socialBattery: string
  preferredMeetingStyle: string
  availability: { day: string; timeSlot: string }[]
  dealBreakers: string[]
  redFlags: string[]
  greenFlags: string[]
  location: string
}

const users: SeedUser[] = [
  {
    email: 'haruka@sunway.edu',
    name: 'Haruka Tan',
    age: 21,
    gender: 'FEMALE',
    interestedGender: ['MALE', 'NON_BINARY'],
    university: 'Sunway University',
    faculty: 'School of Engineering and Technology',
    course: 'Software Engineering',
    year: 'Year 2',
    personalityType: 'Playful Introvert',
    datingGoal: 'Slow dating, start as friends',
    comfortLevel: 'Public places only',
    relationshipPace: 'Slow burn',
    loveLanguage: 'Quality Time',
    hobbies: ['UI Design', 'Anime', 'Café Hopping', 'Hackathons', 'Indie Games'],
    musicTaste: ['Indie', 'Lo-fi'],
    foodPreference: 'Dessert café',
    budgetPreference: 'RM25–RM45',
    socialBattery: 'Medium',
    preferredMeetingStyle: 'Walking distance café',
    availability: [
      { day: 'Friday', timeSlot: 'Evening' },
      { day: 'Saturday', timeSlot: 'Afternoon' },
    ],
    dealBreakers: ['Pushy texting'],
    redFlags: ['Last-minute private meetup'],
    greenFlags: ['Funny', 'Emotionally mature'],
    location: 'Bandar Sunway',
  },
  {
    email: 'kai@sunway.edu',
    name: 'Kai Lim',
    age: 22,
    gender: 'MALE',
    interestedGender: ['FEMALE', 'NON_BINARY'],
    university: 'Sunway University',
    faculty: 'School of Engineering and Technology',
    course: 'Computer Science',
    year: 'Year 3',
    personalityType: 'Calm Builder',
    datingGoal: 'Slow dating, start as friends',
    comfortLevel: 'Public places only',
    relationshipPace: 'Slow burn',
    loveLanguage: 'Quality Time',
    hobbies: ['Gaming', 'Café Hopping', 'UI Design', 'Football'],
    musicTaste: ['Lo-fi', 'Indie'],
    foodPreference: 'Café brunch',
    budgetPreference: 'RM30–RM50',
    socialBattery: 'Medium',
    preferredMeetingStyle: 'Public café',
    availability: [
      { day: 'Saturday', timeSlot: 'Afternoon' },
      { day: 'Sunday', timeSlot: 'Evening' },
    ],
    dealBreakers: ['Ghosting'],
    redFlags: ['Rude to staff'],
    greenFlags: ['Kind', 'Funny'],
    location: 'Bandar Sunway',
  },
  {
    email: 'mei@monash.edu',
    name: 'Mei Wong',
    age: 22,
    gender: 'FEMALE',
    interestedGender: ['MALE'],
    university: 'Monash University Malaysia',
    faculty: 'School of Business',
    course: 'Business Analytics',
    year: 'Year 3',
    personalityType: 'Ambitious Social Butterfly',
    datingGoal: 'Serious but no rush',
    comfortLevel: 'Group hangout first',
    relationshipPace: 'Steady',
    loveLanguage: 'Words of Affirmation',
    hobbies: ['Matcha', 'Startups', 'Volleyball', 'Productivity Apps', 'Café Reviews'],
    musicTaste: ['Pop', 'R&B'],
    foodPreference: 'Matcha café',
    budgetPreference: 'RM35–RM60',
    socialBattery: 'High',
    preferredMeetingStyle: 'Public café',
    availability: [
      { day: 'Saturday', timeSlot: 'Brunch' },
      { day: 'Sunday', timeSlot: 'Evening' },
    ],
    dealBreakers: ['No ambition'],
    redFlags: ['Rude to service staff'],
    greenFlags: ['Driven', 'Kind'],
    location: 'Subang Jaya',
  },
  {
    email: 'yuna@taylors.edu',
    name: 'Yuna Lim',
    age: 20,
    gender: 'FEMALE',
    interestedGender: ['MALE', 'FEMALE'],
    university: "Taylor's University",
    faculty: 'School of Liberal Arts and Sciences',
    course: 'Psychology',
    year: 'Year 2',
    personalityType: 'Soft-Spoken Observer',
    datingGoal: 'Meaningful connection',
    comfortLevel: 'Text first, meet later',
    relationshipPace: 'Slow',
    loveLanguage: 'Acts of Service',
    hobbies: ['Books', 'Cats', 'Indie Music', 'Journaling', 'Night Walks'],
    musicTaste: ['Indie', 'Acoustic'],
    foodPreference: 'Quiet dessert spot',
    budgetPreference: 'RM20–RM40',
    socialBattery: 'Low',
    preferredMeetingStyle: 'Quiet bookstore café',
    availability: [
      { day: 'Wednesday', timeSlot: 'Afternoon' },
      { day: 'Sunday', timeSlot: 'Morning' },
    ],
    dealBreakers: ['Love bombing'],
    redFlags: ['Emotional pressure'],
    greenFlags: ['Patient', 'Gentle'],
    location: 'Lakeside Campus',
  },
  {
    email: 'aiden@apu.edu',
    name: 'Aiden Lee',
    age: 23,
    gender: 'MALE',
    interestedGender: ['FEMALE'],
    university: 'Asia Pacific University (APU)',
    faculty: 'School of Computing',
    course: 'Cybersecurity',
    year: 'Final Year',
    personalityType: 'Quiet Strategist',
    datingGoal: 'Friends to relationship',
    comfortLevel: 'Public places only',
    relationshipPace: 'Slow burn',
    loveLanguage: 'Quality Time',
    hobbies: ['Capture The Flag', 'Coffee', 'Gym', 'Tech Podcasts', 'Board Games'],
    musicTaste: ['Electronic', 'Podcasts'],
    foodPreference: 'Coffee shop',
    budgetPreference: 'RM30–RM50',
    socialBattery: 'Medium',
    preferredMeetingStyle: 'Board game café',
    availability: [
      { day: 'Friday', timeSlot: 'Night' },
      { day: 'Sunday', timeSlot: 'Afternoon' },
    ],
    dealBreakers: ['Inconsistent communication'],
    redFlags: ['Disrespecting boundaries'],
    greenFlags: ['Curious', 'Loyal'],
    location: 'Bukit Jalil',
  },
  {
    email: 'chloe@inti.edu',
    name: 'Chloe Ng',
    age: 21,
    gender: 'FEMALE',
    interestedGender: ['MALE'],
    university: 'INTI International University',
    faculty: 'Faculty of Business and Communications',
    course: 'Mass Communication',
    year: 'Year 2',
    personalityType: 'Creative Extrovert',
    datingGoal: 'Fun dates, maybe serious',
    comfortLevel: 'Casual public meetup',
    relationshipPace: 'Fast',
    loveLanguage: 'Physical Touch',
    hobbies: ['Content Creation', 'Fashion', 'K-pop', 'Food Hunting', 'Photography'],
    musicTaste: ['K-pop', 'Pop'],
    foodPreference: 'Food market',
    budgetPreference: 'RM30–RM70',
    socialBattery: 'High',
    preferredMeetingStyle: 'Crowded food spots',
    availability: [
      { day: 'Saturday', timeSlot: 'Night' },
      { day: 'Monday', timeSlot: 'Afternoon' },
    ],
    dealBreakers: ['Controlling behavior'],
    redFlags: ['Boring replies'],
    greenFlags: ['Confident', 'Funny'],
    location: 'Nilai',
  },
]

async function main() {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10)
  await prisma.systemLog.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.conversationStarter.deleteMany()
  await prisma.datePlan.deleteMany()
  await prisma.soulmateSession.deleteMany()
  await prisma.match.deleteMany()
  await prisma.report.deleteMany()
  await prisma.blockedUser.deleteMany()
  await prisma.availability.deleteMany()
  await prisma.interest.deleteMany()
  await prisma.user.deleteMany()

  for (const u of users) {
    await prisma.user.create({
      data: {
        email: u.email,
        passwordHash,
        profileComplete: true,
        name: u.name,
        age: u.age,
        gender: u.gender,
        interestedGender: u.interestedGender,
        university: u.university,
        faculty: u.faculty,
        course: u.course,
        year: u.year,
        personalityType: u.personalityType,
        datingGoal: u.datingGoal,
        comfortLevel: u.comfortLevel,
        relationshipPace: u.relationshipPace,
        loveLanguage: u.loveLanguage,
        musicTaste: u.musicTaste,
        foodPreference: u.foodPreference,
        budgetPreference: u.budgetPreference,
        cgpa: '3.50 – 3.74',
        languages: ['English', 'Malay'],
        outdoorPerson: 'Sometimes',
        allergies: 'None',
        socialBattery: u.socialBattery,
        preferredMeetingStyle: u.preferredMeetingStyle,
        dealBreakers: u.dealBreakers,
        redFlags: u.redFlags,
        greenFlags: u.greenFlags,
        location: u.location,
        role: 'USER',
        status: 'WAITING_FOR_MATCH',
        interests: { create: u.hobbies.map((label) => ({ label })) },
        availability: { create: u.availability },
      },
    })
  }

  await prisma.report.create({
    data: {
      reporterId: (await prisma.user.findFirst({ where: { name: 'Haruka Tan' } }))!.id,
      reportedId: (await prisma.user.findFirst({ where: { name: 'Chloe Ng' } }))!.id,
      reason: 'Spam messages in demo report',
      severity: 'LOW',
      status: 'PENDING',
    },
  })

  console.log(`Seeded ${users.length} users (password: ${DEMO_PASSWORD})`)
  console.log('Demo logins: haruka@sunway.edu, kai@sunway.edu, mei@monash.edu, aiden@apu.edu')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
