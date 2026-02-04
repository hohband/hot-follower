#!/usr/bin/env node
/**
 * 获取话题分析数据
 */

const api = require('../lib/api');

async function main() {
  try {
    const topic = process.argv[2];

    if (!topic) {
      console.log('用法: node analyze_topic.js <topic_name_or_id>\n');
      process.exit(1);
    }

    console.log(`🎵 分析话题: ${topic}\n`);

    const response = await api.get('/topic/analyze', {
      topic: topic,
    });

    if (response.data) {
      const analysis = response.data;
      console.log('✅ 话题分析：');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`话题名称: ${analysis.topic_name || 'N/A'}`);
      console.log(`话题ID: ${analysis.topic_id || 'N/A'}`);
      console.log(`\n数据概览：`);
      console.log(`  视频数: ${analysis.video_count || 0}`);
      console.log(`  播放量: ${analysis.play_count || 0}`);
      console.log(`  参与用户: ${analysis.user_count || 0}`);
      console.log(`\n趋势数据：`);
      console.log(`  热度: ${analysis.hot_value || 0}`);
      console.log(`  增长率: ${analysis.growth_rate || 'N/A'}%`);
      console.log(`  峰值时间: ${analysis.peak_time || 'N/A'}`);
      console.log(`\n热门创作者：`);
      if (analysis.top_creators && analysis.top_creators.length > 0) {
        analysis.top_creators.forEach((creator, index) => {
          console.log(`  ${index + 1}. ${creator.nickname} (${creator.video_count}个视频)`);
        });
      } else {
        console.log('  暂无数据');
      }
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('完整数据：');
      console.log(JSON.stringify(analysis, null, 2));
    } else {
      console.log('❌ 话题分析失败');
      console.log(JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();
