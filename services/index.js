const api_url = 'https://fpl-league-theta.vercel.app/api';
const managerInfoApi = `${api_url}/entry`;
const headers = {'Content-Type': 'application/json'};

const getResult = (url) => {
    const result = new Promise((resolve, reject) => {
         fetch(`${url}${(url.includes('?') ? '&t=' : '?t=') + new Date().getTime()}`, { next: { revalidate: 900 } })
         .then(data => {
             data.json().then(json => {
                 resolve(json)
             })
         })
         .catch(() => {
             reject('error call axios')
        })
        
    
        // .finally(function () {
        //     // always executed
        // });
    })
    
    return result
}

export const getBootstrap = async () => await getResult(`${api_url}/bootstrap-static/`);
export const getFixtures = async () => await getResult(`${api_url}/fixtures/`);
export const getElementSummary = async (id) => await getResult(`${api_url}/element-summary/${id}/`);
export const getLiveEvent = async (gw) => await getResult(`${api_url}/event/${gw}/live/`)
export const getPicksData = async (eid, gw) => await getResult(`${managerInfoApi}/${eid}/event/${gw}/picks/`);
export const getManagerInfo = async (id) => await getResult(`${managerInfoApi}/${id}/`);
