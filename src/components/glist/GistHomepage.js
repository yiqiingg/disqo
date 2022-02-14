import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Octokit } from '@octokit/core';
import React, { useEffect, useState } from 'react';

import './GistHomepage.css';

const GistHomepage = (props) => {
  const { setDisplay } = props;
  const octokit = new Octokit({
    auth: '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',
  });
  const [gistData, setGistData] = useState([]);
  const [gistBuckets, setGistBuckets] = useState(8);

  const [fileData, setFileData] = useState([]);
  const [fileBuckets, setFileBuckets] = useState(8);

  const generateBuckets = (setData, response, buckets, type) => {
    const latestResponseTime = new Date(response.data[0].created_at);
    const latestResponseBucket =
      (Math.floor(Date.parse(latestResponseTime) / 5000) + 1) * 5000;
    console.log(
      new Date(latestResponseBucket),
      latestResponseBucket,
      latestResponseTime,
      'time'
    );
    const graphBuckets = {};

    for (let i = buckets - 1; i > 0; i -= 1) {
      graphBuckets[latestResponseBucket - 5000 * i] = {
        time: new Date(latestResponseBucket - 5000 * i).toLocaleTimeString(
          'it-IT'
        ),
        size: 0,
      };
    }
    response.data.forEach((data) => {
      const nearestBucket =
        Math.floor(Date.parse(new Date(data.created_at)) / 5000) * 5000;
      if (nearestBucket in graphBuckets && type === 'gist') {
        graphBuckets[nearestBucket].size += 1;
      } else if (nearestBucket in graphBuckets && type === 'file') {
        console.log(Object.keys(data.files).length, data.files);
        graphBuckets[nearestBucket].size += Object.keys(data.files).length;
      }
    });
    setData(Object.values(graphBuckets));
  };
  useEffect(() => {
    octokit.request('GET /gists/public').then((response) => {
      console.log(response);
      generateBuckets(setGistData, response, gistBuckets, 'gist');
    });
  }, [gistBuckets]);

  useEffect(() => {
    octokit.request('GET /gists/public').then((response) => {
      console.log(response);
      generateBuckets(setFileData, response, fileBuckets, 'file');
    });
  }, [fileBuckets]);

  return (
    <div className="note-container">
      <button
        className="graph-button stats"
        onClick={() => setDisplay('notes')}
      >
        Close Stats
      </button>
      <div className="graph">
        <p>Gist Created</p>
        <LineChart width={700} height={250} data={gistData}>
          <Line type="monotone" dataKey="size" stroke="#39ACDC" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis
            label={{
              value: 'Number of Gists',
              angle: -90,
              position: 'insideLeft',
            }}
          />
        </LineChart>
        <button
          className="graph-button"
          onClick={() => setGistBuckets(gistBuckets + 8)}
        >
          Load More
        </button>
      </div>
      <div className="graph">
        <p>Files per Gist</p>
        <LineChart width={700} height={250} data={fileData}>
          <Line type="monotone" dataKey="size" stroke="#39ACDC" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis
            label={{
              value: 'Number of Files',
              angle: -90,
              position: 'insideLeft',
            }}
          />
        </LineChart>
        <button
          className="graph-button"
          onClick={() => setFileBuckets(fileBuckets + 8)}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default GistHomepage;
