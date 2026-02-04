#!/usr/bin/env node
/**
 * 搜索视频
 */

const api = require('../lib/api');

async function main() {
  try {
    const keyword = process.argv[2];
    const count = parseInt(process.argv[3]) || 20;
    const sortType = process.argv[4] || '0'; // 0:综合, 1:最多点赞, 2:最新发布

    if (!keyword) {
      console.log('用法: node search_videos.js <keyword> [count] [sort_type]\n');
      console.log('sort_type: 0=综合, 1=最多点赞, 2=最新发布\n');
      process.exit(1);
    }

    console.log(`🎵 搜索视频: "${keyword}" (Top ${count})...\n`);

    const response = await api.get('/video/search', {
      keyword: keyword,
      count: count,
      sort_type: sortType,
    });

    if (response.data && response.data.aweme_list) {
      const videos = response.data.aweme_list;
      console.log(`✅ 找到 ${videos.length} 个相关视频\n`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');

      videos.forEach((video, index) => {
        console.log(`\n#${index + 1}`);
        console.log(`视频ID: ${video.aweme_id}`);
        console.log(`标题: ${video.desc || 'N/A'}`);
        console.log(`作者: ${video.author?.nickname || 'N/A'}`);
        console.log(`点赞: ${video.statistics?.digg_count || 0}`);
        console.log(`评论: ${video.statistics?.comment_count || 0}`);
        console.log(`播放: ${video.statistics?.play_count || 0}`);
      });

      if (response.data.has_more) {
        console.log(`\n还有更多结果，游标: ${response.data.cursor}`);
      }

      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('完整数据：');
      console.log(JSON.stringify(videos, null, 2));
    } else {
      console.log('❌ 搜索失败');
      console.log(JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();
