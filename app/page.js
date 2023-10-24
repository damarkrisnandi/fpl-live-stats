'use client'
import GameWeek from '@/components/Gameweek';
import TabView from '@/components/TabView';
import { getBootstrap, getFixtures, getLiveEvent } from '@/services'
import Image from 'next/image'

export default async function Home() {
  const bootstrap = await getBootstrap();
  bootstrap.elements.sort((a, b) => b.minutes - a.minutes)
  const fixtures = await getFixtures();
  const gameweek = (bootstrap.events.find((data) => data.is_current)).id;
  const currentFixtures = fixtures.filter(f => f.event === gameweek);
  const finishedMatch = currentFixtures.filter((data) => data.finished && data.finished_provisional)
  const percentage = (finishedMatch.length / currentFixtures.length) * 100;
  const liveEvent = (await getLiveEvent(gameweek));
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


  const getTeam = (id) => (bootstrap.teams.find(t => t.id === id)).short_name;
  const sumPoints = (list) => {
    let total = 0;
    list.forEach(a => {
      total += a.points;
    })
    return total;
  }

  bootstrap.elements.sort((a, b) => {
    const livePtsA = liveEvent.elements.find(e => e.id === a.id).stats.total_points;
    const livePtsB = liveEvent.elements.find(e => e.id === b.id).stats.total_points;
    return livePtsB - livePtsA;
  })
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-24">
      <div className='w-11/12'>
        <GameWeek
          gameweek={gameweek}
          percentage={percentage}
          currentFixtures={currentFixtures}
          finishedMatch={finishedMatch}
        ></GameWeek>
      </div>
      {
        currentFixtures.map(fixture => (
          <div className='w-11/12 flex justify-center'>
            <TabView 
            defaultState={getTeam(fixture.team_h) }
            tabComponents={
              [
                {
                  tabState: `${getTeam(fixture.team_h)}`,
                  title: `${getTeam(fixture.team_h)} \t ${fixture.team_h_score >= 0 ? fixture.team_h_score : ''}`,
                  component: (
                    <div>
                      {
                        bootstrap.elements
                        .filter(e => e.team === fixture.team_h)
                        .filter(e => 
                          liveEvent.elements.find(l => l.id === e.id)
                          .explain.find(e => e.fixture === fixture.id)
                          .stats.find(s => s.identifier === 'minutes').value > 0
                        )
                        .map((h, index) => (
                          <div className={`flex ${index === 0 ? 'font-semibold text-sm' : 'text-xs'}`}>
                            <p className='mr-2'>
                              { h.web_name }
                            </p>
                            {
                              liveEvent.elements.find(e => e.id === h.id)
                              .explain.find(e => e.fixture === fixture.id).stats.map(s => (
                                <p key={s.identifier} className={`mr-1 ${s.value > 0 ? `${classMap[s.identifier]}` : ''}`}>{descMap[s.identifier]}{s.value}({s.points})</p>
                              ))
                            }
                            <p className={`mr-1 ${true ? `` : ''}`}>P{sumPoints(liveEvent.elements.find(e => e.id === h.id).explain.find(e => e.fixture === fixture.id).stats)}</p>
                            
                          </div>
                        ))
                      }
                    </div>
                  ),
                },
                {
                  tabState: `${getTeam(fixture.team_a)}`,
                  title: `${fixture.team_a_score >= 0 ? fixture.team_a_score : ''} \t ${getTeam(fixture.team_a)}`,
                  component: (
                    <div>
                      {
                        bootstrap.elements
                        .filter(e => e.team === fixture.team_a)
                        .filter(e => 
                          liveEvent.elements.find(l => l.id === e.id)
                          .explain.find(e => e.fixture === fixture.id)
                          .stats.find(s => s.identifier === 'minutes').value > 0
                        )
                        .map((a, index) => (
                          <div className={`flex ${index === 0 ? 'font-semibold text-sm' : 'text-xs'}`}>
                            <p className='mr-2'>
                              { a.web_name }
                            </p>
                            {
                              liveEvent.elements.find(e => e.id === a.id)
                              .explain.find(e => e.fixture === fixture.id).stats.map(s => (
                                <p key={s.identifier} className={`mr-1 ${s.value > 0 ? `${classMap[s.identifier]}` : ''}`}>{descMap[s.identifier]}{s.value}({s.points})</p>
                              ))
                            }
                            <p className={`mr-1 ${true ? `` : ''}`}>P{sumPoints(liveEvent.elements.find(e => e.id === a.id).explain.find(e => e.fixture === fixture.id).stats)}</p>
                            
                          </div>
                        ))
                      }
                    </div>
                  ),
                }
              ]
            }
            />
            {/* <p>{ getTeam(fixture.team_h) } {0} - {0} { getTeam(fixture.team_a) }</p> */}
          </div>
        ))
      }
    </main>
  )
}
