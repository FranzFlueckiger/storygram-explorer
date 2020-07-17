import React from 'react';
import './App.css';
import {CssBaseline} from '@material-ui/core';
import {MyShowCase} from './Components/ShowCase';
import {MyAppBar} from './Components/AppBar';
import {MyDrawer} from './Components/Drawer/Drawer';
import {Config, Storygram} from 'storygram';
import {getStoryGramMetadata, setNiceDefaults} from './Util/storyGramHelpers';
import {loadData} from './Util/dataLoader';
import {ModFunction, SplitModFunction} from './Components/Drawer/TextPart/TextPartGenerator';

export type Functors = {
  eventDescs: ModFunction[];
  setEventDescs: React.Dispatch<React.SetStateAction<ModFunction[]>>;
  eventURLs: ModFunction[];
  setEventURLs: React.Dispatch<React.SetStateAction<ModFunction[]>>,
  actorURLs: ModFunction[];
  setActorURLs: React.Dispatch<React.SetStateAction<ModFunction[]>>,
  actorColor: ModFunction[];
  setActorColor: React.Dispatch<React.SetStateAction<ModFunction[]>>,
  actorSplitFunc: SplitModFunction[];
  setActorSplitFunc: React.Dispatch<React.SetStateAction<SplitModFunction[]>>,
}

function App() {

  let isDrawable = false 
  const [eventDescs, setEventDescs] = React.useState<ModFunction[]>([])
  const [eventURLs, setEventURLs] = React.useState<ModFunction[]>([])
  const [actorURLs, setActorURLs] = React.useState<ModFunction[]>([])
  const [actorColor, setActorColor] = React.useState<ModFunction[]>([])
  const [actorSplitFunc, setActorSplitFunc] = React.useState<SplitModFunction[]>([])
  const functors = {
    'eventDescs': eventDescs,
    'setEventDescs': setEventDescs,
    'eventURLs': eventURLs,
    'setEventURLs': setEventURLs,
    'actorURLs': actorURLs, 
    'setActorURLs': setActorURLs,
    'actorColor': actorColor,
    'setActorColor': setActorColor,
    'actorSplitFunc': actorSplitFunc,
    'setActorSplitFunc': setActorSplitFunc
  }
  const defaultData = loadData('', functors)
  const [selectedTab, setSelectedTab] = React.useState<number>(0)
  const [config, setConfig] = React.useState<Config>(defaultData.config)
  const [data, setData] = React.useState<any[]>(defaultData.data)
  const storyGram = new Storygram(data, config)
  if(storyGram.data.events.length && storyGram.data.actors.size) {
    isDrawable = true
  } else {
    isDrawable = false
  }
  const metaData = getStoryGramMetadata(storyGram, data)
  setNiceDefaults(storyGram, metaData, functors)

  return (
    <div>
      <CssBaseline />
      <MyAppBar
        storyGram={storyGram}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        metaData={metaData}
        isDrawable={isDrawable}
      />
      <MyDrawer
        storyGram={storyGram}
        config={config}
        setConfig={setConfig}
        metaData={metaData}
        setData={setData}
        isDrawable={isDrawable}
        functors={functors}
      />
      <MyShowCase
        storyGram={storyGram}
        selectedTab={selectedTab}
        metaData={metaData}
      />
    </div>
  );
}

export default App;
