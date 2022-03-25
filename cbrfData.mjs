import getRemoteData from "./getRemoteData.mjs";

const cbrfData = async (url) => {
   try {
        let rawData = await getRemoteData(url);
        const rubRate = {};
        let rateDate = rawData.Date;
        rateDate = new Date(Date.parse(rateDate));
        rubRate['date'] = rateDate.toLocaleString('ru');
        let data = rawData.Valute;
        Object.keys(data).forEach(elem => rubRate[elem] = data[elem].Value);
        return rubRate;
    }catch (e) {
       throw new Error(e)
   }
}

export default cbrfData;