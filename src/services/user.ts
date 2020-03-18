import { RegisterDto } from "@/models/interface";
import { promisify } from "@/utils/common";
import http from "@/utils/http";

export function wxLogin(code: string) {
    // return http.post('/Wchat/login', {
    //     code
    // });
    return promisify({ "statusName": "启用", "recNo": "SysUser2b2fa52aa2bc499886c370b49eda947e", "realName": "彭一凡", "gender": "1", "openId": "oIt_74nFpWCZuh5ieszVpUK3o5VU", "tel": "17673097842", "IdCard": "430426199606184374", "status": 1, "workUnit": "12", "delFlag": 0, "createDate": "2020-03-02 17:38:58", "modifyDate": "2020-03-02 17:38:58", "loginStatus": 0, "session_key": "2VGMK7OeidUZnk4H0+SEdw==" })
}

export function register(params: RegisterDto) {
    return http.post('/SysUser/insert', params);
}