import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useLoginWithSms,
  useSmsVerify,
} from "../../store/server/auth/mutation";
import { useAuthSlice } from "../../store/client/authslice";

const SmsVerify = () => {
  {/* for statemanagement hook */}
  const { state } = useLocation();
  const { auth } = useAuthSlice();

  [/**  for timer state */]
  const [timer, setTimer] = useState(60);
  const [code, setCode] = useState("");

  [/* for server data fetching state */]
  const smsVerify = useSmsVerify();
  const navigate = useNavigate();
  const loginsms = useLoginWithSms();

  useEffect(() => {
    const decreasetimer = () => {
      if (timer >= 0) {
        setTimer(timer - 1);
      }
    };
    const intervalId = setInterval(decreasetimer, 1000);
    return () => clearInterval(intervalId);
  }, [timer]);

  useEffect(() => {
    if (auth?.access_token) {
      navigate("/");
    }
  }, [auth, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      phone: state.phone,
      code,
    });
    smsVerify.mutate({
      phone: state.phone,
      code,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 6) {
      setCode(e.target.value);
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" w-96 p-5 rounded-md border-2 border-secondary space-y-3">
        <h1 className=" text-secondary font-bold text-2xl text-center capitalize">
          Verify Code
        </h1>

        <form action="" onSubmit={handleSubmit}>
          <label className="label">
            <span className="label-text text-secondary-content  capitalize">
              Phone
            </span>
          </label>
          <input
            type="number"
            maxLength={6}
            value={code}
            onChange={handleChange}
            name="code"
            placeholder="Enter digit code"
            className=" input input-secondary"
          />
          <div className=" flex justify-between my-3">
            <p
              className="cursor-pointer"
              onClick={() => {
                loginsms.mutate({ phone: state.phone });
                setTimer(59);
              }}
            >
              resend Code
            </p>

            <p className=" text-info">({timer}s)</p>
          </div>
          <button className=" btn btn-secondary w-full   btn-md">
            {smsVerify.isPending && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SmsVerify;
