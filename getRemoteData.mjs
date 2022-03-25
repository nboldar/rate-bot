import https from 'https'

function getRemoteData(url) {
    return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                const {statusCode} = res;
                const contentType = res.headers['content-type'];
                let error;
                // Any 2xx status code signals a successful response but
                // here we're only checking for 200.
                if (statusCode !== 200) {
                    error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
                }
                // else if (!/^application\/json/.test(contentType)) {
                //     error = new Error('Invalid content-type.\n' +
                //         `Expected application/json but received ${contentType}`);
                // }
                if (error) {
                    throw error(error.message);
                    // Consume response data to free up memory
                    res.resume();
                    reject(error);
                }
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => {
                    rawData += chunk;
                });
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(rawData))
                    } catch (e) {
                        throw error(e.message);
                        reject(e)
                    }
                });

            }).on('error', (e) => {
                throw new Error(`Got error: ${e.message}`);
                reject(e)
            });
        }
    )

}

export default getRemoteData;