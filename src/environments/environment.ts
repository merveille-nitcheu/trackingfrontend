// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://173.249.8.175:9010/api",
  pusherAuth: "http://173.249.8.175:9010/broadcasting/auth",
  PUSHER_APP_ID: "1836392",
  PUSHER_APP_KEY: "161627330028cfb8922e",
  PUSHER_APP_SECRET: "3aa7691ac87bdf61bb1e",
  PUSHER_PORT: 443,
  PUSHER_SCHEME: "https",
  PUSHER_APP_CLUSTER: "eu"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
