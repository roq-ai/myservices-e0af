import axios from 'axios';
import queryString from 'query-string';
import { VisitInterface, VisitGetQueryInterface } from 'interfaces/visit';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getVisits = async (query?: VisitGetQueryInterface): Promise<PaginatedInterface<VisitInterface>> => {
  const response = await axios.get('/api/visits', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createVisit = async (visit: VisitInterface) => {
  const response = await axios.post('/api/visits', visit);
  return response.data;
};

export const updateVisitById = async (id: string, visit: VisitInterface) => {
  const response = await axios.put(`/api/visits/${id}`, visit);
  return response.data;
};

export const getVisitById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/visits/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVisitById = async (id: string) => {
  const response = await axios.delete(`/api/visits/${id}`);
  return response.data;
};
