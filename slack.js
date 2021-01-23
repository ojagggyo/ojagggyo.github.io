// JQuery の $.ajax を使った場合
function slack(message) {
    const url = 'https://hooks.slack.com/services/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';
    const data = {
        text: message
    };
    $.ajax({
        type: 'POST',
        url:  url,
        data: `payload=${JSON.stringify(data)}`
    });
}
