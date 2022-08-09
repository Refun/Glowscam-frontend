import AppLayout from "@/components/Layouts/AppLayout";
import Head from "next/head";
import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";

const Events = ({ events }) => {
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          events
        </h2>
      }
    >
      <Head>
        <title>Laravel - events</title>
      </Head>
      <div className="flex px-2 pt-3 justify-between"></div>
      {/* main banner section  */}
      <div className="grid gird-cols-1 ">
        <div className="bg-white shadow-sm sm:rounded-lg h-48 my-8">
          <div className="flex justify-between">
            <div className="flex items-center h-48 pl-14">
              <div className="flex items-center">
                <div className="border-r-4 border-blue-600 h-10 px-4 flex items-center">
                  {" "}
                  <h1 className="uppercase text-3xl font-bold text-center">
                    {" "}
                    Events
                  </h1>
                </div>
                <h6 className="opacity-80 text-sm mx-2">
                  Get Fresh Events and Details
                </h6>
              </div>
            </div>
            <Image
              src="/product_banner.jpg"
              alt="ingredient_banner"
              width={246}
              height={186}
              className="py-4"
            />
          </div>
        </div>
      </div>
      {/* event list  */}
      <h1 className="text-xl font-bold my-4">Running Events</h1>
      <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
        {events.map((event, index) => (
          <Link key={index} href={`/events/${event.slug}`}>
            <div>
              <Image
                loader={() => event.image}
                src={event.image}
                alt={event.slug}
                width={500}
                height={300}
                className="py-6"
              />
            </div>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
};

export async function getServerSideProps(context) {
  const events = await axios
    .get("/api/events", {
      headers: {
        Cookie: context.req.headers.cookie,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
  return {
    props: {
      events: events.data,
    },
  };
}

export default Events;
