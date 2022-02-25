import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  // use req.method to check what type of req has been sent (POST/PUT/DELETE)
  if (req.method === "POST") {
    try {
      const data = req.body;
      const client = await MongoClient.connect(
        `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.0nhje.mongodb.net/meetups?retryWrites=true&w=majority`
      );

      const db = client.db();

      const collection = db.collection("meetups");

      const result = await collection.insertOne(data);

      client.close();

      res.status(201).json(result);
    } catch (error) {
      console.error(error);
    }
  }
};

export default handler;
