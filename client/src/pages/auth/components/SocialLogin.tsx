/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useFacebookLogin,
  useGoogleLogin,
} from "../../../store/server/auth/mutation";
import { GoogleLogin, GoogleLoginResponse } from "../../../utils/googleapi";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import {
  FacebookLogin,
  FacebookLoginAuthResponse,
} from "react-facebook-login-lite";

const SocialLogin = () => {
  const googlelogin = useGoogleLogin();
  const facebookLogin = useFacebookLogin();
  const googleclientId = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
  const facebookAppId = import.meta.env.VITE_APP_ID;

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({ clientId: googleclientId });
    });
  }, [googleclientId]);

  const onSuccess = (googleUser: GoogleLoginResponse) => {
    const id_token = googleUser.getAuthResponse().id_token;

    googlelogin.mutate(id_token);
  };

  const onFbSuccess = (response: FacebookLoginAuthResponse) => {
    const { accessToken, userID } = response.authResponse;

    facebookLogin.mutate({ accessToken, userID });
    console.log({ accessToken, userID });
  };
  const onFbFailur = (err: any) => {
    console.log(err);
  };

  return (
    <>
      <div className="my-2">
        <GoogleLogin
          client_id={googleclientId}
          cookiepolicy="single_host_origin"
          onSuccess={onSuccess}
        />
      </div>

      <div className="my-2">
        <FacebookLogin
          appId={facebookAppId}
          onSuccess={onFbSuccess}
          onFailure={onFbFailur}
          theme="dark"
          imgSrc={
            "https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
          }
        />
      </div>
    </>
  );
};

export default SocialLogin;
