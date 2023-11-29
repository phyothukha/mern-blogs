// import { useEffect } from "react";
import {
  useFacebookLogin,
  useGoogleLogin,
} from "../../../store/server/auth/mutation";
// import { gapi } from "gapi-script";
import {
  FacebookLogin,
  FacebookLoginAuthResponse,
} from "react-facebook-login-lite";
import { GoogleLogin } from "@react-oauth/google";

const SocialLogin = () => {
  const googlelogin = useGoogleLogin();
  const facebookLogin = useFacebookLogin();
  
  const facebookAppId = import.meta.env.VITE_APP_ID;

  // useEffect(() => {
  //   const initGapi = async () => {
  //     await new Promise<void>((resolve) => {
  //       gapi.load("client:auth2", () => {
  //         gapi.client.init({ clientId: googleclientId });
  //         resolve();
  //       });
  //     });
  //   };

  //   initGapi();
  // }, [googleclientId]);

  const onFbSuccess = (response: FacebookLoginAuthResponse) => {
    const { accessToken, userID } = response.authResponse;

    facebookLogin.mutate({ accessToken, userID });
  };

  return (
    <>
      <div className="my-2">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            googlelogin.mutate(credentialResponse.credential ?? "");
          }}
        />
      </div>

      <div className="my-2">
        <FacebookLogin
          appId={facebookAppId}
          onSuccess={onFbSuccess}
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
