import { Course } from "../domain/types";

export default function sortCourses(first: Course, second: Course): number {
  return first.expirationDate.getTime() - second.expirationDate.getTime();
}