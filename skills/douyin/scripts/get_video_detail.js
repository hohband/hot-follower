#!/usr/bin/env node
/**
 * 获取视频详情
 */

const api = require('../lib/api');

async function main() {
  try {
    const videoId = process.argv[2];

    if (!videoId) {
      console.log('用法: node get_video_detail.js <video_id>\n');
      process.exit(1);
    }

    console.log(`🎵 获取视频详情: ${videoId}\n`);

    const response = await api.get('/video/detail', {
      item_id: videoId,
    });

    if (response.data && response.data.aweme_detail) {
      const video = response.data.aweme_detail;
      console.log('✅ 视频详情：');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`视频ID: ${video.aweme_id}`);
      console.log(`标题: ${video.desc || 'N/A'}`);
      console.log(`\n作者信息：`);
      console.log(`  昵称: ${video.author?.nickname || 'N/A'}`);
      console.log(`  用户ID: ${video.author?.uid || video.author?.open_id}`);
      console.log(`\n统计数据：`);
      console.log(`  播放: ${video.statistics?.play_count || 0}`);
      console.log(`  点赞: ${video.statistics?.digg_count || 0}`);
      console.log(`  评论: ${video.statistics?.comment_count || 0}`);
      console.log(`  分享: ${video.statistics?.share_count || 0}`);
      console.log(`  收藏: ${video.statistics?.collect_count || 0}`);
      console.log(`\n视频信息：`);
      console.log(`  时长: ${video.duration || 'N/A'}ms`);
      console.log(`  分辨率: ${video.video?.width || 'N/A'}x${video.video?.height || 'N/A'}`);
      console.log(`  创建时间: ${video.create_time || 'N/A'}`);
      console.log(`\n话题标签：`);
      if (video.text_extra && video.text_extra.length > 0) {
        video.text_extra.forEach(tag => {
          console.log(`  #${tag.hashtag_name || tag.word}`);
        });
      } else {
        console.log('  无');
      }
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('完整数据：');
      console.log(JSON.stringify(video, null, 2));
    } else {
      console.log('❌ 获取视频详情失败');
      console.log(JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();
