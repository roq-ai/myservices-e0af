import { VisitInterface } from 'interfaces/visit';
import { GetQueryInterface } from 'interfaces';

export interface ProcedureInterface {
  id?: string;
  name: string;
  description?: string;
  created_at?: any;
  updated_at?: any;
  visit?: VisitInterface[];

  _count?: {
    visit?: number;
  };
}

export interface ProcedureGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
}
