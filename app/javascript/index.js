import * as Rx from 'rx';

$(function () {
    var refreshButton = document.querySelector('.refresh');
    var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

    var requestStream = refreshClickStream
        .map(() => {
            var randomOffset = Math.floor(Math.random()*500);
            return 'https://api.github.com/users?since=' + randomOffset;
        }).startWith('https://api.github.com/users');

    var responseStream = requestStream.flatMap((requestUrl) => {
        return Rx.Observable.fromPromise($.getJSON(requestUrl));
    });

    responseStream.subscribe(function(response) {
        var first = response[0];
        document.getElementById('result').innerHTML = `
            ${first.login}
            <img src="${first.avatar_url}" width="auto" height="50px">
        `
    });
});

