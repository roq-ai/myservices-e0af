import { CustomerInterface } from 'interfaces/customer';
import { GetQueryInterface } from 'interfaces';

export interface AddressInterface {
  id?: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  customer_id?: string;
  created_at?: any;
  updated_at?: any;

  customer?: CustomerInterface;
  _count?: {};
}

export interface AddressGetQueryInterface extends GetQueryInterface {
  id?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  customer_id?: string;
}
