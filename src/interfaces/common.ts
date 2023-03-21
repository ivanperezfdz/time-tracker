import { Employee, EmployeeState } from "./employee";

export interface RootState {
  employee: EmployeeState;
}

export interface Coordinates {
  latitude: number | null;
  longitude: number | null;
}

export interface WorkEntry {
  id: string;
  workCheckTypeId: string | null;
  employee: Employee;
  workEntryType: string;
  workEntryIn: {
    origin: string;
    date: string;
    coordinates: Coordinates;
  };
  workEntryOut: {
    origin: string;
    date: string;
    coordinates: Coordinates;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface MenuItem {
  text: string;
  isOpen?: boolean;
  class?: string;
  arrow?: boolean;
  arrowClass?: string;
  action?: () => void;
}

export interface SubmenuItem {
  boldText: string;
  text: string;
  footText: string;
  img: string;
  class?: string;
  arrow?: boolean;
  arrowClass?: string;
  action?: () => void;
}
