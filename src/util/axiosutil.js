import axios from 'axios'
import qs from 'qs'
import apiDoors from '../config/apiDoors'
import globalDataTools from './globalData/globalDataTools'
import baseUrl from '../config/baseUrl'
import $store from '../store'
import zlDialog from '../components/extends/zlDialog'
import zlLoading from '../components/extends/loading'
import zlToast from '../components/extends/zlToast'
/**
 * @author jm
 * @create 2019-05-07 11:11
 * @desc   Promise封装ajax
 */
class AxiosUtil {
  // 基本ajax请求(post请求类型)
  static post(options) {
    const start_time = new Date().getTime()

    const params = this.chooseBaseUrl(options)
    return new Promise((resolve, reject) => {
      axios(params).then(response => {
        const end_time = new Date().getTime()
        let mdType = 'failed'
        if (response.status === 200) {
          let res = response.data
          resolve(res)
          mdType = 'success'
        } else {
          reject(response.data)
          mdType = 'failed'
        }
        this.buried(apiDoors[options.url], end_time - start_time, mdType)
      }).catch(err => {
        reject(err)
        const end_time = new Date().getTime()
        this.buried(apiDoors[options.url], end_time - start_time, 'failed')
      })
    })
  }

  // 错误信息，全部拦截请求
  static get(options) {
    const start_time = new Date().getTime()

    const params = this.chooseBaseUrl(options)
    return new Promise((resolve, reject) => {
      const network = $store.state.device.network
      if (!network) {
        zlToast({message: '离线状态，不能处理此操作'})
        zlLoading.close()
        return
      }
      axios(params).then(response => {
        const end_time = new Date().getTime()
        let mdType = 'failed'
        if (response.status === 200) {
          let res = response.data
          resolve(res)
          mdType = 'success'
        } else {
          zlToast({message: res.errormsg})
          mdType = 'failed'
        }
        this.buried(apiDoors[options.url], end_time - start_time, mdType)
      }).catch(err => {
        zlToast({message: '提交失败，网络不稳定，请重新提交操作'})
        const end_time = new Date().getTime()
        this.buried(apiDoors[options.url], end_time - start_time, 'failed')
      })
    })
  }

  // 选择请求路径前缀
  static chooseBaseUrl(options) {
    const urlConfig = {
		API_DOOR:"http://posuat.cnzhonglunnet.com/",		WS_DOOR:"ws://192.168.1.41:8080/wsms-web/websocket/",		log_url:"http://hmuat.cnzhonglunnet.com/hm.gif",		redirect_door:"http://lsuat.cnzhonglunnet.com/"
	}
    // const EnvTest = globalDataTools.getGlobalData('EnvTest')
	const EnvTest = 'uat'
    let env = options.env || EnvTest
    const access_code = globalDataTools.getGlobalData('access_code')
    options.data.access_code = access_code || ''
    let result = {
      url: apiDoors[options.url],
      timeout: options.timeout || 20000
    }
    if (EnvTest == 'pro') {
      return {
        ...result,
        method: 'post',
        baseURL: urlConfig.API_DOOR,
        data: qs.stringify(options.data)
      }
    }
    if (env == 'yapi') {
      return {
        ...result,
        method: 'get',
        baseURL: baseUrl[env].API_DOOR,
        params: options.data
      }
    } else {
      return {
        ...result,
        method: 'post',
        baseURL: baseUrl[env].API_DOOR,
        data: qs.stringify(options.data)
      }
    }
  }

  // 线上接口埋点
  static buried(url, interval, status) {
    url = encodeURIComponent(url)
    const time = new Date().getTime()
    const urlConfig = {
    	API_DOOR:"http://posuat.cnzhonglunnet.com/",
    	WS_DOOR:"ws://192.168.1.41:8080/wsms-web/websocket/",
    	log_url:"http://hmuat.cnzhonglunnet.com/hm.gif",
    	redirect_door:"http://lsuat.cnzhonglunnet.com/"
    }

    let picPrefix = `${urlConfig.log_url}?type=intfanalysis&source=pos&t=`
    document.getElementById('mm_img_block').innerHTML = `<img style="display: none" src="${picPrefix}${time}&url=${url}&handtime=${interval}&result=${status}"/>`
  }
}

export default AxiosUtil
