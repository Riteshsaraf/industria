// import { StatusPageLayout } from "@/app/components/StatusPageLayout";

export default function ForbiddenPage() {
  return (
    <>
      <h1 className="text-[32px] leading-tight font-medium">
        Unauthorized access.
      </h1>
      <div className="flex flex-col text-medium text-black">
        <p className="">
          You must be a licensed naturopathic doctor to use this tool.
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
