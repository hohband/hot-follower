#!/usr/bin/env node

/**
 * 获取抖音热搜榜 (使用天行数据)
 * API文档: https://www.tianapi.com/apiview/155
 * Usage: node get_hot_tianapi.js
 */

const TianAPI = require('../lib/tianapi');

const apiKey = process.env.TIANAPI_KEY || '';

if (!apiKey) {
  console.error('Error: TIANAPI_KEY 环境变量未设置');
  console.error('请先设置环境变量：export TIANAPI_KEY="your_api_key"');
  process.exit(1);
}

const api = new TianAPI(apiKey);

async function getHotSearch() {
  try {
    console.log('🔥 正在获取抖音热搜榜...\n');

    const result = await api.getDouyinHot();

    if (result && result.list && result.list.length > 0) {
      console.log(`✅ 成功获取 ${result.list.length} 条热搜\n`);

      // 标签说明: 1=新, 2=荐, 3=热
      const labelNames = {
        1: '🆕',
        2: '⭐',
        3: '🔥'
      };

      result.list.forEach((item, index) => {
        const label = labelNames[item.label] || '';
        const hotIndex = item.hotindex ? item.hotindex.toLocaleString() : '';
        console.log(`${(index + 1).toString().padStart(2)} ${label} ${item.word}`);
        if (hotIndex) {
          console.log(`    热度: ${hotIndex}`);
        }
        console.log('');
      });
    } else {
      console.log('未找到热搜数据');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

getHotSearch();
