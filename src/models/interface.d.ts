export interface User {
  recNo: string; //表ID
  name: string; //姓名
  gender: string; //性别
  age: number; //年龄
  openId: string; //openID

  userName: string; //微信名称

  telPhone: string; //手机

  IdCard: string; //身份证
  status: number; //0停用,1启用(默认为1)
  statusName: string; //0停用,1启用(默认为1)
  workUnit: string; //工作单位/公司

  loginStatus: number; //0为注册,1已注册
}
export interface RegisterDto {
  name: string; //姓名
  gender: string; //性别
  age: number; //年龄
  openId: string; //openID

  userName: string; //微信名称

  telPhone: string; //手机

  IdCard: string; //身份证
  workUnit: string; //工作单位/公司
}

export interface TabbarDto {
  pagePath: string;
  iconPath: string;
  selectedIconPath: string;
  text: string;
}
