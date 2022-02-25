import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();

  const handleSubmit = async (meetupData) => {
    await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/");
  };
  return <NewMeetupForm onAddMeetup={handleSubmit} />;
};

export default NewMeetupPage;
