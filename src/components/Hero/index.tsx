import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden bg-white text-black dark:bg-black dark:text-white pt-[120px] md:pt-[130px] lg:pt-[160px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-col md:flex-row items-start">
            <div className="w-full md:w-2/3 px-4 mb-8 md:mb-0"> {/* Left Content */}
              <div
                className="hero-content wow fadeInUp mx-auto max-w-[780px] text-start"
                data-wow-delay=".2s"
              >
                <h1 className="mb-6 text-3xl font-bold leading-snug  sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-[1.2]">
                  My Way Design 
                </h1>
                <p className="mx-auto mb-4 max-w-[600px] text-start font-medium  sm:text-lg sm:leading-[1.44]">
                  My Way Design is dedicated to creating beautiful, handcrafted crochet pieces that celebrate African heritage. 
                  Our mission is to empower women by teaching them valuable skills and helping them start their own businesses.
                </p>
                <ul className="mb-4 flex flex-wrap items-center justify-center gap-5">
                  <li>
                    <Link
                      href="#"
                      className="inline-flex items-center justify-center rounded-md bg-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2"
                    >
                      More {"->"}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full md:w-1/3 px-4"> {/* Right Image */}
              <div
                className="wow fadeInUp relative z-10 mx-auto max-w-[845px]"
                data-wow-delay=".25s"
              >
                <div className="mt-16">
                  <Image
                    src="/images/myway/su.jpeg"
                    alt="hero"
                    className="mx-auto max-w-full rounded-t-xl rounded-tr-xl"
                    width={1000}
                    height={600}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
