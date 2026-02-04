#!/usr/bin/env node

/**
 * 抖音热榜每日分析
 * 每天中午12点汇总分析热榜数据
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const dataDir = '/root/clawd/skills/douyin/data/hot';

async function analyzeDaily() {
  try {
    const today = new Date();
    const date = today.toISOString().slice(0, 10);
    const yesterday = new Date(today.getTime() - 86400000).toISOString().slice(0, 10);

    console.log(`[${new Date().toISOString()}] 📊 开始分析 ${date} 的热榜数据\n`);

    // 获取今天的所有数据文件
    const todayFiles = fs.readdirSync(dataDir)
      .filter(f => f.startsWith(`hot_${date}`) && f.endsWith('.json'))
      .sort();

    if (todayFiles.length === 0) {
      console.log(`[${new Date().toISOString()}] ⚠️  今天还没有热榜数据\n`);
      process.exit(0);
    }

    console.log(`[${new Date().toISOString()}] 📁 找到 ${todayFiles.length} 个数据文件\n`);

    // 读取所有数据
    const allData = todayFiles.map(file => {
      const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf-8'));
      return data;
    });

    // 提取所有热搜
    const allHotWords = new Map();

    allData.forEach(data => {
      data.list.forEach((item, index) => {
        if (!allHotWords.has(item.word)) {
          allHotWords.set(item.word, {
            word: item.word,
            first_seen: data.time,
            appearances: [],
            hotindices: [],
            positions: []
          });
        }

        const record = allHotWords.get(item.word);
        record.appearances.push({
          time: data.time,
          position: index + 1,
          hotindex: item.hotindex
        });
        record.hotindices.push(item.hotindex);
        record.positions.push(index + 1);
      });
    });

    // 统计分析
    const words = Array.from(allHotWords.values());

    // 持续上榜次数排序
    const persistentWords = words
      .map(w => ({
        word: w.word,
        count: w.appearances.length,
        avgPosition: Math.round(w.positions.reduce((a, b) => a + b, 0) / w.positions.length),
        avgHotindex: Math.round(w.hotindices.reduce((a, b) => a + b, 0) / w.hotindices.length),
        maxHotindex: Math.max(...w.hotindices),
        lastPosition: w.positions[w.positions.length - 1]
      }))
      .sort((a, b) => b.count - a.count);

    // 热度变化
    const topWords = allData.map(data => data.list.slice(0, 10)).flat();
    const wordHotMap = new Map();
    topWords.forEach(item => {
      if (!wordHotMap.has(item.word)) {
        wordHotMap.set(item.word, []);
      }
      wordHotMap.get(item.word).push(item.hotindex);
    });

    const hotChanges = [];
    wordHotMap.forEach((hotindices, word) => {
      const first = hotindices[0];
      const last = hotindices[hotindices.length - 1];
      const change = last - first;
      hotChanges.push({
        word,
        change,
        first,
        last,
        growth: change > 0 ? (change / first * 100).toFixed(1) : '0'
      });
    });

    hotChanges.sort((a, b) => b.change - a.change);

    // 生成报告
    const report = {
      date,
      analysis_time: today.toISOString(),
      summary: {
        data_points: todayFiles.length,
        total_unique_words: words.length
      },
      top_persistent: persistentWords.slice(0, 20).map(w => ({
        word: w.word,
        appearances: w.count,
        avg_position: w.avgPosition,
        avg_hotindex: w.avgHotindex.toLocaleString(),
        max_hotindex: w.maxHotindex.toLocaleString()
      })),
      hot_rising: hotChanges.slice(0, 20).filter(h => h.change > 0).map(h => ({
        word: h.word,
        hotindex_change: h.change.toLocaleString(),
        growth_rate: `${h.growth}%`
      })),
      hot_falling: hotChanges.slice(-20).reverse().filter(h => h.change < 0).map(h => ({
        word: h.word,
        hotindex_change: h.change.toLocaleString()
      })),
      current_top10: allData[allData.length - 1].list.slice(0, 10).map((item, i) => ({
        rank: i + 1,
        word: item.word,
        hotindex: item.hotindex.toLocaleString(),
        label: item.label
      }))
    };

    // 保存报告
    const reportFile = path.join(dataDir, `report_${date}.json`);
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));

    console.log(`[${new Date().toISOString()}] 📊 分析报告\n`);
    console.log(`=== ${date} 抖音热榜分析 ===\n`);

    console.log(`📈 持续上榜 Top 20:`);
    report.top_persistent.forEach((item, i) => {
      console.log(`   ${(i + 1).toString().padStart(2)}. ${item.word}`);
      console.log(`      上榜次数: ${item.appearances}  |  平均排名: ${item.avg_position}`);
      console.log(`      平均热度: ${item.avg_hotindex}`);
    });

    console.log(`\n🔥 热度上升 Top 10:`);
    report.hot_rising.slice(0, 10).forEach((item, i) => {
      console.log(`   ${(i + 1).toString().padStart(2)}. ${item.word} (+${item.hotindex_change}, 增长${item.growth_rate}%)`);
    });

    console.log(`\n📉 热度下降 Top 10:`);
    report.hot_falling.slice(0, 10).forEach((item, i) => {
      console.log(`   ${(i + 1).toString().padStart(2)}. ${item.word} (${item.hotindex_change})`);
    });

    console.log(`\n🏆 当前热搜 Top 10:`);
    report.current_top10.forEach((item, i) => {
      const label = item.label === 3 ? '🔥' : item.label === 1 ? '🆕' : '⭐';
      console.log(`   ${label} ${(i + 1).toString().padStart(2)}. ${item.word} - ${item.hotindex}`);
    });

    console.log(`\n[${new Date().toISOString()}] ✅ 报告已保存: ${reportFile}\n`);

    return report;

  } catch (error) {
    console.error(`[${new Date().toISOString()}] ❌ 错误:`, error.message);
    process.exit(1);
  }
}

analyzeDaily();
