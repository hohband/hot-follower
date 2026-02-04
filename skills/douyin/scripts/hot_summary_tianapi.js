#!/usr/bin/env node

/**
 * 抖音热搜榜 - 显示热搜摘要
 * Usage: node hot_summary_tianapi.js [count]
 */

const TianAPI = require('../lib/tianapi');

const apiKey = process.env.TIANAPI_KEY || '';
const count = parseInt(process.argv[2]) || 20;

if (!apiKey) {
  console.error('Error: TIANAPI_KEY 环境变量未设置');
  process.exit(1);
}

const api = new TianAPI(apiKey);

async function hotSummary() {
  try {
    console.log('🔥 抖音热搜榜摘要');
    console.log('='.repeat(40));
    console.log('');

    const result = await api.getDouyinHot();

    if (result && result.list && result.list.length > 0) {
      const list = result.list.slice(0, count);

      const labelNames = {
        1: '🆕',
        2: '⭐',
        3: '🔥'
      };

      list.forEach((item, index) => {
        const label = labelNames[item.label] || '  ';
        const rank = (index + 1).toString().padStart(2);
        const word = item.word.padEnd(20).slice(0, 20);
        const hot = item.hotindex ? (item.hotindex / 10000).toFixed(1) + '万' : 'N/A';

        console.log(`${label} ${rank}. ${word}  热度: ${hot}`);
      });

      // 热度分布
      const hotValues = list.filter(item => item.hotindex).map(item => item.hotindex);
      if (hotValues.length > 0) {
        const avgHot = Math.round(hotValues.reduce((a, b) => a + b, 0) / hotValues.length);
        console.log('');
        console.log('📊 统计:');
        console.log(`   平均热度: ${(avgHot / 10000).toFixed(1)}万`);
        console.log(`   最高热度: ${(Math.max(...hotValues) / 10000).toFixed(1)}万`);
        console.log(`   最低热度: ${(Math.min(...hotValues) / 10000).toFixed(1)}万`);
      }

      console.log('');
      console.log('='.repeat(40));
      console.log(`   更新时间: ${new Date().toLocaleString('zh-CN')}`);

    } else {
      console.log('未找到热搜数据');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

hotSummary();
