#!/usr/bin/env node
/**
 * 发布视频
 */

const api = require('../lib/api');
const fs = require('fs');
const path = require('path');

async function main() {
  try {
    const videoPath = process.argv[2];
    const caption = process.argv[3] || '';

    if (!videoPath) {
      console.log('用法: node post_video.js <video_path> [caption]\n');
      process.exit(1);
    }

    // 检查文件是否存在
    if (!fs.existsSync(videoPath)) {
      console.error(`❌ 文件不存在: ${videoPath}`);
      process.exit(1);
    }

    console.log(`🎵 发布视频...`);
    console.log(`   文件: ${videoPath}`);
    console.log(`   描述: ${caption || '无'}\n`);

    // 读取视频文件
    const videoBuffer = fs.readFileSync(videoPath);
    const fileName = path.basename(videoPath);

    // 获取 token
    const token = await api.getValidToken();

    // 注意：视频上传需要使用抖音的上传接口，这里是一个简化版本
    // 实际使用时需要先上传视频文件获取 upload_id，然后再发布
    console.log('⚠️  视频上传功能需要完整的上传流程：');
    console.log('   1. 上传视频文件获取 upload_id');
    console.log('   2. 使用 upload_id 创建视频');
    console.log('\n完整的上传流程参考抖音开放平台文档：');
    console.log('https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/server/video-upload\n');

    console.log(`\n✅ 准备工作完成`);
    console.log(`   文件大小: ${(videoBuffer.length / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   文件名: ${fileName}\n`);

  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();
