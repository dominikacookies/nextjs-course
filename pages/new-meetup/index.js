import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const handleSubmit = (data) => {
    console.log(data);
  };
  return <NewMeetupForm onAddMeetUp={handleSubmit} />;
};

export default NewMeetupPage;
