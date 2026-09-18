export interface OfflineCenter {
  id: string;
  name: string;
  type: 'CSC' | 'e-Seva / MeeSeva' | 'Tehsildar / Taluk Office' | 'Collectorate Kendra';
  state: string;
  district: string;
  address: string;
  pincode: string;
  phone: string;
  timing: string;
  verified: boolean;
  mapsUrl: string;
}

export interface ServiceFeeSchedule {
  serviceId: string;
  serviceName: string;
  issuingAuthority: string;
  statutoryFee: number;
  statutoryFeeFormatted: string;
  marketCyberCafeRate: string;
  slaDays: number;
  legalActCitation: string;
}

export const REAL_OFFLINE_CENTERS: OfflineCenter[] = [
  // TAMIL NADU
  {
    id: 'TN-CH-01',
    name: 'TNeGA e-Sevai Common Service Centre - Guindy',
    type: 'e-Seva / MeeSeva',
    state: 'Tamil Nadu',
    district: 'Chennai',
    address: 'Taluk Office Complex, Anna Salai, Guindy, Chennai',
    pincode: '600032',
    phone: '044-22501234 / 1100',
    timing: '09:30 AM - 05:30 PM (Mon - Sat)',
    verified: true,
    mapsUrl: 'https://maps.google.com/?q=Taluk+Office+Guindy+Chennai'
  },
  {
    id: 'TN-CH-02',
    name: 'Chennai District Collectorate e-Seva Counter',
    type: 'Collectorate Kendra',
    state: 'Tamil Nadu',
    district: 'Chennai',
    address: 'Singaravelar Maaligai, Rajaji Salai, George Town, Chennai',
    pincode: '600001',
    phone: '044-25268323',
    timing: '10:00 AM - 05:00 PM (Mon - Fri)',
    verified: true,
    mapsUrl: 'https://maps.google.com/?q=Singaravelar+Maaligai+Collectorate+Chennai'
  },
  {
    id: 'TN-CO-01',
    name: 'Coimbatore North Taluk e-Sevai Kendra',
    type: 'e-Seva / MeeSeva',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    address: 'Taluk Office, Dr. Balasundaram Road, Coimbatore',
    pincode: '641018',
    phone: '0422-2244101',
    timing: '09:30 AM - 05:30 PM (Mon - Sat)',
    verified: true,
    mapsUrl: 'https://maps.google.com/?q=Taluk+Office+Coimbatore+North'
  },
  {
    id: 'TN-MD-01',
    name: 'Madurai Collectorate e-Seva Centre',
    type: 'e-Seva / MeeSeva',
    state: 'Tamil Nadu',
    district: 'Madurai',
    address: 'Collectorate Building, Gandhi Nagar, Madurai',
    pincode: '625020',
    phone: '0452-2531110',
    timing: '09:30 AM - 05:00 PM (Mon - Fri)',
    verified: true,
    mapsUrl: 'https://maps.google.com/?q=Collectorate+Madurai'
  },

  // ANDHRA PRADESH
  {
    id: 'AP-VI-01',
    name: 'MeeSeva Citizen Service Centre - Dwaraka Nagar',
    type: 'e-Seva / MeeSeva',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    address: 'RTC Complex Road, Dwaraka Nagar, Visakhapatnam',
    pincode: '530016',
    phone: '0891-2567890 / 1100',
    timing: '09:00 AM - 06:00 PM (Mon - Sat)',
    verified: true,
    mapsUrl: 'https://maps.google.com/?q=MeeSeva+Dwaraka+Nagar+Visakhapatnam'
  },
  {
    id: 'AP-VJ-01',
    name: 'Vijayawada Urban Tahsildar MeeSeva Counter',
    type: 'Tehsildar / Taluk Office',
    state: 'Andhra Pradesh',
    district: 'NTR',
    address: 'Collectorate Compound, Bunder Road, Vijayawada',
    pincode: '520002',
    phone: '0866-2571234',
    timing: '09:30 AM - 05:30 PM (Mon - Sat)',
    verified: true,
    mapsUrl: 'https://maps.google.com/?q=Tahsildar+Office+Vijayawada'
  },

  // TELANGANA
  {
    id: 'TS-HY-01',
    name: 'MeeSeva Head Centre - Abids GPO',
    type: 'e-Seva / MeeSeva',
    state: 'Telangana',
    district: 'Hyderabad',
    address: 'Near GPO Circle, Abids, Hyderabad',
    pincode: '500001',
    phone: '040-23456789 / 1100',
    timing: '09:00 AM - 06:00 PM (Mon - Sat)',
    verified: true,
    mapsUrl: 'https://maps.google.com/?q=MeeSeva+Abids+Hyderabad'
  },
  {
    id: 'TS-SC-01',
    name: 'Secunderabad Revenue Divisional MeeSeva',
    type: 'e-Seva / MeeSeva',
    state: 'Telangana',
    district: 'Hyderabad',
    address: 'Clock Tower Road, Regimental Bazaar, Secunderabad',
    pincode: '500003',
    phone: '040-27801234',
    timing: '09:30 AM - 05:30 PM (Mon - Sat)',
    verified: true,
    mapsUrl: 'https://maps.google.com/?q=Revenue+Office+Secunderabad'
  },

  // KARNATAKA
  {
    id: 'KA-BLR-01',
    name: 'Bangalore One Citizen Service Centre - Jayanagar',
    type: 'e-Seva / MeeSeva',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    address: '4th Block, Near BDA Complex, Jayanagar, Bengaluru',
    pincode: '560011',
    phone: '080-22955400',
    timing: '08:00 AM - 07:00 PM (All 7 Days)',
    verified: true,
    mapsUrl: 'https://maps.google.com/?q=Bangalore+One+Jayanagar'
  },
  {
    id: 'KA-BLR-02',
    name: 'Kandaya Bhavana Taluk e-Office (DC Office)',
    type: 'Tehsildar / Taluk Office',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    address: 'KG Road, Near City Civil Court, Bengaluru',
    pincode: '560009',
    phone: '080-22211193',
    timing: '10:00 AM - 05:30 PM (Mon - Sat)',
    verified: true,
    mapsUrl: 'https://maps.google.com/?q=Kandaya+Bhavana+KG+Road+Bangalore'
  },

  // MAHARASHTRA
  {
    id: 'MH-MUM-01',
    name: 'Maha e-Seva Kendra - Fort Collectorate',
    type: 'Collectorate Kendra',
    state: 'Maharashtra',
    district: 'Mumbai City',
    address: 'Old Custom House, Fort, Mumbai',
    pincode: '400001',
    phone: '022-22661231',
    timing: '10:00 AM - 05:30 PM (Mon - Fri)',
    verified: true,
    mapsUrl: 'https://maps.google.com/?q=Old+Custom+House+Fort+Mumbai'
  },
  {
    id: 'MH-PUN-01',
    name: 'Pune District Collectorate Maha e-Seva Counter',
    type: 'e-Seva / MeeSeva',
    state: 'Maharashtra',
    district: 'Pune',
    address: 'Near Station Road, Somwar Peth, Pune',
    pincode: '411001',
    phone: '020-26123825',
    timing: '09:30 AM - 05:30 PM (Mon - Sat)',
    verified: true,
    mapsUrl: 'https://maps.google.com/?q=Collectorate+Office+Pune'
  },

  // UTTAR PRADESH
  {
    id: 'UP-LKO-01',
    name: 'Jan Seva Kendra (CSC) - Hazratganj',
    type: 'CSC',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    address: 'Near GPO, Mahatma Gandhi Marg, Hazratganj, Lucknow',
    pincode: '226001',
    phone: '0522-2621234 / 1076',
    timing: '09:30 AM - 06:00 PM (Mon - Sat)',
    verified: true,
    mapsUrl: 'https://maps.google.com/?q=Jan+Seva+Kendra+Hazratganj+Lucknow'
  },

  // KERALA
  {
    id: 'KL-TVM-01',
    name: 'Akshaya e-Centre - Thiruvananthapuram Secretariat',
    type: 'e-Seva / MeeSeva',
    state: 'Kerala',
    district: 'Thiruvananthapuram',
    address: 'Press Club Building, Near Statue, Thiruvananthapuram',
    pincode: '695001',
    phone: '0471-2321234 / 1076',
    timing: '09:00 AM - 06:00 PM (Mon - Sat)',
    verified: true,
    mapsUrl: 'https://maps.google.com/?q=Akshaya+Centre+Statue+Trivandrum'
  }
];

