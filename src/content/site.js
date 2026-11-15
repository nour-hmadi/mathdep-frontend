// Everything the site says about itself in one place: the menu and the academic information pages.
// Change the text here; the components only lay it out. All of it is fictional demo content.

export const NAVIGATION = [
  { title: "Home", path: "/" },
  {
    title: "About",
    path: "/aboutus",
    items: [
      { name: "The department", path: "/aboutus", note: "Who we are and what we teach" },
      { name: "Teaching staff", path: "/academics/teachingstaff", note: "Professors and lecturers" },
      { name: "Contact", path: "/contactus", note: "Office, phone, email, hours" },
    ],
  },
  {
    title: "Academics",
    path: "/academics",
    items: [
      { name: "Programs", path: "/academics/programs", note: "Bachelor's and master's degrees" },
      { name: "Courses", path: "/academics/courses", note: "Course list by year and semester" },
      { name: "Calendar and exams", path: "/academics/calendar", note: "Semester dates and exam periods" },
      { name: "Admissions", path: "/academics/admissions", note: "Requirements, steps and deadlines" },
    ],
  },
  {
    title: "Research",
    path: "/researchs",
    items: [
      { name: "Research projects", path: "/researchs", note: "What the department is working on" },
      { name: "Seminars and events", path: "/news&events", note: "Talks, open days, competitions" },
    ],
  },
  {
    title: "Community",
    path: "/mathcommunity",
    items: [
      { name: "Math Community", path: "/mathcommunity", note: "Questions and answers between students" },
      { name: "News and events", path: "/news&events", note: "Announcements from the department" },
      { name: "Gallery", path: "/gallery", note: "Pictures from campus life" },
    ],
  },
  { title: "Contact", path: "/contactus" },
];

export const PROGRAMS = [
  {
    name: "Bachelor of Science in Mathematics",
    level: "Bachelor's", years: 3, credits: 180, language: "French and English",
    summary: "A solid base in analysis, algebra, geometry and probability, with programming and statistics from the "
      + "first year. The third year adds options in applied mathematics, actuarial science or teaching.",
    learn: ["Real and complex analysis, linear and abstract algebra", "Probability, statistics and data analysis",
      "Numerical methods and programming in Python", "Mathematical writing and proof"],
    careers: ["Teaching (with the teaching diploma)", "Data analysis and actuarial work",
      "Master's studies in mathematics, statistics or data science"],
  },
  {
    name: "Master of Science in Pure Mathematics",
    level: "Master's", years: 2, credits: 120, language: "French and English",
    summary: "Advanced courses in algebra, analysis, topology and geometry, followed by a research thesis "
      + "supervised by a member of the department. The usual path to a PhD.",
    learn: ["Functional analysis and partial differential equations", "Algebraic structures and number theory",
      "Differential geometry and topology", "A research thesis in the second year"],
    careers: ["PhD studies in Lebanon or abroad", "University teaching", "Research positions"],
  },
  {
    name: "Master of Science in Applied Mathematics and Statistics",
    level: "Master's", years: 2, credits: 120, language: "English",
    summary: "Modelling, statistics and computation for industry and finance: stochastic processes, optimization, "
      + "machine learning and a four-month internship or applied project.",
    learn: ["Stochastic processes and time series", "Optimization and operations research",
      "Statistical learning and machine learning", "Scientific computing and simulation"],
    careers: ["Data scientist or quantitative analyst", "Actuary and risk analyst", "Research and development in industry"],
  },
  {
    name: "Teaching Diploma in Mathematics",
    level: "Diploma", years: 1, credits: 30, language: "French and Arabic",
    summary: "For bachelor's graduates who want to teach mathematics in secondary schools: didactics of mathematics, "
      + "classroom practice and a supervised teaching placement.",
    learn: ["Didactics of mathematics", "Curriculum and assessment", "A supervised placement in a school"],
    careers: ["Secondary school mathematics teacher"],
  },
];

