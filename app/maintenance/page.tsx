// import { StatusPageLayout } from "@/app/components/StatusPageLayout";

export default function MaintenancePage() {
  return (
    <>
       <h1 className="text-[32px] leading-tight font-medium">
        The next tool is temporarily unavailable.
      </h1>
      <div className="flex flex-col text-medium text-black">
        <p className="">
          We are currently experiencing technical issues with our online
          requisition tool. To avoid delays in patient care, please access your
          PDF fillable account requisition through{" "}
          <a
            href="https://dropsite.rmalab.com/labproviderserver/labproviderng/login?_gl=1*lw8fd6*_gcl_au*MjAwNDUyMDE3LjE3NzA2NjE3OTI.*_ga*MTUyMzgwOTg2LjE3NzA2NjE3OTI.*_ga_LY1B2J9RN3*czE3NzA2NjE3OTIkbzEkZzAkdDE3NzA2NjE3OTIkajYwJGwwJGgw"
            className="font-semibold underline hover:no-underline cursor-pointer transition-all  text-[#13499F]"
          >
            DrOPsite
          </a>{" "}
          to complete and provide to your patient.
        </p>
        <p>
          <br /> Our team is working to restore service as quickly as possible.
          Thank you for your understanding.
        </p>
      </div>
    </>
  );
}