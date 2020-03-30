const getRandomInt = (maxNum, minNum) => {
    let num = Math.floor(Math.random() * (maxNum - minNum) + minNum );
    return num;
}

export default getRandomInt;