/*
  手机号码校验规则
 */
export function valudMobile() {
  return /^1[3-9]\d{9}$/
}

/*
  密码校验规则
*/
export function valudPass() {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
}
