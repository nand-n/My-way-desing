import Image from "next/image";

const About = () => {
  return (
    <section
      id="about"
      className="bg-gray-1 pb-8 pt-20 dark:bg-dark-2 lg:pb-[70px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="wow fadeInUp" data-wow-delay=".2s">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div className="mb-12 max-w-[540px] lg:mb-0">
                <h2 className="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-[40px] sm:leading-[1.2]">
                  Hand Crafted Beautifull crochet Clothings.
                </h2>
                <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
                  The main focus on educating interested peoples on how to
                  mmake standard crochet clothing and sell their piece in affordable and better price. 
                  <br /> <br />
                  We Teach them how to make it.
                  <br /> 
                  We Give work opportunity for them.
                  <br /> 
                  We sell quality products that are done by out trenee.
                </p>

                <a
                  href="/knowmore"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white duration-300 hover:bg-primary/90"
                >
                  Know More
                </a>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="-mx-2 flex flex-wrap sm:-mx-4 lg:-mx-2 xl:-mx-4">
                <div className="w-full px-2 sm:w-1/2 sm:px-4 lg:px-2 xl:px-4">
                  <div
                    className={`relative mb-4 sm:mb-8 sm:h-[400px] md:h-[540px] lg:h-[400px] xl:h-[500px] `}
                  >
                    <Image
                      src="/images/myway/howtocrochet.jpeg"
                      alt="about image"
                      fill
                      className="h-full w-full object-cover object-center rounded-lg"
                    />
                  </div>
                </div>

                <div className="w-full px-2 sm:w-1/2 sm:px-4 lg:px-2 xl:px-4">
                  <div className="relative mb-4 sm:mb-8 sm:h-[220px] md:h-[346px] lg:mb-4 lg:h-[225px] xl:mb-8 xl:h-[310px]">
                    <Image
                      src="/images/myway/sweatshirt.jpeg"
                      alt="about image"
                      fill
                      className="h-full w-full object-cover object-center rounded-lg"
                    />
                  </div>

                  <div className="relative mb-4 sm:mb-8 sm:h-[150px] md:h-[15px] lg:mb-4 lg:h-[150px] xl:mb-8 xl:h-[150px]">
                    <Image
                      src="/images/myway/su.jpeg"
                      alt="about image"
                      fill
                      className="h-full w-full object-cover object-center rounded-lg"
                    />
                  </div>
              
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
