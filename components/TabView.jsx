'use client';
import { useState, useEffect } from 'react';
export default function TabView(props) {
    const { defaultState, tabComponents } = props;
    const [tabState, setTabState] = useState(defaultState);
    return (
        <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 pt-5 md:p-6 mb-2">
            <div className="flex justify-around mb-5">
                <div className="text-sm font-medium text-center text-gray-900 border-b border-gray-200 dark:text-white dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px">
                        {tabComponents.map(tab => (
                            <li className="mr-2" key={tab.tabState}>
                                <button className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-700 hover:border-blue-700 dark:hover:text-blue-700
                                ${tab.tabState === tabState ? 'text-blue-700' : 'text-gray-900 dark:text-white'}
                                `}
                                 onClick={() => {setTabState(tab.tabState)}}
                                >{ tab.title }</button>
                            </li>

                        ))}
                    </ul>
                </div>
            </div>
            {  tabComponents.find(comp => tabState === comp.tabState ) ? tabComponents.find(comp => tabState === comp.tabState ).component : null }
        </div>
    )
}
