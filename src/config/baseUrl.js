/**
 * @author jm
 * @create 2020-01-06 15:41
 * @desc   系统请求url前缀 （API_DOOR：接口前缀，redirect_door：商户后地址前缀，WS_DOOR：websocket地址前缀）
 */

const pro = {
  API_DOOR: 'http://ls.zhonglunnet.com/mt/pos',
  redirect_door: 'http://ls.zhonglunnet.com/',
  WS_DOOR: 'ws://ls.zhonglunnet.com/wsms-web/websocket/',
  log_url:'http://hm.zhonglunnet.com/hm.gif'
}

const pre = {
  API_DOOR: 'http://pospre.cnzhonglunnet.com/',
  redirect_door: 'http://lspre.cnzhonglunnet.com/',
  WS_DOOR: 'ws://192.168.1.234:8080/wsms-web/websocket/',
  log_url:'http://hmpre.cnzhonglunnet.com/hm.gif'
}

const sit = {
  API_DOOR: 'http://possit.cnzhonglunnet.com/',
  redirect_door: 'http://lssit.cnzhonglunnet.com/',
  WS_DOOR: 'ws://lssit.zhonglunnet.com/wsms-web/websocket/',
  log_url:'http://hmsit.cnzhonglunnet.com/hm.gif'
}

const dev = {
  API_DOOR: 'http://posdev.cnzhonglunnet.com/',
  redirect_door: 'http://lsdev.cnzhonglunnet.com/',
  log_url:'http://hmdev.cnzhonglunnet.com/hm.gif'
}

const uat = {
  API_DOOR: 'http://posuat.cnzhonglunnet.com/',
  redirect_door: 'http://lsuat.cnzhonglunnet.com/',
  WS_DOOR: 'ws://192.168.1.41:8080/wsms-web/websocket/',
  log_url:'http://hmuat.cnzhonglunnet.com/hm.gif'
}

const sim = {
  API_DOOR: 'http://possim.cnzhonglunnet.com/',
  redirect_door: 'http://lssim.cnzhonglunnet.com/',
  WS_DOOR: 'ws://lssim.zhonglunnet.com/wsms-web/websocket/',
  log_url:'http://hmsim.cnzhonglunnet.com/hm.gif'
}

const yapi = {
  API_DOOR: 'http://yapi.cnzhonglunnet.com/mock/564/',
}


const other = {
  API_DOOR: '',
  redirect_door: '',
  WS_DOOR: ''
}

export default {pro, pre, sit, dev, uat,sim, yapi, other}