export const COURSES = [
  {
    year: "Year 1", semesters: [
      { name: "Semester 1", courses: [["MATH 101", "Analysis I", 6], ["MATH 102", "Linear Algebra I", 6],
        ["MATH 103", "Logic and Set Theory", 4], ["CSCI 101", "Programming in Python", 4], ["LANG 101", "Academic English", 2]] },
      { name: "Semester 2", courses: [["MATH 111", "Analysis II", 6], ["MATH 112", "Linear Algebra II", 6],
        ["MATH 113", "Discrete Mathematics", 4], ["STAT 101", "Descriptive Statistics", 4], ["PHYS 101", "Mechanics", 4]] },
    ],
  },
  {
    year: "Year 2", semesters: [
      { name: "Semester 3", courses: [["MATH 201", "Analysis III (several variables)", 6], ["MATH 202", "Algebra: groups and rings", 6],
        ["MATH 203", "Differential Equations", 4], ["STAT 201", "Probability", 4], ["CSCI 201", "Numerical Methods", 4]] },
      { name: "Semester 4", courses: [["MATH 211", "Measure and Integration", 6], ["MATH 212", "Geometry", 4],
        ["MATH 213", "Topology", 4], ["STAT 211", "Statistical Inference", 4], ["MATH 214", "Mathematical Writing", 2]] },
    ],
  },
  {
    year: "Year 3", semesters: [
      { name: "Semester 5", courses: [["MATH 301", "Complex Analysis", 6], ["MATH 302", "Galois Theory", 4],
        ["MATH 303", "Partial Differential Equations", 4], ["STAT 301", "Stochastic Processes", 4], ["MATH 304", "Optimization", 4]] },
      { name: "Semester 6", courses: [["MATH 311", "Functional Analysis", 6], ["MATH 312", "Number Theory", 4],
        ["STAT 311", "Data Analysis and Machine Learning", 4], ["MATH 313", "History of Mathematics", 2], ["MATH 390", "Final-year Project", 6]] },
    ],
  },
];

export const CALENDAR = {
  semesters: [
    { name: "Fall semester", rows: [["Registration", "1 to 12 September"], ["Classes begin", "15 September"],
      ["Midterm exams", "3 to 8 November"], ["Last day of classes", "19 December"], ["Final exams", "5 to 17 January"]] },
    { name: "Spring semester", rows: [["Registration", "26 January to 6 February"], ["Classes begin", "9 February"],
      ["Midterm exams", "30 March to 4 April"], ["Last day of classes", "22 May"], ["Final exams", "1 to 13 June"],
      ["Make-up exams", "6 to 11 July"]] },
  ],
  rules: [
    "Bring your student card to every exam; it is checked at the door.",
    "Calculators are allowed only when the course sheet says so. Phones stay in your bag.",
    "Exam rooms are posted on this page and at the secretariat one week before each exam period.",
    "A student who misses an exam with a medical certificate may sit the make-up exam in July.",
  ],
};

export const ADMISSIONS = {
  requirements: [
    ["Lebanese Baccalaureate (General Sciences or Life Sciences) or an equivalent recognised by the Ministry of Education",
      "Bachelor's programs"],
    ["A bachelor's degree in mathematics or a related field with an average of 12/20 or above", "Master's programs"],
    ["A bachelor's degree in mathematics", "Teaching diploma"],
    ["French or English at B2 level", "All programs"],
  ],
  steps: [
    ["Apply online", "Fill in the application form during the registration period (see the calendar)."],
    ["Upload your documents", "Baccalaureate or degree certificate, transcripts, identity card and a photo."],
    ["Entrance exam (bachelor's only)", "A two-hour written exam in mathematics, held the first week of September."],
    ["Interview (master's only)", "A short interview with two professors about your background and goals."],
    ["Results and registration", "Results are published within two weeks; admitted students register at the secretariat."],
  ],
  fees: [["Bachelor's programs", "Public university fees, set each year by the Ministry"], ["Master's programs", "Public university fees plus laboratory fees"],
    ["Teaching diploma", "Public university fees"]],
};
