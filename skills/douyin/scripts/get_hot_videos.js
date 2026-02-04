#!/usr/bin/env node
/**
 * 获取热门视频列表
 */

const api = require('../lib/api');

async function main() {
  try {
    const count = process.argv[2] || 10;
    console.log(`🎵 获取热门视频列表 (Top ${count})...\n`);

    const response = await api.get('/hot/feed', {
      count: count,
    });

    if (response.data && response.data.aweme_list) {
      const videos = response.data.aweme_list;
      console.log(`✅ 找到 ${videos.length} 个热门视频\n`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');

      videos.forEach((video, index) => {
        console.log(`\n#${index + 1}`);
        console.log(`标题: ${video.desc || 'N/A'}`);
        console.log(`作者: ${video.author?.nickname || 'N/A'}`);
        console.log(`点赞: ${video.statistics?.digg_count || 0}`);
        console.log(`评论: ${video.statistics?.comment_count || 0}`);
        console.log(`分享: ${video.statistics?.share_count || 0}`);
        console.log(`播放: ${video.statistics?.play_count || 0}`);
      });

      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('完整数据：');
      console.log(JSON.stringify(videos, null, 2));
    } else {
      console.log('❌ 获取热门视频失败');
      console.log(JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();
