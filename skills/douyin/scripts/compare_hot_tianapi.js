#!/usr/bin/env node

/**
 * 抖音热搜榜 - 对比历史数据
 * Usage: node compare_hot_tianapi.js [date1] [date2]
 * Example: node compare_hot_tianapi.js 2026-02-02 2026-02-03
 */

const fs = require('fs');
const path = require('path');

const dataDir = '/root/clawd/skills/douyin/data/hot';

// 如果没有指定日期，使用昨天和今天
const date1 = process.argv[2] || new Date(Date.now() - 86400000).toISOString().slice(0, 10);
const date2 = process.argv[3] || new Date().toISOString().slice(0, 10);

function compareHot() {
  try {
    const file1 = path.join(dataDir, `hot_${date1}.json`);
    const file2 = path.join(dataDir, `hot_${date2}.json`);

    if (!fs.existsSync(file1)) {
      console.error(`❌ 未找到 ${date1} 的数据文件: ${file1}`);
      console.log(`   提示: 先运行 node monitor_hot_tianapi.js 保存数据`);
      process.exit(1);
    }

    if (!fs.existsSync(file2)) {
      console.error(`❌ 未找到 ${date2} 的数据文件: ${file2}`);
      console.log(`   提示: 先运行 node monitor_hot_tianapi.js 保存数据`);
      process.exit(1);
    }

    const data1 = JSON.parse(fs.readFileSync(file1, 'utf-8'));
    const data2 = JSON.parse(fs.readFileSync(file2, 'utf-8'));

    console.log('📊 热搜榜对比分析');
    console.log('='.repeat(50));
    console.log(`\n📅 对比时间:`);
    console.log(`   ${date1} (${data1.time})`);
    console.log(`   ${date2} (${data2.time})`);

    const words1 = new Map(data1.list.map(item => [item.word, { ...item, rank1: data1.list.findIndex(i => i.word === item.word) + 1 }]));
    const words2 = new Map(data2.list.map(item => [item.word, { ...item, rank2: data2.list.findIndex(i => i.word === item.word) + 1 }]));

    // 新上榜
    const newItems = data2.list.filter(item => !words1.has(item.word));
    console.log(`\n🆕 ${date2} 新上榜 (${newItems.length} 条):`);
    newItems.slice(0, 10).forEach((item, index) => {
      console.log(`   ${index + 1}. ${item.word} (热度: ${item.hotindex?.toLocaleString()})`);
    });

    // 跌出榜
    const droppedItems = data1.list.filter(item => !words2.has(item.word));
    console.log(`\n📉 ${date1} 跌出榜 (${droppedItems.length} 条):`);
    droppedItems.slice(0, 10).forEach((item, index) => {
      console.log(`   ${index + 1}. ${item.word} (原热度: ${item.hotindex?.toLocaleString()})`);
    });

    // 排名变化
    const rankingChanges = [];
    data1.list.forEach(item => {
      if (words2.has(item.word)) {
        const rank1 = words1.get(item.word).rank1;
        const rank2 = words2.get(item.word).rank2;
        if (rank1 !== rank2) {
          rankingChanges.push({
            word: item.word,
            rank1,
            rank2,
            change: rank1 - rank2,
            hot1: item.hotindex,
            hot2: words2.get(item.word).hotindex
          });
        }
      }
    });

    // 排名上升最多
    const rose = rankingChanges
      .filter(item => item.change > 0)
      .sort((a, b) => b.change - a.change)
      .slice(0, 10);

    if (rose.length > 0) {
      console.log(`\n📈 排名上升 Top 10:`);
      rose.forEach((item, index) => {
        const hotChange = item.hot2 - item.hot1;
        const hotChangeStr = hotChange > 0 ? `+${hotChange.toLocaleString()}` : hotChange.toLocaleString();
        console.log(`   ${index + 1}. ${item.word}`);
        console.log(`      ${item.rank1} → ${item.rank2} (${item.change > 0 ? '+' : ''}${item.change} 位)`);
        console.log(`      热度: ${hotChangeStr}`);
      });
    }

    // 排名下降最多
    const fell = rankingChanges
      .filter(item => item.change < 0)
      .sort((a, b) => a.change - b.change)
      .slice(0, 10);

    if (fell.length > 0) {
      console.log(`\n📉 排名下降 Top 10:`);
      fell.forEach((item, index) => {
        const hotChange = item.hot2 - item.hot1;
        const hotChangeStr = hotChange > 0 ? `+${hotChange.toLocaleString()}` : hotChange.toLocaleString();
        console.log(`   ${index + 1}. ${item.word}`);
        console.log(`      ${item.rank1} → ${item.rank2} (${item.change} 位)`);
        console.log(`      热度: ${hotChangeStr}`);
      });
    }

    // Top 10 对比
    console.log(`\n🏆 Top 10 对比:`);
    console.log('   排名 | 昨日热搜 | 今日热搜 | 变化');
    console.log('   -----|----------|----------|------');

    for (let i = 1; i <= 10; i++) {
      const word1 = data1.list[i - 1]?.word || '-';
      const word2 = data2.list[i - 1]?.word || '-';
      let change = '';

      if (word1 === word2 && word1 !== '-') {
        change = '  ➡️  ';
      } else if (word1 !== '-' && word2 !== '-') {
        const word1Rank = data2.list.findIndex(item => item.word === word1);
        const word2Rank = data1.list.findIndex(item => item.word === word2);
        if (word1Rank > -1) {
          change = `↓${word1Rank + 1}`;
        } else if (word2Rank > -1) {
          change = `↑${i}`;
        }
      }

      console.log(`   ${(i).toString().padStart(4)} | ${word1.padEnd(12).slice(0, 12)} | ${word2.padEnd(12).slice(0, 12)} | ${change}`);
    }

    console.log('\n' + '='.repeat(50));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

compareHot();
