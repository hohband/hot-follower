#!/usr/bin/env node

/**
 * 抖音热搜榜 - 监控热搜变化
 * 保存当前热搜到 JSON 文件，用于后续分析
 * Usage: node monitor_hot_tianapi.js [output_file]
 */

const TianAPI = require('../lib/tianapi');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.TIANAPI_KEY || '';
const outputDir = '/root/clawd/skills/douyin/data/hot';
const outputFile = process.argv[2] || path.join(outputDir, `hot_${new Date().toISOString().slice(0, 10)}.json`);

if (!apiKey) {
  console.error('Error: TIANAPI_KEY 环境变量未设置');
  process.exit(1);
}

const api = new TianAPI(apiKey);

async function monitorHot() {
  try {
    // 确保输出目录存在
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log('📡 正在监控抖音热搜榜...\n');

    const result = await api.getDouyinHot();

    if (result && result.list && result.list.length > 0) {
      const timestamp = new Date().toISOString();
      const data = {
        timestamp,
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toISOString().slice(11, 19),
        total: result.list.length,
        list: result.list
      };

      // 保存到文件
      fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));

      console.log(`✅ 热搜数据已保存`);
      console.log(`   📁 文件: ${outputFile}`);
      console.log(`   📊 数量: ${data.total} 条`);
      console.log(`   🕐 时间: ${data.time}`);

      // 检查是否有新热搜（对比昨天）
      const yesterdayFile = path.join(outputDir, `hot_${new Date(Date.now() - 86400000).toISOString().slice(0, 10)}.json`);
      if (fs.existsSync(yesterdayFile)) {
        const yesterdayData = JSON.parse(fs.readFileSync(yesterdayFile, 'utf-8'));
        const yesterdayWords = new Set(yesterdayData.list.map(item => item.word));

        const newItems = result.list.filter(item => !yesterdayWords.has(item.word));
        const droppedItems = yesterdayData.list.filter(item => !result.list.some(curr => curr.word === item.word));

        if (newItems.length > 0) {
          console.log(`\n🆕 新上榜 (${newItems.length} 条):`);
          newItems.slice(0, 5).forEach(item => {
            console.log(`   • ${item.word} (热度: ${item.hotindex?.toLocaleString()})`);
          });
        }

        if (droppedItems.length > 0) {
          console.log(`\n📉 跌出榜 (${droppedItems.length} 条):`);
          droppedItems.slice(0, 5).forEach(item => {
            console.log(`   • ${item.word}`);
          });
        }
      }

      console.log(`\n🔥 当前热搜 Top 5:`);
      result.list.slice(0, 5).forEach((item, index) => {
        console.log(`   ${(index + 1)}. ${item.word} - ${item.hotindex?.toLocaleString()}`);
      });

    } else {
      console.log('未找到热搜数据');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

monitorHot();