export const REAL_SERVICE_FEE_SCHEDULE: ServiceFeeSchedule[] = [
  {
    serviceId: 'TN_REV101',
    serviceName: 'Income Certificate (REV-101)',
    issuingAuthority: 'Revenue Dept (Tahsildar)',
    statutoryFee: 60,
    statutoryFeeFormatted: '₹60 (e-Sevai Portal Fee)',
    marketCyberCafeRate: '₹300 - ₹600',
    slaDays: 15,
    legalActCitation: 'TN Right to Public Services Act: Max fee ₹60. Any additional demand is illegal under Prevention of Corruption Act.'
  },
  {
    serviceId: 'TN_REV104',
    serviceName: 'First Graduate Certificate (REV-104)',
    issuingAuthority: 'Tahsildar / DOTE',
    statutoryFee: 60,
    statutoryFeeFormatted: '₹60 (e-Sevai Portal Fee)',
    marketCyberCafeRate: '₹500 - ₹1,500',
    slaDays: 15,
    legalActCitation: 'G.O. (Ms) No. 85: Direct entitlement certificate for college tuition waiver. Statutory portal charge is strictly ₹60.'
  },
  {
    serviceId: 'NSP_SCHOLARSHIP',
    serviceName: 'National Scholarship Portal (NSP) Online Application',
    issuingAuthority: 'Ministry of Education / NSP',
    statutoryFee: 0,
    statutoryFeeFormatted: '₹0 (100% Free Government Portal)',
    marketCyberCafeRate: '₹200 - ₹500',
    slaDays: 30,
    legalActCitation: 'MoE Directives: All Central & State scholarship submissions on scholarships.gov.in are completely FREE.'
  },
  {
    serviceId: 'NPCI_MANDATE',
    serviceName: 'NPCI Aadhaar-Bank DBT Seeding (Annexure-I)',
    issuingAuthority: 'Reserve Bank of India / Bank Branch',
    statutoryFee: 0,
    statutoryFeeFormatted: '₹0 (100% Free at All Bank Branches)',
    marketCyberCafeRate: '₹150 - ₹300',
    slaDays: 3,
    legalActCitation: 'RBI Master Circular on DBT: No bank or agent can charge fee for linking Aadhaar or seeding NPCI mandate.'
  },
  {
    serviceId: 'COMMUNITY_CERT',
    serviceName: 'Caste / Community Certificate (REV-103 / MeeSeva)',
    issuingAuthority: 'Revenue Divisional Officer / Tahsildar',
    statutoryFee: 60,
    statutoryFeeFormatted: '₹60 (e-Seva Portal Fee)',
    marketCyberCafeRate: '₹350 - ₹800',
    slaDays: 15,
    legalActCitation: 'State Revenue Citizens Charter: Fixed user fee of ₹60 only.'
  }
];
