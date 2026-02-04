#!/usr/bin/env node

/**
 * 抖音热榜定时监控
 * 每小时自动获取热榜并保存
 */

const TianAPI = require('../lib/tianapi');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.TIANAPI_KEY || '10f6d32d4e511b6334bc11925184128a';
const dataDir = '/root/clawd/skills/douyin/data/hot';

const api = new TianAPI(apiKey);

async function monitorHot() {
  try {
    // 确保目录存在
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    console.log(`[${new Date().toISOString()}] 📡 正在获取抖音热榜...`);

    // 获取热榜
    const result = await api.getDouyinHot();

    if (result && result.list && result.list.length > 0) {
      const now = new Date();
      const timestamp = now.toISOString();
      const date = now.toISOString().slice(0, 10);
      const time = now.toISOString().slice(11, 19);
      const hour = now.getHours();

      const data = {
        timestamp,
        date,
        time,
        hour,
        total: result.list.length,
        list: result.list
      };

      // 保存到文件（按小时）
      const filename = path.join(dataDir, `hot_${date}_${hour.toString().padStart(2, '0')}.json`);
      fs.writeFileSync(filename, JSON.stringify(data, null, 2));

      console.log(`[${new Date().toISOString()}] ✅ 热榜已保存: ${filename}`);
      console.log(`[${new Date().toISOString()}] 📊 数量: ${data.total} 条`);

      // 检测变化（对比上一个小时）
      const lastHour = hour === 0 ? 23 : hour - 1;
      const lastFile = hour === 0
        ? path.join(dataDir, `hot_${new Date(now.getTime() - 86400000).toISOString().slice(0, 10)}_23.json`)
        : path.join(dataDir, `hot_${date}_${lastHour.toString().padStart(2, '0')}.json`);

      if (fs.existsSync(lastFile)) {
        const lastData = JSON.parse(fs.readFileSync(lastFile, 'utf-8'));
        const lastWords = new Set(lastData.list.map(item => item.word));

        const newItems = result.list.filter(item => !lastWords.has(item.word));
        const droppedItems = lastData.list.filter(item => !result.list.some(curr => curr.word === item.word));

        if (newItems.length > 0 || droppedItems.length > 0) {
          console.log(`[${new Date().toISOString()}] 🔄 热榜变化:`);

          if (newItems.length > 0) {
            console.log(`   🆕 新上榜 (${newItems.length} 条): ${newItems.slice(0, 3).map(i => i.word).join(', ')}`);
          }

          if (droppedItems.length > 0) {
            console.log(`   📉 跌出榜 (${droppedItems.length} 条): ${droppedItems.slice(0, 3).map(i => i.word).join(', ')}`);
          }

          // 保存变化记录
          const changeFile = path.join(dataDir, `changes_${date}.json`);
          let changes = [];
          if (fs.existsSync(changeFile)) {
            changes = JSON.parse(fs.readFileSync(changeFile, 'utf-8'));
          }

          changes.push({
            timestamp,
            time,
            new_items: newItems.slice(0, 10).map(i => ({ word: i.word, hotindex: i.hotindex })),
            dropped_items: droppedItems.slice(0, 10).map(i => i.word)
          });

          fs.writeFileSync(changeFile, JSON.stringify(changes, null, 2));
        }
      }

      console.log(`[${new Date().toISOString()}] ✅ 监控完成\n`);

    } else {
      console.log(`[${new Date().toISOString()}] ❌ 未获取到热榜数据\n`);
      process.exit(1);
    }

  } catch (error) {
    console.error(`[${new Date().toISOString()}] ❌ 错误:`, error.message);
    process.exit(1);
  }
}

monitorHot();
