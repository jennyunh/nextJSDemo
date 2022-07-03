import { MongoClient } from "mongodb";


//whenever a request is sent to this route, 
//so to /api/new-meetup
//it will trigger the function here.

const handler = async (req, res) => {

if (req.method === "POST") {

    const data = req.body;

    const {title, image, address, description} = data;

    //connect to the database
  const client = await MongoClient.connect('mongodb+srv://jennyunh:8711Sajh$@cluster0.1xc7n.mongodb.net/meetups?retryWrites=true&w=majority')

  const db = client.db();

//name the collection something (meetups in this case)
const meetupsCollection = db.collection('meetups')

//insert a document/object to the database collection
const result = await meetupsCollection.insertOne(data)

//close the connection to the database.
client.close();

res.status(201).json({message: "meetup inserted!"})



}

}


export default handler;