import z from 'zod';

export const ElectricityApplSchema = z.object({
  id: z.number().readonly(),
  applicantName: z.string(),
  gender: z.enum(['male', 'female']),
  district: z.string(),
  state: z.string(),
  pincode: z.number().min(100000).max(999999),
  ownership: z.enum(['individual', 'joint']),
  govtIdType: z.string().readonly(),
  govtIdNumber: z.number().readonly(),
  category: z.string(),
  loadApplied: z.number().max(200, {
    message: 'load cannot exceed 200kV',
  }),
  dateSubmitted: z.coerce.date().readonly(),
  dateApproved: z.string().date().nullable(),
  lastModified: z.coerce.date(),
  status: z.enum(['pending', 'approved', 'rejected', 'connection released']),
  reviewerId: z.number(),
  reviewerName: z.string(),
  reviewComments: z.string(),
});

export const ApplSummarySchema = z.object({
  count: z.number(),
  status: z.enum(['pending', 'approved', 'rejected', 'connection released']),
  date: z.string(),
});

export type ElectricityApplication = z.infer<typeof ElectricityApplSchema>;
export type ApplSummary = z.infer<typeof ApplSummarySchema>;
