import { useNavigate } from "react-router-dom";

const Notfound = () => {
  const navigate = useNavigate();
  return (
    <div className=" mx-auto container h-screen flex justify-center items-center">
      <div className=" w-3/6 space-y-2 text-center">
        <h1 className=" text-xl font-bold ">
          404 <span className=" font-normal"> |</span> Not Found
        </h1>
        <p className=" opacity-75">Your content is not found in this page</p>
        <button
          onClick={() => navigate(-1)}
          className=" btn btn-neutral btn-md btn-outline"
        >
          go back
        </button>
      </div>
    </div>
  );
};

export default Notfound;

{
  /* <div className=" my-4">
      <Link
        className="card sm:card-side hover:bg-base-200 transition-colors sm:max-w-none"
        to={`/blog/blog-detail`}
      >
        <figure className="mx-auto w-full object-cover p-6 max-sm:pb-0 sm:max-w-[12rem] sm:pe-0">
          <img
            loading="lazy"
            src="/images/blog/install-sveltekit-daisyui.jpg"
            className="border-base-content bg-base-300 rounded-btn border border-opacity-5"
            alt="How to install SvelteKit with daisyUI?"
            style={{
              viewTransitionName: "howtoinstallsveltekitanddaisyui-img",
            }}
          />
        </figure>
        <div
          className="card-body"
          style={{
            viewTransitionName: " howtoinstallsveltekitanddaisyui-text",
          }}
        >
          <h2 className="card-title">How to install SvelteKit with daisyUI?</h2>{" "}
          <p className="text-xs opacity-60">
            SvelteKit is a meta framework for building web applications. It is
            based on Svelte, a compiler that turns your Svelte components into
            fast and efficient JavaScript.
          </p>
        </div>
      </Link>
    </div> */
}
