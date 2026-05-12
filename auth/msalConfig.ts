import { Configuration, PopupRequest } from "@azure/msal-browser";

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

export const msalConfig: Configuration = {
  auth: {
    clientId: "74e4b2ad-b060-474b-a060-fe8b2a6eed5c",
    authority:
      "https://login.microsoftonline.com/a99eb8fe-e6c6-469d-8309-6898897cc5d4",
    redirectUri: backendUrl,
  },
  cache: {
    cacheLocation: "localStorage",
  },
};

export const loginRequest: PopupRequest = {
  scopes: ["9fe44957-54d8-4c1d-ad65-1121b28dd86c/access_as_user"],
};
