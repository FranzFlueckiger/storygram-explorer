import React from 'react';
import './App.css';
import {CssBaseline} from '@material-ui/core';
import {MyShowCase} from './Components/ShowCase';
import {MyAppBar} from './Components/AppBar';
import {MyDrawer} from './Components/Drawer';
import {Config, Storygram} from 'storygram';
import {BlockBusterdata} from './Components/exampleData';

const configBlock: Config = {
  dataFormat: 'array',
  //verbose: true,
  actorArrayField: 'people',
  eventField: 'release_date',
  eventDescription: (l: any) =>
    (l.data.original_title + ' (' + l.data.vote_average + '/10)') as string,
  filterGroupAmt: [2, 20],
  filterGroupSize: [1, 20],
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

  const drawerWidth = 350;

  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [config, setConfig] = React.useState<Config>(configBlock)
  const [data, setData] = React.useState<any[]>(BlockBusterdata())
  const storyGram = new Storygram(data, config)
  storyGram.remove()
  storyGram.calculate()

  return (
    <div>
      <CssBaseline />
      <MyAppBar
        drawerWidth={drawerWidth}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      <MyDrawer
        drawerWidth={drawerWidth}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        storyGram={storyGram}
        config={config}
        setConfig={setConfig}
      />
      <MyShowCase
        drawerWidth={drawerWidth}
        drawerOpen={drawerOpen}
        storyGram={storyGram}
        config={config}
        data={data}
      />
    </div>
  );
}

export default App;
