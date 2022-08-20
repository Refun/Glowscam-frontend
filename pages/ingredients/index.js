/* eslint-disable react/jsx-key */
import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";

const ingredients = ({ ingredients, meta_Data }) => {
  return (
    <>
      <Head>
        <title>{`${meta_Data.title}`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta itemProp="name" content={`${meta_Data.meta_title}`}></meta>
        <meta
          itemProp="description"
          content={`${meta_Data.meta_description}`}
        ></meta>
        <meta itemProp="image" content={`${meta_Data.meta_image}`}></meta>
      </Head>
      <AppLayout header={<> </>}>
        <Head>
          <title>Laravel - Ingredients</title>
        </Head>
        <div className="grid gird-cols-1">
          <div className="bg-white shadow-sm sm:rounded-lg h-48 my-8">
            <div className="flex justify-between">
              <div className="flex items-center h-48 pl-14">
                <div className="flex items-center">
                  <div className="border-r-4 border-blue-600 h-10 px-4 flex items-center">
                    {" "}
                    <h1 className="uppercase text-3xl font-bold text-center">
                      {" "}
                      ingredients
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

        {/* top ingredient section  */}
        <div className="flex px-2 pt-3 justify-between">
          {" "}
          <h1 className="text-xl font-bold">Top Ingredients</h1>
          <Link href="/ingredients/all-ingredients">
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-white">
              View All
            </button>
          </Link>
        </div>
        <div className="grid md:grid-cols-6 grid-cols-2  gap-4 my-6">
          {ingredients.top_ingredient ? (
            ingredients.top_ingredient.data?.map((ingredient) => {
              return (
                <Link href={`/ingredients/${ingredient.id.toString()}`}>
                  <div className="py-8 flex h-[18rem]  inline-flex bg-white ">
                    <div className=" mx-auto   shadow-sm sm:rounded-lg">
                      <div className="overflow-hidden flex flex-col justify-center items-center p-4">
                        <Image
                          loader={() => ingredient.thumbnail}
                          src={ingredient.thumbnail}
                          alt={ingredient.name}
                          width={85}
                          height={85}
                          className="py-4"
                        />
                        <div className=" text-center pt-4 h-16">
                          <h6 className="text-md font-semibold">
                            {ingredient.name}
                          </h6>
                        </div>
                        <div className="truncate px-4 pt-1 h-6 opacity-80">
                          {ingredient.short_description}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <></>
          )}
        </div>
        {/* new ingredients section  */}
        <div className="flex px-2 ">
          <h4 className="text-xl font-bold">New Ingredients</h4>
        </div>
        <div className="grid md:grid-cols-6 grid-cols-2  gap-4 my-6">
          {ingredients.new_ingredient ? (
            ingredients.new_ingredient.data?.map((ingredient) => {
              return (
                <Link href={`/ingredients/${ingredient.id.toString()}`}>
                  <div className="py-8 flex h-[18rem]  inline-flex bg-white ">
                    <div className=" mx-auto   shadow-sm sm:rounded-lg">
                      <div className="overflow-hidden flex flex-col justify-center items-center p-4">
                        <Image
                          loader={() => ingredient.thumbnail}
                          src={ingredient.thumbnail}
                          alt={ingredient.name}
                          width={85}
                          height={85}
                          className="py-4"
                        />
                        <div className=" text-center pt-4 h-16">
                          <h6 className="text-md font-semibold">
                            {ingredient.name}
                          </h6>
                        </div>
                        <div className="truncate px-4 pt-1 h-6 opacity-80">
                          {ingredient.short_description}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </AppLayout>
    </>
  );
};

export async function getServerSideProps(context) {
  const ingredients = await axios
    .get("/api/top-new/ingredients", {
      headers: {
        Cookie: context.req.headers.cookie,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
  const meta_Data = await axios
    .get(`/api/page-meta/ingredients`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => console.log(error));
  return {
    props: {
      ingredients: ingredients,
      meta_Data,
    },
  };
}

export default ingredients;
