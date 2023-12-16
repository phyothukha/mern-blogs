import {
  useFacebookLogin,
  useGoogleLogin,
} from "../../../store/server/auth/mutation";
import {
  FacebookLogin,
  FacebookLoginAuthResponse,
} from "react-facebook-login-lite";
import { GoogleLogin } from "@react-oauth/google";

const SocialLogin = () => {
  const googlelogin = useGoogleLogin();
  const facebookLogin = useFacebookLogin();

  const facebookAppId = import.meta.env.VITE_APP_ID;

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
