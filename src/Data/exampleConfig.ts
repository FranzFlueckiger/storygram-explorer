import {Config} from "storygram";

export const ConfigBlockBuster: Config = {
  dataFormat: 'array',
  //verbose: true,
  actorArrayField: 'people',
  eventField: 'release_date',
  eventDescription: (l: any) =>
    (l.data.original_title + ' (' + l.data.vote_average + '/10)') as string,
  filterGroupAmt: [2, undefined],
  filterGroupSize: [1, undefined],
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

export const WarConfig: Config = {
  dataFormat: 'table',
  eventField: 'YEAR',
  actorFields: ['SideA', 'SideA2nd', 'SideB', 'SideB2nd'],
  eventDescription: (xLayer) => 'War in ' + xLayer.data.Location + ', ' + String(xLayer.eventValue),
  filterGroupAmt: [2, undefined],
  actorSplitFunction: (ys: string) => ys.split(', '),
  shouldContain: ['Russia (Soviet Union)'],
  highlight: ['Afghanistan', 'Russia (Soviet Union)'],
  generationAmt: 100,
  populationSize: 100
};

export const MetasonConfig: Config = {
  dataFormat: 'array',
  eventField: 'year',
  actorArrayField: 'participants',
  filterGroupAmt: [2, undefined],
  filterGroupSize: [3, undefined],
  filterEventValue: [1988, 1993],
  filterEventCustom: (xLayer) => {
    // @ts-ignore
    const name: string = xLayer.data.releaseName
    return !name.includes('compilation') &&
      !name.toLowerCase().includes('best of') &&
      !name.toLowerCase().includes('collection') &&
      !name.toLowerCase().includes('greatest hits') &&
      !name.toLowerCase().includes('super hits') &&
      !name.toLowerCase().includes('remaster')
  },
  generationAmt: 100,
  populationSize: 100,
  eventValueScaling: 0,
  //verbose: true,
  eventDescription: (xLayer) => xLayer.data.releaseName + ", " + xLayer.data.year,
  shouldContain: ['Luther Vandross']
}

export const BundesratConfig: Config = {
  dataFormat: 'ranges',
  startField: 'Amtsantritt',
  endField: 'Amtsende',
  actorField: 'Name',
  eventDescription: (event) => 'Bundesrat im Jahr ' + String(event.eventValue),
  actorColor: (event, actor) => actor.data.Partei as string,
  compact: true,
};
