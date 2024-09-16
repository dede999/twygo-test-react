import { create } from "zustand";
import { CourseStore } from "./courseStoreMembers";
import { faker } from "@faker-js/faker";

export const useCourseStore = create<CourseStore>((set) => ({
  courses: [],
  seedCourses: () =>
    set({
      courses: Array.from(
        { length: faker.number.int({ min: 4, max: 10 }) },
        () => ({
          id: faker.string.uuid(),
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          expirationDate: faker.date.future(),
          courseVideos: Array.from({ length: faker.number.int(10) }, () => ({
            id: faker.string.uuid(),
            url: faker.internet.url(),
            title: faker.lorem.sentence(),
            duration: faker.number.int({ min: 1, max: 4200 }),
          })),
        }),
      ),
    }),
  addACourse: (title: string, description: string, expirationDate: Date) =>
    set((state) => ({
      courses: [
        ...state.courses,
        {
          id: faker.string.uuid(),
          title,
          description,
          expirationDate,
          courseVideos: [],
        },
      ],
    })),
  editCourse: (
    id: string,
    title: string,
    description: string,
    expirationDate: Date,
  ) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === id
          ? { ...course, title, description, expirationDate }
          : course,
      ),
    })),
  deleteACourse: (id: string) => {
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== id),
    }));
  },
  addVideoToCourse: (
    courseId: string,
    url: string,
    title: string,
    duration: number,
    index: number = 0,
  ) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              courseVideos: [
                ...course.courseVideos.slice(0, index),
                {
                  id: faker.string.uuid(),
                  url,
                  title,
                  duration,
                },
                ...course.courseVideos.slice(index),
              ],
            }
          : course,
      ),
    })),
  editVideoInCourse: (
    courseId: string,
    videoId: string,
    url: string,
    title: string,
    duration: number,
  ) => {},
  deleteVideoFromCourse: (courseId, videoId) => {},
}));
