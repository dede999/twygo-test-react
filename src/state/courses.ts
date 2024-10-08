import { create } from "zustand";
import { CourseStore } from "./courseStoreMembers";
import { faker } from "@faker-js/faker";
import sortCourses from "../helpers/sortCourses";

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
      ).sort(sortCourses),
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
      ].sort(sortCourses),
    })),
  editCourse: (
    id: string,
    title: string,
    description: string,
    expirationDate: Date,
  ) =>
    set((state) => ({
      courses: state.courses
        .map((course) =>
          course.id === id
            ? { ...course, title, description, expirationDate }
            : course,
        ).sort(sortCourses),
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
  ) => {
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              courseVideos: course.courseVideos.map((video) =>
                video.id === videoId
                  ? { ...video, url, title, duration }
                  : video,
              ),
            }
          : course,
      ),
    }));
  },
  deleteVideoFromCourse: (courseId, videoId) => {
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              courseVideos: course.courseVideos.filter(
                (video) => video.id !== videoId,
              ),
            }
          : course,
      ),
    }));
  },
}));
