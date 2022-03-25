import cluster from 'cluster'
import os from 'os'

const createWorker = (cluster) => {
    const worker = cluster.fork();
    console.log(`Worker created, it's pid:${worker.process.pid}`);
    worker.on('exit', () => {
        console.log(`Worker died with pid:${worker.process.pid}`);
        cluster.fork()
    });
};

cluster.setupPrimary({
    exec: "./index.js"
});

if (cluster.isPrimary) {
    // let i = os.cpus().length;
    // console.log(`Master started. CPU num is ${i}`);
    // while (i > 0) {
        createWorker(cluster);
    //     i--;
    // }
}
export {cluster};