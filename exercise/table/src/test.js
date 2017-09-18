$.ajax({
    type: 'get',
    url: 'http://liwu.lixiaofan.com/picker?action=getTags',
    success: function (res) {
        console.log(res);
        // todo 
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest.status);
        console.log(XMLHttpRequest.readyState);
        console.log(textStatus);
    }
});