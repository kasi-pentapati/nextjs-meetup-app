import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const conn = await MongoClient.connect('mongodb+srv://kasi:viswa822@cluster0.bmvn2.mongodb.net/meetupdb?retryWrites=true&w=majority')

    const db = conn.db();

    const meetupsCollection = db.collection('meetupdb');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    conn.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;
