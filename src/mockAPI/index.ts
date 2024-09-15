import { Course, CourseVideo } from "./types";
import { faker } from "@faker-js/faker";

export const courses: Course[] = Array.from(
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
);

export function getCourses(): Course[] {
  return courses
    .filter((course) => course.expirationDate > new Date())
    .sort((a, b) => a.expirationDate.getTime() - b.expirationDate.getTime());
}

export function createCourse(course: Course): void {
  courses.push(course);
}

export function getCourseById(courseId: string): Course | undefined {
  return courses.find((course) => course.id === courseId);
}

export function updateCourse(courseId: string, updatedCourse: Course): void {
  const index = courses.findIndex((course) => course.id === courseId);
  if (index !== -1) {
    courses[index] = updatedCourse;
  }
}

export function deleteCourse(courseId: string): void {
  const index = courses.findIndex((course) => course.id === courseId);
  if (index !== -1) {
    courses.splice(index, 1);
  }
}

export function addVideoToCourse(courseId: string, video: CourseVideo): void {
  const course = courses.find((course) => course.id === courseId);
  if (course) {
    course.courseVideos.push(video);
  }
}

export function removeVideoFromCourse(courseId: string, videoId: string): void {
  const course = courses.find((course) => course.id === courseId);
  if (course) {
    course.courseVideos = course.courseVideos.filter(
      (video) => video.id !== videoId,
    );
  }
}

export function getVideoById(
  courseId: string,
  videoId: string,
): CourseVideo | undefined {
  const course = courses.find((course) => course.id === courseId);
  if (course) {
    return course.courseVideos.find((video) => video.id === videoId);
  }
  return undefined;
}

export function updateVideo(
  courseId: string,
  videoId: string,
  updatedVideo: CourseVideo,
): void {
  const course = courses.find((course) => course.id === courseId);
  if (course) {
    const index = course.courseVideos.findIndex(
      (video) => video.id === videoId,
    );
    if (index !== -1) {
      course.courseVideos[index] = updatedVideo;
    }
  }
}
