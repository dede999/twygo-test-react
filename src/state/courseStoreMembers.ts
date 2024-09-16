import { Course } from "../domain/types";

type CourseStoreActions = {
  seedCourses: () => void;
  addACourse: (
    title: string,
    description: string,
    expirationDate: Date,
  ) => void;
  editCourse: (
    id: string,
    title: string,
    description: string,
    expirationDate: Date,
  ) => void;
  deleteACourse: (id: string) => void;
  addVideoToCourse: (
    courseId: string,
    url: string,
    title: string,
    duration: number,
    index?: number,
  ) => void;
  editVideoInCourse: (
    courseId: string,
    videoId: string,
    url: string,
    title: string,
    duration: number,
  ) => void;
  deleteVideoFromCourse: (courseId: string, videoId: string) => void;
};

type CourseStoreData = {
  courses: Course[];
};

export type CourseStore = CourseStoreActions & CourseStoreData;
