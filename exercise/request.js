var request = require('request');
var uri = 'http://house-be-manage.focus-test.cn/project/listProject';
var j = request.jar()
var cookie = request.cookie('IPLOC=CN1100; SUV=1705021551165578; wap_ad_feed=1; focus_wap_city_p=bj; focus_city_p=house; focus_city_s=bj; focus_city_c=110100; FOCUS_A_UDIG=OG9KvEWkPal059e/rAFd1wPucFToRTsUR9/Ho1YzD5BmuUVON4C9i4Yfr8L7GlQJCbYmf2pRRHIDTEHJBICvmUqDNyLaWcaCzUmxVOFDlN8GG9ecp/n8R7cNXrK6qhPgEVeLlDE5iVuwEkiM6mttESEr1orM6pBcp7rgYqRYIyg=')
j.setCookie(cookie, uri, function (err, cookie){
    console.log(cookie);
})
var options = {  
    hostname: 'house-be-manage.focus-test.cn',  
    port: 80,
    uri: uri,  
    method: 'GET',
    jar: j
};
request('http://www.baidu.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
    else {
        console.log(error);
    }
})