
export default function UnauthorizedPage() {
  return (
    <>
      <h1 className="text-[32px] leading-tight font-medium">
        Unauthorized access.
      </h1>
      <div className="flex flex-col text-medium text-black">
        <p className="">
          To use the next tool, you must have an active Launchpad
          account.
        </p>
        <p>
          <br /> Please reach out to us at
          <br />
          <a
            href="mailto:contractservices@next tool.com"
            className="font-semibold underline hover:no-underline cursor-pointer transition-all  text-[#13499F]"
          >
            contractservices@next tool.com
          </a>
          <br /> if you have any questions or require assistance.
        </p>
      </div>
    </>
  );
}
