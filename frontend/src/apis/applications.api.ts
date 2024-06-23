import api from '@/lib/api';
import {
  ElectricityApplSchema,
  ElectricityApplication,
  ApplSummarySchema,
} from '@/schemas/application.schema';

const get = async (id: number) => {
  const response = await api.get(`/applications/${id}`);
  const result = ElectricityApplSchema.safeParse(response.data);
  console.log(result);
  return result.data;
};

const getAll = async () => {
  const response = await api.get(`/applications`);
  const results = ElectricityApplSchema.array().parse(response.data.results);
  return results;
};

const update = async (id: number, data: ElectricityApplication) => {
  const response = await api.put(`/applications/${id}`, data);
  return response.data;
};

const stats = async () => {
  const response = await api.get(`/applications/summary`);
  const results = ApplSummarySchema.array().parse(response.data);
  return results;
};

export default {
  get,
  getAll,
  stats,
  update,
};
