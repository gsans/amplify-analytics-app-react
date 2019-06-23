import React, { useState, useEffect } from 'react';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import { Analytics } from 'aws-amplify'
import Auth from '@aws-amplify/auth';
import awsconfig from './aws-exports';

function App() {
  const [user, updateUser] = useState([])

  async function recordEvent() {
    await Analytics.record({
      name: 'My test event',
      attributes: {
        username: user.username
      }
    })
    const url = 'https://'+awsconfig.aws_mobile_analytics_app_region+'.console.aws.amazon.com/pinpoint/home/?region='+awsconfig.aws_mobile_analytics_app_region+'#/apps/'+awsconfig.aws_mobile_analytics_app_id+'/analytics/events';
    const msg = `Event Submitted. View Events on the Amazon Pinpoint Console [${url}]`;
    console.log(msg);
  }

  useEffect(() => {
    async function authenticateUser() {
      try {
        const user = await Auth.currentAuthenticatedUser()
        updateUser({ username: user.username })
      } catch (err) {
        console.log('error getting user: ', err)
      }
    }
    authenticateUser();
  })
  return (
    <div className="app">
      <div className="app-header">
          <div className="app-logo">
              <img src="https://aws-amplify.github.io/images/Logos/Amplify-Logo-White.svg" alt="AWS Amplify" />
          </div>
          <h1>Welcome to the Amplify Framework</h1>
      </div>
      <div className="app-body">
        <div>
          <button onClick={recordEvent}>Record Event</button>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true })

