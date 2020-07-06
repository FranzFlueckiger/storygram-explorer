import React from 'react';
import './App.css';
import {CssBaseline} from '@material-ui/core';
import {MyShowCase} from './Components/ShowCase';
import {MyAppBar} from './Components/AppBar';
import {MyDrawer} from './Components/Drawer/Drawer';
import {Config, Storygram} from 'storygram';
import {BlockBusterdata} from './Data/exampleData';
import {getStoryGramMetadata} from './Util/storyGramHelpers';
import {ConfigBlockBuster} from './Data/exampleConfig';
import {loadData} from './Util/dataLoader';

function App() {

  let isDrawable = false
  const defaultData = loadData('')
  const [selectedTab, setSelectedTab] = React.useState<number>(0)
  const [config, setConfig] = React.useState<Config>(defaultData.config)
  const [data, setData] = React.useState<any[]>(defaultData.data)
  const storyGram = new Storygram(data, config)
  storyGram.calculate()
  if(storyGram.data.events.length && storyGram.data.actors.size) {
    isDrawable = true
  } else {
    isDrawable =  false
  }
  const metaData = getStoryGramMetadata(storyGram)

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
        setData={setData}
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
