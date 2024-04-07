import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date) => {
	const duration = moment.duration(moment().diff(date));

	if (duration.asHours() > 24) {
		// If the date is more than 24 hours ago, format it as "April 7, 2024"
		return moment(date).format("MMMM D, YYYY");
	} else {
		// If the date is less than 24 hours ago, format it as "2 hours ago"
		return moment(date).fromNow();
	}
};