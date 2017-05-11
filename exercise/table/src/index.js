(function () {
    'use strict';
    var inputProvince = $('#province'),
        inputCity = $('#city'),
        inputLoupanName = $('#loupan-name'),
        intputStatus = $('#status'),
        intputSource = $('#source'),
        intputCreator = $('#creator'),
        intputId = $('#loupan-id'),
        btnSub = $('#btn-sub');

    // 自定义组件
    // component: my-tr
    function templateGen(tds) {
        var td;
        var res = '<tr>';
        for (td in tds) {
            console.log(td, tds[td]);
            if (tds[td] == 'create_time' || tds[td] == 'update_time') {
                res += '<td>{{ item.' + tds[td] + ' | dateFormat }}</td>';
            } else if (tds[td] == 'status') {
                res += '<td>{{ item.' + tds[td] + ' | statusFormat }}</td>';
            } else if (tds[td] == 'source') {
                res += '<td>{{ item.' + tds[td] + ' | sourceFormat }}</td>';
            } else {
                res += '<td>{{ item.' + tds[td] + ' }}</td>';
            }
        }
        res += '</tr>';
        console.log(res);
        return res;
    }
    var arr = ['pid', 'proj_name', 'provinceName', 'cityName', 'create_time', 'update_time', 'creator', 'status', 'source'];
    var rowComp = {
        props: ['item'],
        template: templateGen(arr)
    };

    // Vue初始化
    var loupanList = [];
    var totalPage = 0;
    var pageList = [1, 2, 3, 4, '...'];
    var cityList = [];
    var provinceList = [
        {pName: '北京市', pId: 1},
        {pName: '河北省', pId: 3}
    ];
    var statusList = [
        {name: '显示', value: 1},
        {name: '隐藏', value: 0}
    ];
    var sourceList = [
        {name: '爬虫', value: 0},
        {name: '开发商', value: 1},
        {name: '个人线索', value: 2}
    ];
    var params = {'page': 1, 'count': 10};
    Vue.filter('dateFormat' , function(value) {
        var valDate = new Date(value);
        var year = valDate.getFullYear(),
            month = valDate.getMonth() + 1,
            day = valDate.getDate()
        return year + '-' + (month >= 10 ? month : ('0' + month)) + '-' + (day >= 10 ? day : ('0' + day));
    });
    Vue.filter('statusFormat' , function(value) {
        $.each(statusList, function (index, item) {
            if (value == item.value) {
                value = item.name;
            }
        });
        return value;
    });
    Vue.filter('sourceFormat' , function(value) {
        $.each(sourceList, function (index, item) {
            if (value == item.value) {
                value = item.name;
            }
        });
        return value;
    });

    var app = new Vue({
        el: '#list',
        data: {
            loupanList: loupanList,
            totalPage: totalPage,
            pageList: pageList,
            curPage: 1,
            cityList: cityList,
            provinceList: provinceList,
            params: params,
            statusList: statusList,
            sourceList: sourceList
        },
        components: {
            'row': rowComp
        }
    });

    function getLoupanList(params) {
        $.ajax({
            type: 'get',
            // url: 'http://house-be-manage.focus-test.cn/project/listProject',
            url: '/project/listProject',
            data: {'params': paramsFomat(params)},
            dataType :'json',
            success: function (res) {
                // console.log(res);
                if (res.code === 200) {
                    app.loupanList = res.data.content;
                    setPage(params.page, Math.ceil(res.data.totalNum / params.count));
                }
                else {
                    alert(res.msg);
                    app.loupanList = [];
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    }

    function setPage(cur, total) {
        if (total) {
            app.totalPage = total;
        }
        app.curPage = cur;
        var pageList = [];
        var i;
        if (total > 9 && cur <= 5) {
            for (i = 1; i < 8; i++) {
                pageList.push(i);
            }
            pageList.push('...');
        } else if (total > 9 && cur > 5) {
            pageList.push('...');
            for (i = cur - 3; i <= cur + 3; i++) {
                pageList.push(i);
            }
            pageList.push('...');
        }
        app.pageList = pageList;
        // console.log(cur + '/' + total);
    }

    function paramsFomat (params) {
        var formatedParams = JSON.parse(JSON.stringify(params));
        $.each(formatedParams, function (index, item) {
            if (!isNaN(item) && index !== 'pid') {
                formatedParams[index] = parseInt(item);
                if (formatedParams[index] === -1) {
                    delete formatedParams[index];    
                }
            }
        });
        return JSON.stringify(formatedParams);
    }

    $('#page-list').on('click', '.page-item', function (e) {
        var no = $(this).data('no');
        if (no === '«') {
            params.page = no;
            getLoupanList(params);
        } else if (no !== '...') {
            params.page = no;
            getLoupanList(params);
        }
    });

    $('#province').on('change', function (e) {
        $.ajax({
            type: 'get',
            // url: 'http://house-sv-base.focus-test.cn/city/list',
            url: '/city/list',
            data: {'provinceId': params.provinceId},
            dataType :'json',
            success: function (res) {
                // console.log(res);
                if (res.code === 1) {
                    app.cityList = res.data;
                }
                else {
                    alert(res.msg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    });

    $('#btn-sub').on('click', function (e) {
        
        // console.log(formatedParams, JSON.stringify(formatedParams));
        getLoupanList(params);
    })
    // 初始化页面
    function init (params) {
        getLoupanList(params);
    }
    init(params);
})();