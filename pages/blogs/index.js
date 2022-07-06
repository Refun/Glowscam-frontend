/* eslint-disable react/jsx-key */
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";

const blogs = ({ newBlogs, trendingBlogs }) => {
  return (
    <AppLayout header={<> </>}>
      <Head>
        <title>Blogs</title>
      </Head>
      {/* top part  */}
      <div className="grid gird-cols-1">
        <div className="bg-white shadow-sm sm:rounded-lg h-48 my-8">
          <div className="flex justify-between">
            <div className="flex items-center h-48 pl-14">
              <div className="flex items-center">
                <div className="border-r-4 border-blue-600 h-10 px-4 flex items-center">
                  {" "}
                  <h1 className="uppercase text-3xl font-bold text-center">
                    {" "}
                    our blog
                  </h1>
                </div>
                <h6 className="opacity-80 text-sm mx-2">
                  Get Fresh Blog Posts Everyday
                </h6>
              </div>
            </div>

            <Image
              src="/ingredient_banner.jpg"
              alt="ingredient_banner"
              width={246}
              height={186}
              className="py-4"
            />
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="md:min-w-[70%] sm:min-w-[100%] my-4">
          <div className="flex justify-left md:my-4 sm:my-3">
            <h1 className="text-xl font-bold">New From the Blog</h1>
          </div>
          <div className="md:pr-9">
            <div className="grid grid-cols-1 gap-4 md:mb-4 sm:mb-3">
              {
                <Link href={`/blogs/${newBlogs[0].slug.toString()}`}>
                  <div className="  rounded-lg dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col justify-start items-baseline">
                      <div className="z-0">
                        <Image
                          loader={() => newBlogs[0].full_image}
                          src={newBlogs[0].full_image}
                          alt={newBlogs[0].title}
                          width={1040}
                          height={530}
                          className="py-4"
                        />
                      </div>
                      <div className=" bg-black text-black px-3 py-2 md:-mt-16 md:mb-2  flex justify-center align-center md:ml-4  z-10 rounded">
                        <h2 className="text-md font-semibold text-white uppercase text-center rounded-md">
                          {newBlogs[0].category}
                        </h2>
                      </div>
                    </div>
                    <div className="h-10 mt-3">
                      <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                        {newBlogs[0].title}
                      </p>
                    </div>
                    <div className="md:py-5 md:pb-3 sm:py-2  flex flex-col justify-start border-b ">
                      <h6 className="mb-2 text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                        Posted On:
                        <span className=" mx-2 opacity-60">
                          {newBlogs[0].created_at}
                        </span>
                      </h6>
                    </div>
                    <div className="mb-3 mt-1">
                      <div className="flex text-black py-2">
                        <div className="flex">
                          {/* avatar image  */}
                          <Image
                            src="/avatar.PNG"
                            alt={newBlogs[0].title}
                            width={25}
                            height={25}
                            className="py-4"
                          />
                          <span className="opacity-60 text-sm mx-2">
                            {newBlogs[0].autor.name}
                          </span>
                        </div>
                        <div className="flex">
                          {/* avatar image  */}
                          <Image
                            src="/comment.PNG"
                            alt={newBlogs[0].title}
                            width={25}
                            height={25}
                            className="py-4"
                          />
                          <span className="opacity-60 text-sm mx-2">
                            {newBlogs[0].comments}
                          </span>
                        </div>
                        <div className="flex">
                          {/* avatar image  */}
                          <Image
                            src="/love_icon.png"
                            alt={newBlogs[0].title}
                            width={15}
                            height={13}
                            className=""
                          />
                          <span className="opacity-60 text-sm mx-2">
                            {newBlogs[0].likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              }
            </div>
            <div className="grid grid-cols-2 gap-4">
              {newBlogs.map((blog, index) => {
                if (index === 0) {
                  <></>;
                } else {
                  return (
                    <Link href={`/blogs/${blog.slug.toString()}`}>
                      <div>
                        <div className="  rounded-lg dark:bg-gray-800 dark:border-gray-700">
                          <div className="flex flex-col justify-start items-baseline">
                            <div className="z-0">
                              <Image
                                loader={() => blog.image}
                                src={blog.image}
                                alt={blog.title}
                                width={1040}
                                height={530}
                                className="py-4"
                              />
                            </div>
                            <div className=" bg-black text-black px-3 py-2 md:-mt-14 md:mb-2  flex justify-center align-center md:ml-4  z-10 rounded">
                              <h2 className="text-md font-semibold text-white uppercase text-center rounded-md">
                                {blog.category}
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="h-10 mt-2">
                          <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                            {blog.title}
                          </p>
                        </div>
                        <div className="md:py-5 md:pb-3sm:py-2  flex flex-col justify-start border-b ">
                          <h6 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                            Posted On:
                            <span className=" mx-2 opacity-60">
                              {blog.created_at}
                            </span>
                          </h6>
                        </div>
                        <div className="mb-3 mt-1">
                          <div className="flex text-black py-2">
                            <div className="flex">
                              {/* avatar image  */}
                              <Image
                                src="/avatar.PNG"
                                alt={blog.title}
                                width={25}
                                height={25}
                                className="py-4"
                              />
                              <span className="opacity-60 text-sm mx-2">
                                {blog.autor.name}
                              </span>
                            </div>
                            <div className="flex">
                              {/* avatar image  */}
                              <Image
                                src="/comment.PNG"
                                alt={blog.title}
                                width={25}
                                height={25}
                                className="py-4"
                              />
                              <span className="opacity-60 text-sm mx-2">
                                {blog.comments}
                              </span>
                            </div>
                            <div className="flex">
                              {/* avatar image  */}
                              <Image
                                src="/love_icon.png"
                                alt={blog.title}
                                width={15}
                                height={13}
                                className=""
                              />
                              <span className="opacity-60 text-sm mx-2">
                                {blog.likes}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
          <div className="flex justify-center items-center md:my-10 sm:my-5">
            <Link href={`/all-blogs`}>
              <button className="bg-blue-600 px-4 py-2 rounded-md text-white">
                View All
              </button>
            </Link>
          </div>
        </div>
        <div className="md:min-w-[30%] sm:min-w-[100%] ">
          <div className="flex justify-left md:my-4 sm:my-3">
            <h1 className="text-xl font-bold">Trending Posts</h1>
          </div>
          <div className="border-l md:pl-7">
            {trendingBlogs?.map((blog, index) => {
              return (
                <Link href={`/blogs/${blog.slug.toString()}`}>
                  <div>
                    <div className="  rounded-lg dark:bg-gray-800 dark:border-gray-700">
                      <div className="flex flex-col justify-start items-baseline">
                        <div className="z-0">
                          <Image
                            loader={() => blog.image}
                            src={blog.image}
                            alt={blog.title}
                            width={1040}
                            height={530}
                            className="py-4"
                          />
                        </div>
                        <div className=" bg-black text-black px-3 py-2 md:-mt-14 md:mb-2  flex justify-center align-center md:ml-4  z-10 rounded">
                          <h2 className="text-md font-semibold text-white uppercase text-center rounded-md">
                            {blog.category}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="h-10 mt-2">
                      <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                        {blog.title}
                      </p>
                    </div>
                    <div className="md:py-5 md:pb-3sm:py-2  flex flex-col justify-start border-b ">
                      <h6 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                        Posted On:
                        <span className=" mx-2 opacity-60">
                          {blog.created_at}
                        </span>
                      </h6>
                    </div>
                    <div className="mb-3 mt-1">
                      <div className="flex text-black py-2">
                        <div className="flex">
                          {/* avatar image  */}
                          <Image
                            src="/avatar.PNG"
                            alt={blog.title}
                            width={25}
                            height={25}
                            className="py-4"
                          />
                          <span className="opacity-60 text-sm mx-2">
                            {blog.autor.name}
                          </span>
                        </div>
                        <div className="flex">
                          {/* avatar image  */}
                          <Image
                            src="/comment.PNG"
                            alt={blog.title}
                            width={25}
                            height={25}
                            className="py-4"
                          />
                          <span className="opacity-60 text-sm mx-2">
                            {blog.comments}
                          </span>
                        </div>
                        <div className="flex">
                          {/* avatar image  */}
                          <Image
                            src="/love_icon.png"
                            alt={blog.title}
                            width={15}
                            height={13}
                            className=""
                          />
                          <span className="opacity-60 text-sm mx-2">
                            {blog.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
export async function getServerSideProps(context) {
  const [blogs] = await Promise.all([
    axios
      .get("/api/trending-new-blogs")
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error)),
  ]);
  //   console.log(blogs.new_blogs.data);
  return {
    props: {
      newBlogs: blogs.new_blogs.data,
      trendingBlogs: blogs.trending_blogs.data,
    },
  };
}

export default blogs;
