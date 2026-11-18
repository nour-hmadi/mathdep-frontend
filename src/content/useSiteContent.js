import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";
import { PROGRAMS, COURSES, CALENDAR, ADMISSIONS } from "./site";

// The pages' content from the database (GET /api/content, edited in the dashboard), shaped like
// site.js so the pages stay simple. Until it arrives, or if the server can't be reached,
// the texts in site.js are shown, so a page is never empty.
const FALLBACK_SETTINGS = {
  heroLead: "Pure and applied mathematics, from first-year calculus to research in analysis, algebra, statistics and "
    + "numerical computing. A small department where every student knows their professors.",
  studentsCount: "350+",
  aboutDepartment: "The Department of Mathematics teaches pure and applied mathematics, from first-year calculus and "
    + "linear algebra to master's-level analysis, statistics and numerical computing. Its teachers combine teaching with "
    + "research, and its graduates go on to teach, to study further, or to work with data in industry and finance.",
  aboutCommunity: "Beyond the classes, students meet in the Math Community: they post questions, share solutions and "
    + "organise the department's competitions and seminars. A teacher reviews every post before it appears, so the "
    + "space stays helpful and respectful.",
  phone: "+961 1 000 000",
  email: "mathdep@example.edu.lb",
  address: "Hadath campus, Faculty of Sciences, building B, floor 2",
  officeHours: "Monday to Thursday 9:00 to 13:00, Friday 9:00 to 12:00",
  instagram: "", facebook: "", youtube: "", linkedin: "",
  examRules: CALENDAR.rules,
};
export const FALLBACK = { PROGRAMS, COURSES, CALENDAR, ADMISSIONS, SETTINGS: FALLBACK_SETTINGS };

const unique = (values) => [...new Set(values)];

// { lists, settings } from the API -> the same shapes as site.js
export const shape = ({ lists, settings }) => {
  const courses = lists.course || [];
  const calendar = lists.calendar || [];
  const semesterNames = unique(["Fall semester", "Spring semester", ...calendar.map((item) => item.semester)])
    .filter((name) => calendar.some((item) => item.semester === name));
  return {
    PROGRAMS: (lists.program || []).map((program) => ({ ...program, learn: program.learn || [], careers: program.careers || [] })),
    COURSES: unique(courses.map((course) => course.year)).sort((a, b) => a - b).map((year) => ({
      year: `Year ${year}`,
      semesters: unique(courses.filter((course) => course.year === year).map((course) => course.semester)).sort((a, b) => a - b)
        .map((semester) => ({
          name: `Semester ${semester}`,
          courses: courses.filter((course) => course.year === year && course.semester === semester)
            .map((course) => [course.code, course.name, course.credits, course.pdf?.url]),
        })),
    })),
    CALENDAR: {
      semesters: semesterNames.map((name) => ({
        name,
        rows: calendar.filter((item) => item.semester === name).map((item) => [item.label, item.dates]),
      })),
      rules: settings.examRules || [],
    },
    ADMISSIONS: {
      requirements: (lists.requirement || []).map((item) => [item.text, item.appliesTo]),
      steps: (lists.step || []).map((item) => [item.title, item.text]),
      fees: (lists.fee || []).map((item) => [item.program, item.fee]),
    },
    SETTINGS: { ...FALLBACK_SETTINGS, ...settings },
  };
};

// One request shared by every page, asked again after a minute so the admin's edits show up
let request;
let requestedAt = 0;

export default function useSiteContent() {
  const [content, setContent] = useState(FALLBACK);
  useEffect(() => {
    if (!request || Date.now() - requestedAt > 60 * 1000) {
      requestedAt = Date.now();
      request = axios.get(`${API_URL}/api/content`).then((res) => shape(res.data)).catch(() => FALLBACK);
    }
    let active = true;
    request.then((value) => active && setContent(value));
    return () => { active = false; };
  }, []);
  return content;
}
