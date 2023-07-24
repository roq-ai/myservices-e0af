import { EquipmentInterface } from 'interfaces/equipment';
import { ProcedureInterface } from 'interfaces/procedure';
import { GetQueryInterface } from 'interfaces';

export interface VisitInterface {
  id?: string;
  visit_date: any;
  equipment_id?: string;
  procedure_id?: string;
  created_at?: any;
  updated_at?: any;

  equipment?: EquipmentInterface;
  procedure?: ProcedureInterface;
  _count?: {};
}

export interface VisitGetQueryInterface extends GetQueryInterface {
  id?: string;
  equipment_id?: string;
  procedure_id?: string;
}
