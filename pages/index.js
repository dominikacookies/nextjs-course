import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUP = [
  {
    id: "m1",
    title: "first meetup",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    address: "Wonder world",
    description: "Our first meetup",
  },
  {
    id: "m2",
    title: "second meetup",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    address: "Super world",
    description: "Our second meetup",
  },
];

const HomePage = ({ meetups }) => {
  return <MeetupList meetups={meetups} />;
};

//runs for every incoming request
// use for data that changes super frequently
// export async function getServerSideProps(context) {
//   //accessing req for the incoming request
//   const req = context.req;

//   return {
//     props: {
//       meetups: DUMMY_MEETUP,
//     },
//   };
// }

//runs at build time, revalidate sets every how many seconds the data should refresh
// use for data that does not change as frequently
// this is faster than getServerSideProps
export async function getStaticProps() {
  return {
    props: {
      meetups: DUMMY_MEETUP,
    },
    revalidate: 10,
  };
}

export default HomePage;
