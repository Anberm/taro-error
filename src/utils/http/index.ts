import Taro from "@tarojs/taro";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

function timeoutInterceptor(chain) {
  const requestParams = chain.requestParams;
  let p;
  const result: any = new Promise((resolve, reject) => {
    let timeout: any = setTimeout(() => {
      timeout = null;
      reject(new Error("网络链接超时,请稍后再试！"));
    }, (requestParams && requestParams.timeout) || 60000);

    p = chain.proceed(requestParams);

    p.then(res => {
      if (!timeout) return;
      clearTimeout(timeout);
      resolve(res);
    }).catch(err => {
      timeout && clearTimeout(timeout);
      reject(err);
    });
  });
  if (typeof p.abort === "function") result.abort = p.abort;
  return result;
}
Taro.addInterceptor(timeoutInterceptor);
type Method =
  | "OPTIONS"
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "TRACE"
  | "CONNECT"
  | undefined;

function httpRequest<T>(params, method: Method = "GET") {
  let { url, data } = params;
  let contentType = "application/json";
  contentType = params.contentType || contentType;
  const option = {
    url:
      url.startsWith("http") || url.startsWith("https")
        ? url
        : SERVER_URL + url,
    data: data,
    method: method,
    header: {
      "content-type": contentType,
      Authorization: Taro.getStorageSync("Authorization")
    }
  };
  return Taro.request(option).then(async res => {
    if (res.data.errcode != 0) {
      Taro.showToast({
        title: res.data.errmsg,
        icon: "none"
      });
    }
    return res.data.Retdata || res.data;
  });
}
function httpGet<T>(url, data = "") {
  let option = { url, data };
  return httpRequest<T>(option);
}
function httPost(url, data, contentType = "application/json") {
  let params = { url, data, contentType };
  return httpRequest(params, "POST");
}
function httpPut(url, data = "") {
  let option = { url, data };
  return httpRequest(option, "PUT");
}
function httpDelete(url, data = "") {
  let option = { url, data };
  return httpRequest(option, "DELETE");
}

export default {
  get: httpGet,
  post: httPost,
  put: httpPut,
  delete: httpDelete,
  request: httpRequest
};
