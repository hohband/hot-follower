#!/usr/bin/env node

/**
 * 抖音热搜榜 - 搜索特定话题
 * Usage: node search_hot_tianapi.js <keyword>
 */

const TianAPI = require('../lib/tianapi');

const apiKey = process.env.TIANAPI_KEY || '';
const keyword = process.argv[2];

if (!apiKey) {
  console.error('Error: TIANAPI_KEY 环境变量未设置');
  process.exit(1);
}

if (!keyword) {
  console.error('Error: 请提供搜索关键词');
  console.error('Usage: node search_hot_tianapi.js <keyword>');
  console.error('Example: node search_hot_tianapi.js 明天立春了');
  process.exit(1);
}

const api = new TianAPI(apiKey);

async function searchHot() {
  try {
    console.log(`🔍 正在热搜榜中搜索 "${keyword}"...\n`);

    const result = await api.getDouyinHot();

    if (result && result.list && result.list.length > 0) {
      const matches = result.list.filter(item =>
        item.word.toLowerCase().includes(keyword.toLowerCase())
      );

      if (matches.length > 0) {
        console.log(`✅ 找到 ${matches.length} 条匹配的热搜\n`);

        const labelNames = {
          1: '🆕',
          2: '⭐',
          3: '🔥'
        };

        matches.forEach((item, index) => {
          const label = labelNames[item.label] || '';
          const hotIndex = item.hotindex ? item.hotindex.toLocaleString() : '';
          console.log(`${label} ${item.word}`);
          if (hotIndex) {
            console.log(`   热度: ${hotIndex}`);
          }
          console.log('');
        });
      } else {
        console.log(`❌ 未找到包含 "${keyword}" 的热搜`);
        console.log('\n💡 当前热搜 Top 10:');
        result.list.slice(0, 10).forEach((item, index) => {
          console.log(`   ${(index + 1).toString().padStart(2)}. ${item.word}`);
        });
      }
    } else {
      console.log('未找到热搜数据');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

searchHot();
