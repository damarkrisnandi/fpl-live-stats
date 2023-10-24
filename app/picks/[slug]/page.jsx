'use client'
import GameWeek from '@/components/Gameweek';
import TabView from '@/components/TabView';
import { getBootstrap, getFixtures, getLiveEvent, getPicksData, getManagerInfo } from '@/services'
import Image from 'next/image'

export default async function Home(props) {
    // console.log(props.params.slug);
  // id
    const id = props.params.slug;
  const bootstrap = await getBootstrap();
  bootstrap.elements.sort((a, b) => b.minutes - a.minutes)
  const fixtures = await getFixtures();
  // gw
  const gameweek = (bootstrap.events.find((data) => data.is_current)).id;
  const currentFixtures = fixtures.filter(f => f.event === gameweek);
  const finishedMatch = currentFixtures.filter((data) => data.finished && data.finished_provisional)
  const percentage = (finishedMatch.length / currentFixtures.length) * 100;
  const liveEvent = (await getLiveEvent(gameweek));

  const managerInfo = (await getManagerInfo(props.params.slug))
  const picksData = (await getPicksData(id, gameweek));
  const descMap = {
    minutes: 'MP',
    goals_scored: 'G',
    assists: 'A',
    yellow_cards: 'YC',
    red_cards: 'RC',
    goals_conceded: 'GC',
    clean_sheets: 'CS',
    saves: 'S',
    bonus: 'B'
  }

  const classMap = {
    minutes: '',
    goals_scored: 'text-green-700',
    assists: 'text-green-700',
    yellow_cards: 'text-yellow-700',
    red_cards: 'text-red-700',
    goals_conceded: 'text-yellow-600',
    clean_sheets: 'text-green-700',
    saves: 'text-green-700',
    bonus: 'text-green-700'

  }

  const statusMap = {
    0: 'benched',
    1: 'played',
    2: 'played',
    3: 'played',
  }


  const getTeam = (id) => (bootstrap.teams.find(t => t.id === id)).short_name;
  const sumPoints = (list) => {
    let total = 0;
    list.forEach(a => {
      total += a.points;
    })
    return total;
  }

  let totalLivePoints = 0;
  const liveEventMapByPicks = picksData.picks.map(p => {
    return { ...liveEvent.elements.find(e => e.id === p.element), multiplier: p.multiplier}
  });
  for (let evt of liveEventMapByPicks) {
    for (let expl of evt.explain) {
      for (let stat of expl.stats) {
        totalLivePoints += stat.points * evt.multiplier;
      }
    }
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-24">
      <div className='w-11/12'>
        <GameWeek
          gameweek={gameweek}
          percentage={percentage}
          currentFixtures={currentFixtures}
          finishedMatch={finishedMatch}
        ></GameWeek>
        <div className={`flex flex-col items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 mb-2`}>
            <div className={`flex w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
              <div className='w-full'>
                <p className='text-xl font-semibold'>{ managerInfo.name } | { totalLivePoints }Pts</p>
                <p className='mb-8'>{ managerInfo.player_first_name } { managerInfo.player_last_name }</p>
                {
                  picksData.picks
                  .map(({element, position, multiplier, is_captain, is_vice_captain}) => {
                    return { ...bootstrap.elements.find(e => e.id === element), multiplier, position, multiplier,is_captain, is_vice_captain}
                  })
                  .map(p => (
                    <div className='mb-2'>
                      <p>{p.web_name} {p.is_captain ? ' (C)' : ''} {p.is_vice_captain ? ' (V)' : ''}</p>
                      {
                        liveEvent.elements.find(e => e.id === p.id)
                        .explain
                        .map(e => (
                          <div className={`flex ${sumPoints(e.stats) >= 5 ? 'font-semibold text-xs' : 'text-xs'}`}>
                            <p className='mr-2'>
                            { 
                              currentFixtures.find(cf => cf.id === e.fixture).team_h === p.team ?  
                                'v ' + getTeam(currentFixtures.find(cf => cf.id === e.fixture).team_a) + ' (H)' : 
                                'v ' + getTeam(currentFixtures.find(cf => cf.id === e.fixture).team_h) + ' (A)'
                            }
                            </p>
                            { 
                              e.stats.map(s => (
                                <p key={s.identifier} className={`mr-1 ${s.value > 0 ? `${classMap[s.identifier]}` : ''}`}>{descMap[s.identifier]}{s.value}({s.points})</p>  
                              ))
                            }
                            <p className={`mr-1 ${true ? `` : ''}`}>P{sumPoints(e.stats) * p.multiplier}</p>
                          </div>
                          
                        ))
                      }
                    </div>
                  ))
                }
              </div>
            </div>
        </div>
      </div>
      
    </main>
  )
}
