"use client";

import { useMsal } from "@azure/msal-react";
import axios from "axios";
import { loginRequest } from "../../auth/msalConfig";
import { useState } from "react";

interface ProfileResponse {
  name: string | null;
  email: string | null;
}

const backendUrl = process.env.BACKEND_API_URL;

export default function Profile() {
  const { instance, accounts } = useMsal();
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  
  const callApi = async () => {
    if (accounts.length === 0) {
      alert("Please login first");
      return;
    }

    const token = await instance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0],
    });

    const response = await axios.get<ProfileResponse>(`${backendUrl}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    setProfile(response.data);
  };

  return (
    <div>
      <button onClick={callApi}>Call /profile API</button>
      {profile && <pre>{JSON.stringify(profile, null, 2)}</pre>}
    </div>
  );
}
