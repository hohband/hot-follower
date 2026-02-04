const axios = require('axios');

/**
 * 天行数据 (TianAPI) API 封装
 * 官网: https://www.tianapi.com
 * 抖音热搜榜: https://www.tianapi.com/apiview/155
 */
class TianAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://apis.tianapi.com';
  }

  async request(endpoint, params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`, {
        params: {
          key: this.apiKey,
          ...params
        }
      });

      if (response.data.code !== 200) {
        throw new Error(`TianAPI Error (${response.data.code}): ${response.data.msg}`);
      }

      return response.data.result;
    } catch (error) {
      throw new Error(`TianAPI Request Error: ${error.message}`);
    }
  }

  /**
   * 获取抖音热搜榜
   * 返回 50 条热点视频话题及热度排名
   * @returns {Promise<{list: Array<{word: string, label: number, hotindex: number}>}>}
   */
  async getDouyinHot() {
    return await this.request('/douyinhot/index');
  }

  /**
   * 抖音视频解析
   * @param {string} url - 抖音视频链接
   */
  async parseDouyinVideo(url) {
    return await this.request('/douyinvideo/index', { url });
  }

  /**
   * 获取抖音用户信息
   * @param {string} userid - 抖音用户ID
   */
  async getDouyinUser(userid) {
    return await this.request('/douyinuser/index', { userid });
  }

  /**
   * 获取抖音用户作品
   * @param {string} userid - 抖音用户ID
   * @param {number} num - 返回数量，默认 20
   * @param {number} page - 页码，默认 1
   */
  async getDouyinWork(userid, num = 20, page = 1) {
    return await this.request('/douyinwork/index', { userid, num, page });
  }

  /**
   * 获取抖音评论
   * @param {string} item_id - 视频/作品ID
   * @param {number} count - 返回数量，默认 20
   */
  async getDouyinComment(item_id, count = 20) {
    return await this.request('/douyincomment/index', { item_id, count });
  }
}

module.exports = TianAPI;
