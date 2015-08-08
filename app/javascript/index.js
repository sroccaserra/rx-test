import * as Rx from 'rx';

$(() => {
    const refreshButton = document.querySelector('.refresh');
    const refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

    const requestStream = refreshClickStream
        .map(() => {
            const randomOffset = Math.floor(Math.random()*500);
            return 'https://api.github.com/users?since=' + randomOffset;
        })
        .startWith('https://api.github.com/users');

    const responseStream = requestStream.flatMap(
        (requestUrl) => Rx.Observable.fromPromise($.getJSON(requestUrl))
    );

    responseStream.subscribe((response) => {
        const [first, second, third] = response;
        document.getElementById('result').innerHTML = `
            ${first.login}
            <img src="${first.avatar_url}" width="auto" height="50px">
            ${second.login}
            <img src="${second.avatar_url}" width="auto" height="50px">
            ${third.login}
            <img src="${third.avatar_url}" width="auto" height="50px">
        `
    });
});

