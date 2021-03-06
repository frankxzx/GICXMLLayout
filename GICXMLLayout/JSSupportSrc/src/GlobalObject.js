/**
 * 将对象转换成数组
 * @param obj
 * @returns {Array}
 * @constructor
 */
function ObjectToArray(obj) {
  const arr = [];
  Object.keys(obj).forEach((key) => {
    arr.push({ $k: key, $v: obj[key] });
  });
  return arr;
}

/**
 * 在某个对象上执行动态脚本
 * @param script
 * @returns {*}
 */
Object.prototype.executeScript = function (script, value1, value2) {
  return (new Function(script)).call(this, value1, value2);
};

// 将对象转换成JSON字符串
Object.prototype.toJsonString = function () {
  let jsonString = null;
  try {
    jsonString = JSON.stringify(this);
  } catch (e) {
    jsonString = 'convert to json error!';
  }
  return jsonString;
};

/**
 * 判断对象是否是数组
 * @returns {boolean}
 */
Object.prototype.isArray = function () {
  return this instanceof Array;
};

// 为string 添加扩展函数，主要用来做属性转换
/**
 * 转成int
 * @returns {Number}
 */
String.prototype.toInt = function () {
  return parseInt(this, 0);
};

/**
 * 转成float
 * @returns {Number}
 */
String.prototype.toFloat = function () {
  return parseFloat(this);
};


String.prototype.toColor = function () {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  let sColor = this.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    const sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`, 0));
    }
    return `RGB(${sColorChange.join(',')})`;
  }
  return sColor;
};

// Module 模块  参考：http://www.ruanyifeng.com/blog/2015/05/require.html
const Module = function (fileName = null, moduleMode = true) {
  this.exports = null;
  this.filename = fileName;
  this.moduleMode = moduleMode;
};

Module.requireJS = function (fileName, jsStr, moduleMode = true) {
  const module = new Module(fileName, moduleMode);
  if (moduleMode) {
    this.executeScript(`var module = arguments[0];${jsStr}`, module);
  }
  Module._cache[fileName] = module;// 缓存
  return module;
};

Module.requireJson = function (fileName, jsonStr) {
  const module = new Module(fileName);
  module.exports = JSON.parse(jsonStr);
  Module._cache[fileName] = module;// 缓存
  return module;
};
Module._cache = {};
// 从缓存中获取获取
Module._fromCache = function (fileName) {
  const cachedModule = Module._cache[fileName];
  return cachedModule;
};