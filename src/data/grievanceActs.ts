export interface StateGrievanceInfo {
  state: string;
  actName: string;
  actYear: number;
  statutorySlaDays: Record<string, number>; // SLA in days by certificate/service key
  grievancePortalName: string;
  grievancePortalUrl: string;
  helplineNumber: string;
  appellateAuthority: string;
  firstAppellateOfficer: string;
  penaltyPerDayToOfficer: string;
}

export const STATE_GRIEVANCE_DATA: Record<string, StateGrievanceInfo> = {
  'Telangana': {
    state: 'Telangana',
    actName: 'Telangana Right to Public Services Act',
    actYear: 2020,
    statutorySlaDays: {
      communityCertificate: 7,
      incomeCertificate: 7,
      nativityCertificate: 7,
      rationCard: 30,
      firstGraduateCertificate: 15,
      bonafideCertificate: 3
    },
    grievancePortalName: 'Telangana Prajavani / MeeSeva Grievance Redressal',
    grievancePortalUrl: 'https://prajavani.telangana.gov.in',
    helplineNumber: '1800 599 4455 / 040-23454071',
    appellateAuthority: 'Revenue Divisional Officer (RDO)',
    firstAppellateOfficer: 'Tahsildar / Joint Collector',
    penaltyPerDayToOfficer: '₹250 per day of default (Max ₹5,000)'
  },
  'Andhra Pradesh': {
    state: 'Andhra Pradesh',
    actName: 'Andhra Pradesh Right to Services Act',
    actYear: 2017,
    statutorySlaDays: {
      communityCertificate: 7,
      incomeCertificate: 7,
      nativityCertificate: 7,
      rationCard: 21,
      firstGraduateCertificate: 15,
      bonafideCertificate: 3
    },
    grievancePortalName: 'AP Spandana / Meekosam Citizen Grievance Portal',
    grievancePortalUrl: 'https://spandana.ap.gov.in',
    helplineNumber: '1902 (Toll Free Spandana Call Center)',
    appellateAuthority: 'Revenue Divisional Officer (RDO) / Sub-Collector',
    firstAppellateOfficer: 'Tahsildar / Village Revenue Officer',
    penaltyPerDayToOfficer: '₹250 per day of default'
  },
  'Tamil Nadu': {
    state: 'Tamil Nadu',
    actName: 'Tamil Nadu Right to Services Bill & Citizen Charter',
    actYear: 2021,
    statutorySlaDays: {
      communityCertificate: 15,
      incomeCertificate: 15,
      nativityCertificate: 15,
      firstGraduateCertificate: 15,
      rationCard: 30,
      govtSchool7_5Certificate: 3
    },
    grievancePortalName: 'Mudhalvarin Mugavari / CM Special Cell (cmcell.tn.gov.in)',
    grievancePortalUrl: 'https://cmcell.tn.gov.in',
    helplineNumber: '1100 (CM Helpline Toll-Free)',
    appellateAuthority: 'District Revenue Officer (DRO) / District Collector',
    firstAppellateOfficer: 'Zonal Deputy Tahsildar / Revenue Inspector',
    penaltyPerDayToOfficer: 'Disciplinary action under TN Civil Services Rules'
  },
  'Karnataka': {
    state: 'Karnataka',
    actName: 'Karnataka Guarantee of Services to Citizens Act (Sakala Act)',
    actYear: 2011,
    statutorySlaDays: {
      communityCertificate: 14,
      incomeCertificate: 14,
      nativityCertificate: 14,
      rationCard: 30,
      firstGraduateCertificate: 15,
      bonafideCertificate: 3
    },
    grievancePortalName: 'Karnataka Sakala Mission Citizen Portal',
    grievancePortalUrl: 'https://sakala.kar.nic.in',
    helplineNumber: '080-44554455',
    appellateAuthority: 'Assistant Commissioner (Revenue)',
    firstAppellateOfficer: 'Tahsildar',
    penaltyPerDayToOfficer: '₹20 per day (Max ₹500 directly deducted from officer salary)'
  },
  'Maharashtra': {
    state: 'Maharashtra',
    actName: 'Maharashtra Right to Public Services Act (RTS)',
    actYear: 2015,
    statutorySlaDays: {
      communityCertificate: 21,
      incomeCertificate: 15,
      nativityCertificate: 15,
      rationCard: 30,
      bonafideCertificate: 3
    },
    grievancePortalName: 'Aaple Sarkar Grievance Redressal System',
    grievancePortalUrl: 'https://grievances.maharashtra.gov.in',
    helplineNumber: '1800 120 8040 (Toll Free 24x7)',
    appellateAuthority: 'Sub-Divisional Officer (SDO)',
    firstAppellateOfficer: 'Tahsildar / Nayab Tahsildar',
    penaltyPerDayToOfficer: '₹250 to ₹5,000 on Designated Officer'
  },
  'Kerala': {
    state: 'Kerala',
    actName: 'Kerala Right to Service Act',
    actYear: 2012,
    statutorySlaDays: {
      communityCertificate: 5,
      incomeCertificate: 5,
      nativityCertificate: 5,
      rationCard: 15,
      bonafideCertificate: 2
    },
    grievancePortalName: 'CM’s Public Grievance Redressal Cell (CMO Kerala)',
    grievancePortalUrl: 'https://cmo.kerala.gov.in',
    helplineNumber: '1800 425 2100 / 0471-2333812',
    appellateAuthority: 'Sub-Collector / Revenue Divisional Officer',
    firstAppellateOfficer: 'Village Officer / Tahsildar',
    penaltyPerDayToOfficer: '₹250 per day (Max ₹5,000)'
  },
  'Uttar Pradesh': {
    state: 'Uttar Pradesh',
    actName: 'UP Janhit Guarantee Act',
    actYear: 2011,
    statutorySlaDays: {
      communityCertificate: 15,
      incomeCertificate: 15,
      nativityCertificate: 15,
      rationCard: 30,
      bonafideCertificate: 3
    },
    grievancePortalName: 'Integrated Grievance Redressal System (IGRS Jansunwai)',
    grievancePortalUrl: 'https://jansunwai.up.nic.in',
    helplineNumber: '1076 (CM Helpline Jansunwai)',
    appellateAuthority: 'Sub-Divisional Magistrate (SDM)',
    firstAppellateOfficer: 'Tehsildar',
    penaltyPerDayToOfficer: '₹250 per day (Max ₹5,000)'
  }
};

export const DEFAULT_GRIEVANCE_INFO: StateGrievanceInfo = {
  state: 'National / Central',
  actName: 'Right to Information Act (RTI Act) & Citizen Charter Framework',
  actYear: 2005,
  statutorySlaDays: {
    communityCertificate: 15,
    incomeCertificate: 15,
    nativityCertificate: 15,
    rationCard: 30,
    firstGraduateCertificate: 15,
    bonafideCertificate: 5
  },
  grievancePortalName: 'CPGRAMS Central Public Grievance Redress and Monitoring System',
  grievancePortalUrl: 'https://pgportal.gov.in',
  helplineNumber: '1800 11 0031 (National Consumer/Citizen Portal)',
  appellateAuthority: 'First Appellate Authority / District Collector',
  firstAppellateOfficer: 'Public Information Officer (PIO) / Tehsildar',
  penaltyPerDayToOfficer: '₹250 per day under Section 20(1) RTI Act 2005 (Max ₹25,000)'
};

export function getStateGrievanceInfo(stateName?: string): StateGrievanceInfo {
  if (!stateName) return DEFAULT_GRIEVANCE_INFO;
  return STATE_GRIEVANCE_DATA[stateName] || DEFAULT_GRIEVANCE_INFO;
}
