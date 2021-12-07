
/*获取当前页url*/
export function getCurrentPageUrl(){
    let pages = getCurrentPages()    //获取加载的页面
    let currentPage = pages[pages.length-1]    //获取当前页面的对象
    let url = currentPage.route    //当前页面url
    return url
}

/*获取当前页带参数的url*/
export function getCurrentPageUrlWithArgs(){
    let pages = getCurrentPages()    //获取加载的页面
    let currentPage = pages[pages.length-1]    //获取当前页面的对象
    let url = currentPage.route    //当前页面url
    let options = currentPage.options    //如果要获取url中所带的参数可以查看options

    //拼接url的参数
    let urlWithArgs = url + '?'
    for(let key in options){
        let value = options[key]
        urlWithArgs += key + '=' + value + '&'
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length-1)

    return urlWithArgs
}


export function getCurrentPageOptions(){
    let pages = getCurrentPages()    //获取加载的页面

    let currentPage = pages[pages.length-1]    //获取当前页面的对象

    let url = currentPage.route    //当前页面url

    let options = currentPage.options    //如果要获取url中所带的参数可以查看options
    return options
}

/**
 *  判断传入参数的类型，以字符串的形式返回
 *  @obj：数据
 **/
function dataType(obj){
    if (obj===null) return "Null";
    if (obj===undefined) return "Undefined";
    return Object.prototype.toString.call(obj).slice(8,-1);
};

/**
 * 处理对象参数值，排除对象参数值为”“、null、undefined，并返回一个新对象
 **/
export function dealObjectValue(obj){
    let param = {};
    if ( obj === null || obj === undefined || obj === "" ) return param;
    for ( let key in obj ){
        if ( dataType(obj[key]) === "Object" ){
            param[key] = dealObjectValue(obj[key]);
        }else if(  obj[key] !== null && obj[key] !== undefined && obj[key] !== ""  ){
            param[key] = obj[key];
        }
    }
    return param;
};

/**
 * 渲染表单时进行过滤
 * @params: data,form
 * @return: filtered form
 */
export function filterFormData(data,form){
    for (let i in data) {
        for (let j in form){
            if (i === j){
                //将null等转化成’‘，避免渲染成’null‘
                if (data[i] === null || data[i] === undefined || data[i] === false){
                    form[j] = ''
                }else {
                    form[j] = data[i]
                }
            }
        }
    }
    return form;
};

/**
 * 对比两组数组是否相同
 * @params: data,form
 * @return: true false
 */
export function compareFormData(o1, o2){
        //标识是否相似
        let flag = true;
        let traverse = function(o1,o2){
            //如果至少有一个不是对象
            if(!(o1 instanceof Object) || !(o2 instanceof Object)){
                if(o1 !== o2){
                    flag = false;
                }
                return;
            }
            //如果两个对象的属性数量不一致
            //比如：
            //a:{name:"Jack",age:22}
            //b:{name:"Jack"}
            if(Object.keys(o1).length !== Object.keys(o2).length){
                flag = false;
            }
            //若有不同之处，尽早结束递归
            if(flag){
                //深度遍历对象
                for(let i in o1){
                    //若都是对象，继续递归
                    if(typeof o1[i] === "object" && typeof o2[i] === "object"){
                        traverse(o1[i],o2[i]);
                    }//若都不是对象，则比较值
                    else if(typeof o1[i] !== "object" && typeof o2[i] !== "object"){
                        if(o1[i] !== o2[i]){
                            flag = false;;
                        }
                    }//一个是对象，一个不是对象，肯定不相似
                    else{
                        flag = false;
                    }
                }
            }
        };
        traverse(o1,o2);
        return flag;
};

/**
 * o1∈o2，将o2对应的value设置为o1对应的value
 * @params: data,form
 * @return: true false
 */
export function exchangeObjectValue(o1, o2){
    for (let i in o1){
        for (let j in o2){
            if (i === j){
                o2[j] = o1[i]
            }
        }
    }
    return o2;
};

//分享功能封装
export function onShareAppMessage(title, path, callback, imageUrl) {
    //设置一个默认分享背景图片
    let defaultImageUrl = 'https://raw.githubusercontent.com/tombear110/markdown-image/master/share.png';
    return {
        title: title,
        path: path,
        imageUrl: imageUrl || defaultImageUrl,
        success(res) {
            if (!res.shareTickets) {
                //分享到个人
                api.shareFriend().then(() => {
                    //执行转发成功以后的回调函数
                    callback && callback();
                });
            } else {
                //分享到群
                let st = res.shareTickets[0];
                uni.getShareInfo({
                    shareTicket: st,
                    success(res) {
                        let iv = res.iv
                        let encryptedData = res.encryptedData;
                        api.groupShare(encryptedData, iv).then(() => {
                            console.warn("groupShareSuccess!");
                            //执行转发成功以后的回调函数
                            callback && callback();
                        });
                    }
                });
            }
        },
        fail: function (res) {
            console.log("转发失败！");
        }
    };
}

//分享朋友圈
export function onShareTimeline(title, path, callback, imageUrl) {
    //设置一个默认分享背景图片
    let defaultImageUrl = 'https://raw.githubusercontent.com/tombear110/markdown-image/master/share.png';
    return {
        title: title,
        imageUrl: imageUrl || defaultImageUrl,
        success(res) {
            console.log(res)
        },
        fail: function (res) {
            console.log("转发失败！");
        }
    };
}

/**
 * 获取今天的日期  YYY-mm-dd
 */
export function getToday(){
    let dd = new Date();
    let y = dd.getFullYear();
    let m = dd.getMonth()+1;//获取当前月份的日期
    let d = dd.getDate();
    let date =  y+"-"+m+"-"+d;
    return date;
};

/**
 * 获取明天的日期  YYY-mm-dd
 */
export function getTomorrow(){
    let dd = new Date();
    dd.setDate(dd.getDate() + 1);//明天
    let y = dd.getFullYear();
    let m = dd.getMonth()+1;//获取当前月份的日期
    let d = dd.getDate();
    let date =  y+"-"+m+"-"+d;
    return date;
};

/**
 * 获取现在的时间戳
 */
export function getNowTime(){
    let time = new Date().getTime();
    return time;
};

/**
 * 获取制定日期的时间戳
 */
export function getDateTime(val){
    let time = new Date(val);
    return time;
};