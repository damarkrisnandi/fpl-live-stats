import { getBootstrap, getFixtures } from '@/services'
export default async function GameWeek(props) {
    const { gameweek, percentage, currentFixtures, finishedMatch } = props;

    return (
        <div className={`flex flex-col items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 mb-2`}>
            <div className={`flex w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
                <div className='w-full'>
                <p className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Gameweek {gameweek}</p>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div className="bg-fuchsia-700 text-xs font-medium text-blue-100 text-center p-0.5 rounded-full" style={{width: `${percentage}%`}}>{ percentage > 0.5 ? percentage.toFixed(0) : '' }%</div>
                </div>
                </div>
            </div>
        </div>
    )
}
