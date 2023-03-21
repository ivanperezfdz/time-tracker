export interface Employee {
  id: string;
	email: string;
	firstName: string;
	lastName: string;
	workStatus: string;
	company: {
		name: string
	}
}

export interface EmployeeState {
  user: {
    id: string,
    email: string,
    name: string
  };
  workStatus: string;
  workEntryIn: string;
  workTotalSecs: number;
}
