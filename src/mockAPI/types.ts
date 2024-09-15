export type CourseVideo = {
  id: string;
  title: string;
  url: string;
  duration: number;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  courseVideos: CourseVideo[];
  expirationDate: Date;
};
