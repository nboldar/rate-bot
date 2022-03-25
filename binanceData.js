import getRemoteData from "./getRemoteData.mjs";

const binanceData = async (url) => {
    try {
        const data = await getRemoteData(url);
        const rateDate = new Date(Date.now());
        data['date'] = rateDate.toLocaleString('ru');
        return data;
    }catch (e) {
        throw new Error(e)
    }
}

export default binanceData;