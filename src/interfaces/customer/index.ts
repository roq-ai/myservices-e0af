import { AddressInterface } from 'interfaces/address';
import { EquipmentInterface } from 'interfaces/equipment';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CustomerInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  address?: AddressInterface[];
  equipment?: EquipmentInterface[];
  user?: UserInterface;
  _count?: {
    address?: number;
    equipment?: number;
  };
}

export interface CustomerGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
