import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = ({ meetupData }) => {
  return (
    <MeetupDetail
      image={meetupData.image}
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}
    />
  );
};

//Next js must know for which id values to pre-generate the page
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.0nhje.mongodb.net/meetups?retryWrites=true&w=majority`
  );

  const db = client.db();

  const collection = db.collection("meetups");

  const meetups = await collection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // if fallback is false the user can only access pages with the defined ids below
    // if true and id provided is not defined below, the page will be dynamically generated
    // this allows you to pre-generate the most popular pages only
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.0nhje.mongodb.net/meetups?retryWrites=true&w=majority`
  );

  console.log(meetupId);

  const db = client.db();

  const collection = db.collection("meetups");

  const meetup = await collection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  //fetch data for single meet up
  return {
    props: {
      meetupData: {
        title: meetup.title,
        image: meetup.image,
        description: meetup.description,
        address: meetup.address,
      },
    },
  };
}

export default MeetupDetails;
