import axios from 'axios';
import queryString from 'query-string';
import { ProcedureInterface, ProcedureGetQueryInterface } from 'interfaces/procedure';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getProcedures = async (
  query?: ProcedureGetQueryInterface,
): Promise<PaginatedInterface<ProcedureInterface>> => {
  const response = await axios.get('/api/procedures', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createProcedure = async (procedure: ProcedureInterface) => {
  const response = await axios.post('/api/procedures', procedure);
  return response.data;
};

export const updateProcedureById = async (id: string, procedure: ProcedureInterface) => {
  const response = await axios.put(`/api/procedures/${id}`, procedure);
  return response.data;
};

export const getProcedureById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/procedures/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteProcedureById = async (id: string) => {
  const response = await axios.delete(`/api/procedures/${id}`);
  return response.data;
};
