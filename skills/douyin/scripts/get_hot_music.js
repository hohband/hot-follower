#!/usr/bin/env node
/**
 * 获取热门音乐
 */

const api = require('../lib/api');

async function main() {
  try {
    const count = process.argv[2] || 10;
    console.log(`🎵 获取热门音乐 (Top ${count})...\n`);

    const response = await api.get('/hot/music', {
      count: count,
    });

    if (response.data && response.data.music_list) {
      const musics = response.data.music_list;
      console.log(`✅ 找到 ${musics.length} 首热门音乐\n`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');

      musics.forEach((music, index) => {
        console.log(`\n#${index + 1}`);
        console.log(`音乐: ${music.title || music.name || 'N/A'}`);
        console.log(`作者: ${music.author || music.owner || 'N/A'}`);
        console.log(`时长: ${music.duration || 'N/A'}`);
        console.log(`使用数: ${music.use_count || 0}`);
      });

      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('完整数据：');
      console.log(JSON.stringify(musics, null, 2));
    } else {
      console.log('❌ 获取热门音乐失败');
      console.log(JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

main();
