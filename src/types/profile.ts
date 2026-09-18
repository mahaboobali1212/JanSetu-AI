export type Gender = 'female' | 'male' | 'transgender';

export type Category = 'SC' | 'ST' | 'OBC' | 'MBC' | 'EWS' | 'General' | 'Minority';

export type CourseLevel = 
  | 'school_9_10' 
  | 'school_11_12' 
  | 'diploma' 
  | 'ug_engg' 
  | 'ug_med' 
  | 'ug_arts_sci' 
  | 'ug_other' 
  | 'pg' 
  | 'phd';

export type SchoolingType = 'govt_school' | 'govt_aided' | 'private';

export interface CitizenProfile {
  fullName: string;
  aadhaarLast4: string;            // Only last 4 digits (e.g. "4829")
  stateOfDomicile: string;
  district: string;
  gender: Gender;
  category: Category;
  stateCategoryCode?: string;      // State-specific subcategory (e.g. "BC-E", "MBC", "2A", "VJ/DT-A", "EZ")
  admissionQuota?: string;         // e.g. "convenor_quota", "govt_school_7_5", "management_quota"
  annualIncome: number;
  courseLevel: CourseLevel;
  courseName: string;
  marksPercentage: number;
  schoolingType: SchoolingType;
  isFirstGraduate: boolean;
  isSpeciallyAbled: boolean;
  isSingleGirlChild: boolean;
  isOrphan: boolean;
  bankName: string;
  bankAccountNumber: string;
  bankIfsc: string;
}

export const INDIAN_STATES = [
  'All-India Central',
  'Tamil Nadu',
  'Telangana',
  'Andhra Pradesh',
  'Kerala',
  'Karnataka',
  'Maharashtra',
  'Uttar Pradesh',
  'Bihar',
  'West Bengal',
  'Rajasthan',
  'Madhya Pradesh',
  'Gujarat',
  'Delhi',
  'Punjab',
  'Odisha',
  'Assam',
  'Haryana',
  'Jharkhand',
  'Chhattisgarh',
  'Uttarakhand',
  'Himachal Pradesh',
  'Jammu & Kashmir',
  'Goa',
  'Tripura',
  'Puducherry'
];

export const DEFAULT_PROFILE: CitizenProfile = {
  fullName: 'Priya Sundaram',
  aadhaarLast4: '4829',
  stateOfDomicile: 'Tamil Nadu',
  district: 'Madurai',
  gender: 'female',
  category: 'MBC',
  stateCategoryCode: 'MBC',
  admissionQuota: 'convenor_quota',
  annualIncome: 180000,
  courseLevel: 'ug_engg',
  courseName: 'B.E. Computer Science',
  marksPercentage: 88.5,
  schoolingType: 'govt_school',
  isFirstGraduate: true,
  isSpeciallyAbled: false,
  isSingleGirlChild: true,
  isOrphan: false,
  bankName: 'State Bank of India',
  bankAccountNumber: '39485729104',
  bankIfsc: 'SBIN0001234'
};
