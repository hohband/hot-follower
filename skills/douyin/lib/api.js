/**
 * 抖音 API 封装库
 *
 * 提供认证、Token 刷新和 API 调用功能
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

// API 配置
const API_BASE = 'https://developer.toutiao.com'; // 抖音开放平台 API 基础地址

// Token 缓存
let accessToken = null;
let tokenExpiry = 0;

/**
 * HTTP 请求封装
 */
function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;

    const req = client.request(
      {
        ...urlObj,
        method: options.method || 'GET',
        headers: options.headers || {},
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (json.code === 0 || json.err_no === 0) {
              resolve(json);
            } else {
              reject(new Error(`API Error: ${JSON.stringify(json)}`));
            }
          } catch (e) {
            // 如果不是 JSON，直接返回
            resolve({ data });
          }
        });
      }
    );

    req.on('error', reject);

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

/**
 * 获取 Access Token
 *
 * @param {string} appId - 应用 ID
 * @param {string} appSecret - 应用密钥
 * @returns {Promise<string>} Access Token
 */
async function getAccessToken(appId, appSecret) {
  console.log('获取 Access Token...');
  
  const url = `${API_BASE}/oauth2/access_token?` +
    `appid=${appId}&` +
    `secret=${appSecret}`;

  const response = await request(url);

  if (response.access_token) {
    accessToken = response.access_token;
    // 抖音 access_token 有效期通常为 2 小时，提前 5 分钟刷新
    tokenExpiry = Date.now() + (response.expires_in - 300) * 1000;
    console.log('✅ Access Token 获取成功');
    return accessToken;
  }

  throw new Error('获取 Access Token 失败: ' + JSON.stringify(response));
}

/**
 * 刷新 Access Token
 *
 * @param {string} appId - 应用 ID
 * @param {string} refreshToken - 刷新令牌
 * @returns {Promise<string>} 新的 Access Token
 */
async function refreshAccessToken(appId, refreshToken) {
  console.log('刷新 Access Token...');
  
  const url = `${API_BASE}/oauth2/refresh_token?` +
    `appid=${appId}&` +
    `grant_type=refresh_token&` +
    `refresh_token=${refreshToken}`;

  const response = await request(url);

  if (response.access_token) {
    accessToken = response.access_token;
    tokenExpiry = Date.now() + (response.expires_in - 300) * 1000;
    console.log('✅ Access Token 刷新成功');
    return accessToken;
  }

  throw new Error('刷新 Access Token 失败: ' + JSON.stringify(response));
}

/**
 * 获取有效的 Access Token
 * 自动处理获取和刷新逻辑
 *
 * @returns {Promise<string>} 有效的 Access Token
 */
async function getValidToken() {
  const appId = process.env.DOUYIN_APP_ID;
  const appSecret = process.env.DOUYIN_APP_SECRET;
  const refreshToken = process.env.DOUYIN_REFRESH_TOKEN;

  if (!appId || !appSecret) {
    throw new Error('缺少环境变量: DOUYIN_APP_ID 或 DOUYIN_APP_SECRET');
  }

  // 如果 token 还有效，直接返回
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  // 尝试使用 refresh_token 刷新
  if (refreshToken && accessToken) {
    try {
      return await refreshAccessToken(appId, refreshToken);
    } catch (e) {
      console.log('刷新失败，重新获取...');
    }
  }

  // 重新获取 token
  return await getAccessToken(appId, appSecret);
}

/**
 * API 调用封装
 *
 * @param {string} endpoint - API 端点
 * @param {object} options - 请求选项
 * @returns {Promise<object>} API 响应
 */
async function apiCall(endpoint, options = {}) {
  const token = await getValidToken();
  const url = options.baseUrl || `${API_BASE}${endpoint}`;

  if (!options.headers) {
    options.headers = {};
  }
  options.headers['Authorization'] = `Bearer ${token}`;

  return await request(url, options);
}

/**
 * GET 请求
 */
async function get(endpoint, params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = queryString ? `${endpoint}?${queryString}` : endpoint;
  return await apiCall(url, { method: 'GET' });
}

/**
 * POST 请求
 */
async function post(endpoint, data = {}) {
  return await apiCall(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

module.exports = {
  getAccessToken,
  refreshAccessToken,
  getValidToken,
  apiCall,
  get,
  post,
};
