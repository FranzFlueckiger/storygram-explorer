import React from 'react';
import './App.css';
import {CssBaseline} from '@material-ui/core';
import {MyShowCase} from './Components/ShowCase';
import {MyAppBar} from './Components/AppBar';
import {MyDrawer} from './Components/Drawer/Drawer';
import {Config, Storygram} from 'storygram';
import {BlockBusterdata} from './Components/exampleData';
import { getStoryGramMetadata } from './Util/storyGramHelpers';

const configBlock: Config = {
  dataFormat: 'array',
  //verbose: true,
  actorArrayField: 'people',
  eventField: 'release_date',
  eventDescription: (l: any) =>
    (l.data.original_title + ' (' + l.data.vote_average + '/10)') as string,
  filterGroupAmt: [2,undefined],
  filterGroupSize: [1,undefined],
  filterEventValue: ['1 Jan 2000', '1 Jan 2008'],
  shouldContain: ['Leonardo DiCaprio', 'Jude Law'],
  //mustContain: ['Leonardo DiCaprio', 'Jude Law'],
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

  const [selectedTab, setSelectedTab] = React.useState<number>(0)
  const [config, setConfig] = React.useState<Config>(configBlock)
  const [data, setData] = React.useState<any[]>(BlockBusterdata())
  const storyGram = new Storygram(data, config)
  storyGram.remove()
  storyGram.calculate()
  const metaData = getStoryGramMetadata(storyGram)
  console.log(metaData)

  return (
    <div>
      <CssBaseline />
      <MyAppBar
        storyGram={storyGram}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        metaData={metaData}
      />
      <MyDrawer
        storyGram={storyGram}
        config={config}
        setConfig={setConfig}
        metaData={metaData}
      />
      <MyShowCase
        storyGram={storyGram}
        config={config}
        data={data}
        selectedTab={selectedTab}
        metaData={metaData}
      />
    </div>
  );
}

export default App;
