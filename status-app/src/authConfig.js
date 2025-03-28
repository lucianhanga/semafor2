import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "8f14d765-1c56-4a2a-a22f-25fccab7c180", // Replace with your client ID
    authority: "https://login.microsoftonline.com/9ddff61d-1e0f-425a-9643-d8a7cd9ad409", // Replace with your tenant ID
    redirectUri: process.env.REACT_APP_REDIRECT_URI || "http://localhost:3000", // Use a valid default redirect URI
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            console.log(message); // Handle unexpected log levels
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["api://semafor2/user_impersonation"], // Ensure the required scopes are correct
};