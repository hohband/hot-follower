#!/usr/bin/env node
/**
 * 获取热门话题
 */

const api = require('../lib/api');

async function main() {
  try {
    const count = process.argv[2] || 10;
    console.log(`🎵 获取热门话题 (Top ${count})...\n`);

    const response = await api.get('/hot/trending', {
      count: count,
    });

    if (response.data && response.data.topic_list) {
      const topics = response.data.topic_list;
      console.log(`✅ 找到 ${topics.length} 个热门话题\n`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');

      topics.forEach((topic, index) => {
        console.log(`\n#${index + 1}`);
        console.log(`话题: ${topic.desc || topic.title || 'N/A'}`);
        console.log(`热度: ${topic.hot_value || topic.hot_score || 0}`);
        console.log(`视频数: ${topic.view_count || 0}`);
      });

      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('完整数据：');
      console.log(JSON.stringify(topics, null, 2));
    } else {
      console.log('❌ 获取热门话题失败');
      console.log(JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();
