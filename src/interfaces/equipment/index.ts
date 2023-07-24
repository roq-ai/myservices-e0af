import { VisitInterface } from 'interfaces/visit';
import { CustomerInterface } from 'interfaces/customer';
import { GetQueryInterface } from 'interfaces';

export interface EquipmentInterface {
  id?: string;
  name: string;
  customer_id?: string;
  created_at?: any;
  updated_at?: any;
  visit?: VisitInterface[];
  customer?: CustomerInterface;
  _count?: {
    visit?: number;
  };
}

export interface EquipmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  customer_id?: string;
}
