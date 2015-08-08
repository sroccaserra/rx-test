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
        requestUrl => Rx.Observable.fromPromise($.getJSON(requestUrl))
    );

    responseStream.subscribe(response => {
        const firstThree = response.slice(0, 3);
        document.getElementById('result').innerHTML =
            firstThree.map(user => `<div>
                <img src="${user.avatar_url}" width="auto" height="50px">
                ${user.login}
            </div>`).join('\n');
    });
});

