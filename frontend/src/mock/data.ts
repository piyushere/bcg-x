import { ElectricityApplication } from '@/schemas/Application';

export const mockData: ElectricityApplication[] = [
  {
    id: 1,
    applicantName: 'Michael',
    gender: 'Male',
    district: 'North',
    state: 'Delhi',
    pincode: 110028,
    ownership: 'joint',
    govtIdType: 'aadhar',
    govtIdNumber: 6349499,
    category: 'commercial',
    loadApplied: '10',
    dateOfApplication: '18-3-21',
    dateOfApproval: '12-10-21',
    modifiedDate: '18-4-21',
    status: 'approved',
    reviewerID: '1460',
    reviewerName: 'hem chand',
    reviewerComments: 'installation pending',
  },
];

export default mockData;
