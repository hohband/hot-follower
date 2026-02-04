#!/usr/bin/env node

/**
 * 解析抖音视频 (使用天行数据)
 * Usage: node parse_video_tianapi.js <douyin_url>
 */

const TianAPI = require('../lib/tianapi');

const apiKey = process.env.TIANAPI_KEY || '';
const url = process.argv[2];

if (!apiKey) {
  console.error('Error: TIANAPI_KEY 环境变量未设置');
  console.error('请先设置环境变量：export TIANAPI_KEY="your_api_key"');
  process.exit(1);
}

if (!url) {
  console.error('Error: 请提供抖音视频链接');
  console.error('Usage: node parse_video_tianapi.js <douyin_url>');
  console.error('Example: node parse_video_tianapi.js https://v.douyin.com/xxxxx');
  process.exit(1);
}

const api = new TianAPI(apiKey);

async function parseVideo() {
  try {
    console.log(`🔍 正在解析视频...`);
    console.log(`📎 链接: ${url}\n`);

    const result = await api.parseDouyinVideo(url);

    console.log('✅ 解析成功\n');
    console.log('📹 视频信息:');
    console.log(`   标题: ${result.title || result.desc || '无'}`);
    console.log(`   作者: ${result.author || result.nickname || '无'}`);
    console.log(`   时长: ${result.duration || '未知'}`);
    console.log(`   点赞: ${result.digg_count || result.like_count || 0}`);
    console.log(`   评论: ${result.comment_count || 0}`);
    console.log(`   分享: ${result.share_count || 0}`);

    if (result.video_url || result.play_addr || result.play_url) {
      console.log('\n🎬 下载地址:');
      console.log(`   ${result.video_url || result.play_addr || result.play_url}`);
    }

    if (result.cover || result.dynamic_cover) {
      console.log('\n🖼️  封面:');
      console.log(`   ${result.cover || result.dynamic_cover}`);
    }

    // 保存到文件（可选）
    const output = {
      title: result.title || result.desc,
      author: result.author || result.nickname,
      video_url: result.video_url || result.play_addr || result.play_url,
      cover: result.cover || result.dynamic_cover,
      stats: {
        like: result.digg_count || result.like_count,
        comment: result.comment_count,
        share: result.share_count
      },
      raw: result
    };

    const fs = require('fs');
    const outputFile = `/tmp/douyin_video_${Date.now()}.json`;
    fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
    console.log(`\n📄 详细信息已保存到: ${outputFile}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

parseVideo();
