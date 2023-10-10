const api_url = 'https://fpl-fetch.netlify.app/api';
const managerInfoApi = `${api_url}/entry`;
const headers = {'Content-Type': 'application/json'};

const getResult = (url) => {
    const result = new Promise((resolve, reject) => {
         fetch(url, { next: { revalidate: 900 } })
         .then(data => {
             data.json().then(json => {
                 resolve(json)
             })
         })
         .catch((error) => {
            // resolve({errorMessage: error})
             reject('error call', error)
        })
        
    
        // .finally(function () {
        //     // always executed
        // });
    })
    
    return result
}

export const getBootstrap = async () => await getResult(`${api_url}/bootstrap-static`);
export const getFixtures = async () => await getResult(`${api_url}/fixtures`);
export const getElementSummary = async (id) => await getResult(`${api_url}/element-summary/${id}`);
export const getLiveEvent = async (gw) => await getResult(`${api_url}/live-event/${gw}`)
