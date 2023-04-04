import { format } from "date-fns/esm";

export function formatDate(date) {
  return format(date, "MM/dd/yyyy");
}
