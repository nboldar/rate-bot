const date = () => {

    let now = new Date(Date.now());

    return  now.toLocaleString('ru');
}
console.log(date())