export const promiseTimeout = async (ms: number, promise: Promise<any>, timeoutMessage?: string) => {
    let timerID: any;

    const timer = new Promise((resolve, reject) => {
        timerID = setTimeout(() => reject(timeoutMessage), ms);
    });

    const result = await Promise.race([promise, timer]);
    clearTimeout(timerID);
    return result;
};