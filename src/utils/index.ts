import { WorkEntry, SubmenuItem } from "@/interfaces/common";
import axios from "axios";
import CryptoJS from 'crypto-js';

const API_TOKEN = 'Bearer 16e2f0694a311151c01aa0a131b94a5a3ad7f110e12c2d8f459fcbb158214f5f';

export const axiosInstance = axios.create({
  baseURL: 'https://api-test.sesametime.com',
  headers: {
    Authorization: API_TOKEN,
  },
});

export function getFormattedTime(totalSeconds: number): string {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = Math.floor(totalSeconds % 60);
	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function createSubMenuItemsFromData(data: WorkEntry[]): SubmenuItem[] {
  return data
    .filter((item) => item.workEntryOut !== null)
    .map((item) => {
      const employee = item.employee;
      const company = employee.company;
      const workEntryInDate = new Date(item.workEntryIn.date);
      const workEntryOutDate = new Date(item.workEntryOut.date);
      const duration = workEntryOutDate.getTime() - workEntryInDate.getTime();
			const hash = CryptoJS.MD5(employee.email.trim().toLowerCase()).toString();

      return {
        boldText: company.name,
        text: `${employee.firstName} ${employee.lastName}`,
        footText: `Tiempo total ${getFormattedTime(duration)}`,
				img: `https://www.gravatar.com/avatar/${hash}?s=48&d=identicon`,
				action: () => `${employee.firstName} clicked`
      };
    })
		.slice(0, 5);	// Me quedo sólo con los 5 primeros por dar un ejemplo
}
