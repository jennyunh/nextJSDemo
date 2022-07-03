// our-domain.com/new-meetup
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router'
import Head from 'next/dist/next-server/lib/head';


function NewMeetupPage() {

const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
  const response = await fetch('/api/new-meetup', {
    method: 'POST',
    //convert object to JSON format
    body: JSON.stringify(enteredMeetupData),
    headers: {'Content-Type': 'application/json'}
  });

//.json converts response from json to javascript object
const data = await response.json();
console.log(data);

router.push('/');

  }

  return <>
  <Head>
    <title>React Meetups</title>
    <meta name="description" content="browse bunch of meetups!"/>
  </Head>
  <NewMeetupForm onAddMeetup={addMeetupHandler} /></>
}

export default NewMeetupPage;