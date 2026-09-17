import { CourseLevel } from '../types/profile';

export const COURSE_CATALOG_MAP: Record<CourseLevel, string[]> = {
  ug_engg: [
    'B.E. Computer Science and Engineering',
    'B.Tech Artificial Intelligence and Data Science',
    'B.E. Electronics and Communication Engineering (ECE)',
    'B.E. Electrical and Electronics Engineering (EEE)',
    'B.E. Mechanical Engineering',
    'B.E. Civil Engineering',
    'B.Tech Information Technology (IT)',
    'B.Tech Biotechnology',
    'B.Tech Chemical Engineering',
    'B.E. Biomedical Engineering',
    'B.E. Automobile Engineering',
    'B.E. Aeronautical / Aerospace Engineering',
    'B.Tech Agricultural Engineering',
    'B.E. Mechatronics & Robotics Engineering',
    'B.Tech Cyber Security & Forensics',
    'B.Arch (Bachelor of Architecture)',
    'B.Plan (Bachelor of Planning)',
    'Other B.E. / B.Tech Degree'
  ],

  ug_med: [
    'MBBS (Bachelor of Medicine & Bachelor of Surgery)',
    'BDS (Bachelor of Dental Surgery)',
    'B.Sc Nursing',
    'BAMS (Bachelor of Ayurvedic Medicine & Surgery)',
    'BHMS (Bachelor of Homeopathic Medicine & Surgery)',
    'BSMS (Bachelor of Siddha Medicine & Surgery)',
    'BUMS (Bachelor of Unani Medicine & Surgery)',
    'B.Pharm (Bachelor of Pharmacy)',
    'BPT (Bachelor of Physiotherapy)',
    'B.Sc Medical Laboratory Technology (MLT)',
    'B.Sc Radiology & Imaging Technology',
    'B.Sc Operation Theatre & Anaesthesia Technology',
    'B.V.Sc & A.H. (Veterinary Science)',
    'B.Sc Physician Assistant',
    'BOT (Bachelor of Occupational Therapy)',
    'Other Medical & Allied Health Degree'
  ],

  ug_arts_sci: [
    'B.Sc Computer Science',
    'B.Sc Physics',
    'B.Sc Chemistry',
    'B.Sc Mathematics',
    'B.Sc Biotechnology / Microbiology',
    'B.Sc Agriculture (Honours)',
    'B.Sc Horticulture / Forestry',
    'B.Com (General Accounting & Finance)',
    'B.Com (Corporate Secretaryship)',
    'B.Com (Computer Applications)',
    'B.Com (Banking & Insurance)',
    'BBA (Bachelor of Business Administration)',
    'BCA (Bachelor of Computer Applications)',
    'B.A. English Literature',
    'B.A. Economics',
    'B.A. History / Political Science / Sociology',
    'B.A. Tamil / Hindi / Regional Languages',
    'B.Sc Catering & Hotel Management',
    'BSW (Bachelor of Social Work)',
    'B.A. LL.B. / B.Com LL.B. (Integrated 5-Year Law)',
    'Other Arts / Science / Commerce Degree'
  ],

  diploma: [
    'Diploma in Computer Engineering',
    'Diploma in Mechanical Engineering',
    'Diploma in Electrical & Electronics Engineering (DEEE)',
    'Diploma in Electronics & Communication Engineering (DECE)',
    'Diploma in Civil Engineering',
    'Diploma in Automobile Engineering',
    'Diploma in Pharmacy (D.Pharm)',
    'Diploma in Medical Lab Technology (DMLT)',
    'ITI - Electrician',
    'ITI - Fitter',
    'ITI - Machinist / Turner',
    'ITI - Mechanic Motor Vehicle',
    'ITI - Welder / Plumber',
    'Diploma in Tool & Die Making',
    'Other Polytechnic / ITI Diploma'
  ],

  school_11_12: [
    'Class 12 - Science (Maths, Physics, Chemistry, Biology)',
    'Class 12 - Computer Science (Maths, Physics, Chemistry, CS)',
    'Class 12 - Pure Science (Physics, Chemistry, Botany, Zoology)',
    'Class 12 - Commerce with Business Mathematics',
    'Class 12 - Commerce with Computer Applications',
    'Class 12 - Arts & Humanities (History, Economics, Politics)',
    'Class 12 - Vocational / Agricultural Stream',
    'Class 11 - Science Stream',
    'Class 11 - Commerce Stream',
    'Class 11 - Arts & Humanities Stream'
  ],

  school_9_10: [
    'Class 10 (SSLC / Matric / CBSE / ICSE Board)',
    'Class 9 (Secondary High School)'
  ],

  pg: [
    'M.E. / M.Tech Computer Science & Engineering',
    'M.E. / M.Tech VLSI Design & Embedded Systems',
    'M.E. / M.Tech Structural Engineering',
    'M.E. / M.Tech Power Systems / Thermal Engg',
    'M.Sc Physics / Chemistry / Mathematics',
    'M.Sc Computer Science / Data Science & AI',
    'M.Sc Biotechnology / Microbiology',
    'M.Sc Agriculture / Horticulture',
    'M.Com (Master of Commerce)',
    'MBA (Master of Business Administration)',
    'MCA (Master of Computer Applications)',
    'M.Pharm (Master of Pharmacy)',
    'M.A. English / Economics / Public Administration',
    'M.D. / M.S. (Postgraduate Medical Residency)',
    'M.P.T. (Master of Physiotherapy)',
    'LL.M. (Master of Laws)',
    'Other Postgraduate Master Degree'
  ],

  phd: [
    'Ph.D. in Engineering & Technology',
    'Ph.D. in Physical / Chemical / Mathematical Sciences',
    'Ph.D. in Biological & Life Sciences',
    'Ph.D. in Medical & Pharmaceutical Sciences',
    'Ph.D. in Arts, Humanities & Social Sciences',
    'Ph.D. in Management Studies & Commerce',
    'Post-Doctoral Fellowship (PDF)'
  ],

  ug_other: [
    'B.Des (Bachelor of Design)',
    'B.F.A. (Bachelor of Fine Arts)',
    'B.P.Ed (Bachelor of Physical Education)',
    'B.Ed (Bachelor of Education)',
    'B.Lib.I.Sc (Library & Information Science)',
    'Other Specialized Undergraduate Degree'
  ]
};

/**
 * Returns available courses for the selected education level
 */
export function getCoursesForLevel(level: CourseLevel): string[] {
  if (COURSE_CATALOG_MAP[level]) {
    return COURSE_CATALOG_MAP[level];
  }
  return [
    'General Undergraduate Degree',
    'General Postgraduate Degree',
    'Diploma Program',
    'High School Program'
  ];
}
