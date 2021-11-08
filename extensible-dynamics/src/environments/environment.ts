import { RouteInformation } from 'src/app/models/routing-models';
import { RouteGroup, UserType } from 'src/enums/app-enums';
import { MappedArray } from './../app/models/data-structures';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const port = 44366;

export const environment = {
  production: false,
  baseUrl: `https://localhost:${port}`,
  tokenCookieName: 'app_token',
  loginPageUrl: '',
  profilePageUrl: 'profile',
  canvasPatUrl: 'canvaspats',
  canvasCoursesUrl: 'canvas_courses',
  courseOverviewUrl: 'course_overview',
  courseAssignmentsUrl: 'course_assignments',
  canvasApiKeyLength: 69,
  canvasBaseInfrastructureUrl: 'https://canvas.uts.edu.au',
  courseGradebookUrl: 'course_gradebook',
  customCourseStudentDataUrl: 'student_custom_data'
};

export const routeInformation: RouteInformation[] = [
  {
    routeName: 'Login',
    routeUrl: environment.loginPageUrl,
    iconName: 'login',
    routeGroup: RouteGroup.Auth
  },
  {
    routeName: 'User Profile',
    routeUrl: environment.profilePageUrl,
    iconName: 'account_circle',
    routeGroup: RouteGroup.General
  },
  {
    routeName: 'Canvas Access Tokens',
    routeUrl: environment.canvasPatUrl,
    iconName: 'vpn_key',
    routeGroup: RouteGroup.General
  },
  {
    routeName: 'Courses',
    routeUrl: environment.canvasCoursesUrl,
    iconName: 'library_books',
    routeGroup: RouteGroup.General
  },
  {
    routeName: 'Overview',
    routeUrl: environment.courseOverviewUrl,
    iconName: 'dashboard',
    routeGroup: RouteGroup.Course
  },
  {
    routeName: 'Course Assignments',
    routeUrl: environment.courseAssignmentsUrl,
    iconName: 'assignment',
    routeGroup: RouteGroup.Course
  },
  {
    routeName: 'Course Gradebook',
    routeUrl: environment.courseGradebookUrl,
    iconName: 'book',
    routeGroup: RouteGroup.Course
  },
  {
    routeName: 'Course Student Custom Data',
    routeUrl: environment.customCourseStudentDataUrl,
    routeGroup: RouteGroup.Course,
    iconName: 'ballot'
  }
];

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
