#!/usr/bin/env node
/**
 * 获取视频列表
 */

const api = require('../lib/api');

async function main() {
  try {
    const userId = process.argv[2];
    const count = parseInt(process.argv[3]) || 10;
    const cursor = process.argv[4];

    console.log(`🎵 获取视频列表...\n`);

    const params = {
      count: count,
    };
    if (userId) params.user_id = userId;
    if (cursor) params.cursor = cursor;

    const response = await api.get('/video/list', params);

    if (response.data && response.data.aweme_list) {
      const videos = response.data.aweme_list;
      console.log(`✅ 找到 ${videos.length} 个视频\n`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');

      videos.forEach((video, index) => {
        console.log(`\n#${index + 1}`);
        console.log(`视频ID: ${video.aweme_id}`);
        console.log(`标题: ${video.desc || 'N/A'}`);
        console.log(`作者: ${video.author?.nickname || 'N/A'}`);
        console.log(`点赞: ${video.statistics?.digg_count || 0}`);
        console.log(`评论: ${video.statistics?.comment_count || 0}`);
        console.log(`分享: ${video.statistics?.share_count || 0}`);
        console.log(`播放: ${video.statistics?.play_count || 0}`);
        console.log(`创建时间: ${video.create_time || 'N/A'}`);
      });

      if (response.data.has_more) {
        console.log(`\n还有更多视频，游标: ${response.data.cursor}`);
      }

      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('完整数据：');
      console.log(JSON.stringify(videos, null, 2));
    } else {
      console.log('❌ 获取视频列表失败');
      console.log(JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();
