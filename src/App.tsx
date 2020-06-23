import React from 'react';
import logo from './logo.svg';
import './App.css';
import StorygramWrapper from './Components/sgWrapper';
import { BlockBusterdata } from './Components/exampleData';
import { Config } from 'storygram';

const configBlock: Config = {
  dataFormat: 'array',
  //verbose: true,
  actorArrayField: 'people',
  eventField: 'release_date',
  eventDescription: (l: any) =>
    (l.data.original_title + ' (' + l.data.vote_average + '/10)') as string,
  filterGroupAmt: [2, undefined],
  filterEventValue: ['1 Jan 2000', '1 Jan 2008'],
  shouldContain: ['Leonardo DiCaprio', 'Jude Law'],
  eventValueScaling: 0.003,
  url: (event: any, actor: any) =>
    'https://www.google.ch/search?q=' +
    String(event.data.original_title) +
    ' ' +
    actor.actorID,
  marginBottom: 80,
  marginRight: 200,
  highlight: ['Leonardo DiCaprio', 'Jude Law']
};

function App() {
  return (
    <div>
      <StorygramWrapper data={BlockBusterdata()} config={configBlock} />
    </div>
  );
}

export default App;
