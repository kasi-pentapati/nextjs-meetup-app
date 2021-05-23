import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  console.log('**********************************************')
  const conn = await MongoClient.connect('mongodb+srv://kasi:viswa822@cluster0.bmvn2.mongodb.net/meetupdb?retryWrites=true&w=majority')
  console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
  const db = conn.db();

  const meetupsCollection = db.collection('meetupdb');
  console.log('#################################################')

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  conn.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const conn = await MongoClient.connect('mongodb+srv://kasi:viswa822@cluster0.bmvn2.mongodb.net/meetupdb?retryWrites=true&w=majority')

  const db = conn.db();

  const meetupsCollection = db.collection('meetupdb');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  conn.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
