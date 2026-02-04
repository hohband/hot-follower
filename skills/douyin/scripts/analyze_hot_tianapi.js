#!/usr/bin/env node

/**
 * 抖音热搜榜 - 数据分析
 * Usage: node analyze_hot_tianapi.js
 */

const TianAPI = require('../lib/tianapi');

const apiKey = process.env.TIANAPI_KEY || '';

if (!apiKey) {
  console.error('Error: TIANAPI_KEY 环境变量未设置');
  process.exit(1);
}

const api = new TianAPI(apiKey);

async function analyzeHot() {
  try {
    console.log('📊 正在分析抖音热搜榜...\n');

    const result = await api.getDouyinHot();

    if (result && result.list && result.list.length > 0) {
      const list = result.list;

      // 标签统计
      const labelStats = {
        1: { name: '新', count: 0, emoji: '🆕' },
        2: { name: '荐', count: 0, emoji: '⭐' },
        3: { name: '热', count: 0, emoji: '🔥' }
      };

      list.forEach(item => {
        if (labelStats[item.label]) {
          labelStats[item.label].count++;
        }
      });

      // 热度统计
      const hotValues = list
        .filter(item => item.hotindex)
        .map(item => item.hotindex);

      const totalHot = hotValues.reduce((sum, val) => sum + val, 0);
      const avgHot = Math.round(totalHot / hotValues.length);
      const maxHot = Math.max(...hotValues);
      const minHot = Math.min(...hotValues);

      // 输出分析结果
      console.log('📈 热搜榜分析报告');
      console.log('='.repeat(40));
      console.log(`\n📌 总体统计:`);
      console.log(`   • 热搜数量: ${list.length}`);
      console.log(`   • 平均热度: ${avgHot.toLocaleString()}`);
      console.log(`   • 最高热度: ${maxHot.toLocaleString()}`);
      console.log(`   • 最低热度: ${minHot.toLocaleString()}`);

      console.log(`\n🏷️  标签分布:`);
      Object.entries(labelStats).forEach(([key, info]) => {
        if (info.count > 0) {
          const percent = ((info.count / list.length) * 100).toFixed(1);
          console.log(`   ${info.emoji} ${info.name}: ${info.count} (${percent}%)`);
        }
      });

      // 按热度分组
      const highHot = list.filter(item => item.hotindex >= 10000000);
      const midHot = list.filter(item => item.hotindex >= 5000000 && item.hotindex < 10000000);
      const lowHot = list.filter(item => item.hotindex < 5000000);

      console.log(`\n🔥 热度等级:`);
      console.log(`   🔴 超热 (≥1000万): ${highHot.length} 条`);
      console.log(`   🟠 热门 (500万-1000万): ${midHot.length} 条`);
      console.log(`   🟢 普通 (<500万): ${lowHot.length} 条`);

      // Top 5
      console.log(`\n🏆 Top 5 热搜:`);
      list.slice(0, 5).forEach((item, index) => {
        console.log(`   ${(index + 1)}. ${item.word} - ${item.hotindex.toLocaleString()}`);
      });

      // 分类猜测（基于关键词）
      console.log(`\n📂 热搜分类:`);
      const categories = {
        '体育': ['NBA', 'CBA', '足球', '篮球', '奥运', '网球', '乒乓球', '游泳', '田径'],
        '娱乐': ['明星', '演员', '歌手', '电影', '电视剧', '综艺', '音乐', '演唱会'],
        '科技': ['AI', '手机', '科技', '芯片', '互联网', '软件', '游戏', '电子产品'],
        '财经': ['股市', '股票', '基金', '金融', '经济', '财经', '投资', '银行'],
        '生活': ['美食', '旅游', '天气', '节日', '春节', '过年', '生活', '健康'],
        '国际': ['国际', '美国', '欧洲', '日本', '韩国', '外交', '贸易', '战争'],
        '社会': ['社会', '政策', '法律', '犯罪', '事故', '新闻', '事件']
      };

      const categoryCount = {};
      list.forEach(item => {
        for (const [category, keywords] of Object.entries(categories)) {
          if (keywords.some(kw => item.word.includes(kw))) {
            categoryCount[category] = (categoryCount[category] || 0) + 1;
            break;
          }
        }
      });

      Object.entries(categoryCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .forEach(([category, count]) => {
          console.log(`   • ${category}: ${count} 条`);
        });

      console.log('\n' + '='.repeat(40));

    } else {
      console.log('未找到热搜数据');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

analyzeHot();
