import { MongoClient } from 'mongodb';
import Head from 'next/head'
import MeetupList from '../components/meetups/MeetupList';


function HomePage(props) {
  return <>  
  <Head>
    <title>React Meetups</title>
    <meta name="description" content="browse bunch of meetups!"/>
  </Head>
  <MeetupList meetups={props.meetups} /></>
  ;
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }



export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect('mongodb+srv://jennyunh:8711Sajh$@cluster0.1xc7n.mongodb.net/meetups?retryWrites=true&w=majority')

  const db = client.db();

//name the collection something (meetups in this case)
const meetupsCollection = db.collection('meetups')

const meetups = await meetupsCollection.find().toArray();

const test = await meetupsCollection.find()

console.log(test)

  return {
    props: {
      meetups: meetups.map(meetup => {return {
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString()
      }})
    },

    //regenerate page every 1 second if a request needs to happen
    revalidate: 1
  }; 
}

export default HomePage;
