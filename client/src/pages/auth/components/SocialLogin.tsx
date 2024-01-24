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
    <div className=" flex justify-between items-center w-full overflow-hidden">
      <GoogleLogin
        size="large"
        shape="rectangular"
        type="icon"
        logo_alignment="left"
        width={500}
        onSuccess={(credentialResponse) => {
          googlelogin.mutate(credentialResponse.clientId || "");
        }}
      />

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
    </div>
  );
};

export default SocialLogin;
