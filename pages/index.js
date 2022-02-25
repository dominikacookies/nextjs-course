import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

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
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.0nhje.mongodb.net/meetups?retryWrites=true&w=majority`
    );

    const db = client.db();

    const collection = db.collection("meetups");

    const meetups = await collection.find().toArray();
    client.close();

    return {
      props: {
        meetups: meetups.map((meetup) => ({
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        })),
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error(error);
  }
}

export default HomePage;
