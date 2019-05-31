/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**手机 */
export var validateMobilePhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('负责人手机号不可为空'));
  } else {
    if (value !== '') {
      var reg = /^1[3456789]\d{9}$/;
      if (!reg.test(value)) {
        callback(new Error('请输入有效的手机号码'));
      }
    }
    callback();
  }
};
/**邮箱 */

export var validateEmail = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请正确填写邮箱'));
  } else {
    if (value !== '') {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(value)) {
        callback(new Error('请输入有效的邮箱'));
      }
    }
    callback();
  }
};
/**密码 */

export var validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请设置正确格式的密码'));
  } else if (value.length < 6) {
    callback(new Error('密码长度最小6位'));
  } else {
    callback();
  }
};
/**固话 */

export var validatePhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('机构电话不可为空'));
  } else {
    if (value !== '') {
      var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号或者座机号格式为：0000-0000000'));
      }
    }
    callback();
  }
};

/**微信 */
export var validateWeixin = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('微信号不能为空'));
  } else {
    var reg = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
    if (!reg.test(value)) {
      callback(new Error('请输入正确的微信号码'));
    } else {
      callback();
    }
  }
};
