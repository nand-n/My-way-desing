import Link from "next/link";

const Breadcrumb = ({
  pageName,
  pageDescription,
  isDashboard = false,
}: {
  pageName: string;
  pageDescription?: string;
  isDashboard?: boolean;
}) => {
  return (
    <div className={`dark:bg-dark relative z-10 overflow-hidden pb-4 ${isDashboard ? "pb-[12px] pt-[24px] md:pt-[320px] lg:pt-[50px]" : "pb-[60px] pt-[120px] md:pt-[130px] lg:pt-[160px]"}`}>
      <div className="from-stroke/0 via-stroke to-stroke/0 dark:via-dark-3 absolute bottom-0 left-0 h-px w-full bg-gradient-to-r"></div>
      <div className={` ${isDashboard ? 'pl-0' : ''}`}>
        <div className={`-mx-4 flex flex-wrap items-center ${isDashboard ? '-ml-0' : ''}`}>
          <div className={`w-full ${isDashboard ? 'pl-0' : 'px-4'}`}>
            <div className={isDashboard ? 'text-left' : 'text-center'}>
              <h1 className="text-dark mb-4 text-3xl font-bold dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
                {pageName}
              </h1>
              <p className="text-body-color dark:text-dark-6 mb-5 text-base">
                {pageDescription}
              </p>

              <ul className={`flex items-center ${isDashboard ? 'justify-start' : 'justify-center'} gap-[10px]`}>
                <li>
                  <Link
                    href="/"
                    className="text-dark flex items-center gap-[10px] text-base font-medium dark:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <p className="text-body-color flex items-center gap-[10px] text-base font-medium">
                    <span className="text-body-color dark:text-dark-6">
                      {" "}
                      /{" "}
                    </span>
                    {pageName}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
