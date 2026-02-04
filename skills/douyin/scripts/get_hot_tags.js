#!/usr/bin/env node
/**
 * 获取热门标签
 */

const api = require('../lib/api');

async function main() {
  try {
    const count = process.argv[2] || 10;
    console.log(`🎵 获取热门标签 (Top ${count})...\n`);

    const response = await api.get('/hot/tags', {
      count: count,
    });

    if (response.data && response.data.tag_list) {
      const tags = response.data.tag_list;
      console.log(`✅ 找到 ${tags.length} 个热门标签\n`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');

      tags.forEach((tag, index) => {
        console.log(`\n#${index + 1}`);
        console.log(`标签: #${tag.tag_name || tag.name || 'N/A'}`);
        console.log(`热度: ${tag.hot_value || 0}`);
        console.log(`视频数: ${tag.video_count || 0}`);
        console.log(`播放数: ${tag.play_count || 0}`);
      });

      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('完整数据：');
      console.log(JSON.stringify(tags, null, 2));
    } else {
      console.log('❌ 获取热门标签失败');
      console.log(JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();
