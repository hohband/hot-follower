#!/usr/bin/env node

/**
 * æŠ–éŸ³çƒ­æœæ¦œ - å¯¹æ¯”å†å²æ•°æ®
 * Usage: node compare_hot_tianapi.js [date1][date2]
 * Example: node compare_hot_tianapi.js 2026-02-02 2026-02-03
 **/
const fs = require('fs');
const path = require('path');
const dataDir = '/root/clawd/skills/douyin/data/hot';

// å§šå—ç‘çš„æ¸…ç¨‹:"é¼¿åŠ³åŠ£
const date1 = process.argv[2] || new Date(Date.now() - 86400000).toISOString().slice(0, 10);
const date2 = process.argv[3] || new Date().toISOString().slice(0, 10);

function compareHot() {
  try {
    const file1 = path.join(dataDir, `hot_${date1}.json`);
    const file2 = path.join(dataDir, `hot_${date2}.json`);

    if (!fs.existsSync(file1)) {
      console.error(`âŒ æœªæ‰¾åˆ° ${date1} çš„æ•°æ®æ–‡ä»¶: ${file1});
      console.log(`   æç¤º:9an‹ØèÀ node monitor_hot_tianapi.js ä·y-¦y¥l9£k˜
NÂˆ›ØÙ\ÜË™^]
JNÂˆB‚ˆYˆ
YœË™^\İÔŞ[˜Êš[LŠJHÂˆÛÛœÛÛK™\œ›ÜŠ8§c9§*¹¢o¹b,	Ù]LŸH9æ¡9¥l9£k¹¥¡ù.íˆ	Ùš[LŸJNÂˆÛÛœÛÛK›ÙÊ9£ä9é.X[¢ö:0›ÙH[Ûš]Ü—ÚİİX[˜\KšœÈ9-ŞKii[hÚæ“°¢&ö6W72æW†—Bƒ“°¢Ğ ¢6öç7BFFÒ¥4ôâç'6R†g2ç&VDf–ÆU7–æ72†f–ÆSÂwWFbÓ‚r’“°¢6öç7BFF"Ò¥4ôâç'6R†g2ç&VDf–ÆU7–æ72†f–ÆS"ÂwWFbÓ‚r’“° ¢6öç6öÆRæÆör‚	ù8¢x:ŞbG:y¨ÂXZÎyZ®YØ˜
NÂˆÛÛœÛÛK›ÙÊ	ÏIËœ™\X]
L
JNÂˆÛÛœÛÛK›ÙÊ¿	ù8RZîy«å:d²Ò“°¢6öç6öÆRæÆör†G¶FFSÒ‚G¶FF×JHIÙ]LK[Y_JNÂˆÛÛœÛÛK›ÙÊ	Ù]LŸH
	Ù]L—_JHIÙ]L‹[Y_WJNÂ‚ˆÛÛœİÛÜ™ÌHH™]ÈX\
]LK›\İ›X\
][HOˆÚ][KÛÜ™È‹š][K˜[šÌNˆ]LK›\İ™š[™[™^
HOˆKÛÜ™OOH][KÛÜ™
H
ÈHWJJNÂˆÛÛœİÛÜ™ÌˆH™]ÈX\
]L‹›\İ›X\
][HOˆÚ][KÛÜ™È‹š][K˜[šÌˆ]L‹›\İ™š[™[™^
]OˆKÛÜ™OOH][KÛÜ™
H
ÈHWJJNÂ‚ˆËÈ9¥¬9."¹©§
    const newItems = data2.list.filter(item => !words1.has(item.word));
    console.log(`\nğŸ†‘ ${date2} æ–°ä¸Šæ¦œ(‘ì¹•İ%Ñ•µÌ¹±•¹Ñ¡ôƒšv„¤é€¤ì(€€€¹•İ%Ñ•µÌ¹Í±¥” À°€ÄÀ¤¹™½É…  ¡¥Ñ•´°¥¹‘•à¤€ôøì(€€€€€½¹Í½±”¹±½œ¡€€€€‘í¥¹‘•à€¬€Åô¸€‘í¥Ñ•´¹İ½É‘ô€£·–ê˜è€‘í¥Ñ•´¹¡½Ñ¥¹‘•àü¹Ñ½1½…±•MÑÉ¥¹œ ‰ô¥€¤ì(€€€ô¤ì((€€€€¼¼ƒ¢Ş3–ëššp(€€€½¹ÍĞ‘É½ÁÁ•‘%Ñ•µÌ€ô‘…Ñ„Ä¹±¥ÍĞ¹™¥±Ñ•È¡¥Ñ•´€ôø€…İ½É‘ÌÈ¹¡…Ì¡¥Ñ•´¹İ½É¤¤ì(€€€½¹Í½±”¹±½œ¡q»Â~N$€‘í‘…Ñ”Åôƒ¢Ş3–ëššp€ ‘í‘É½ÁÁ•‘%Ñ•µÌ¹±•¹Ñ¡ôƒšv„¤é€¤ì(€€€‘É½ÁÁ•‘%Ñ•µÌ¹Í±¥” À°€ÄÀ¤¹™½É…  (€€€€€¥Ñ•´°¥¹‘•à¤€ôøì(€€€€€½¹Í½±”¹±½œ¡€€€€‘í¥¹‘•à€¬€Åô¸€‘í¥Ñ•´¹İ½É‘ô€£Ó§¢òs¢’ç&æ³"Ò’ç&æ³Ó‚òsÒr¢uÇVãórvWBƒ¢G'VR“°¢F–ÖS¢¶—FVÒç&æ³%×ØÂˆİ—İÚ[ˆÛÜ™Ì‹™Ù]
][KÛÜ™
Kšİ[™^ˆJNÂˆJNÂ‚ˆËÈ9£¤¹d#ycæ9c%ˆÛÛœİ˜[šÚ[™ĞÚ[™Ù\ÈH×NÂˆ]LK›\İ™›Ü‘Xch(item => {
      if (words2.has(item.word)) {
        const rank1 = words1.get(item.word).rank1;
        const rank = words2.get(item.word).rank2;
        if (rank1 !== rank) {
          rankingChanges.push({
            word: item.word,
            rank1,
            rank2,
            change: rank1 - rank2,
            hot1: item.hotindex,
           hot2: words2.get(item.word).hotindex
         });
        }
      }
    });

    // æ’åä¸Šå‡æœ€å¤š
    const rose = rankingChanges
      .filter(item => item.change > 0)
      .sort((a, b) => b.change - a.change)
      .slice(0, 10);

    if (rose.length > 0) {
      console.log(`\nğŸ† æ’åä¸Šå‡ Top 10:`);
      rose.forEach((item, index) => {
        const hotChange = item.hot2 - item.hot1;
        const hotChangeStr = hotChange > 0 ? `+${hotChange.toLocaleString()}` : hotChange.toLocaleString();
        console.log(`   ${index + 1}. ${item.word}`);
        console.log(`      ${item.rank1} â†’ ${item.rank2} (${item.change > 0 ? '+' : ''}${item.change} ä½)`);
        console.log(`      çƒ­åº¦: ${hotChangeStr}`);
      });
    }

    // æ’åä¸‹é™æœ€å¤š
    const fell = rankingChanges
      .filter(item => item.change < 0)
      .sort(((a, b) => a.change - b.change)
      .slice(0, 10);

    if (fell.length > 0) {
      console.log(`\nğŸ† æ’åä¸‹é™æœ€å¦ Top 10:`);
      fell.forEach((item, index) => {
        const hotChange = item.hot2 - item.hot1;
        const hotChangeStr = hotChange > 0 ? `+${hotChange.toLocaleString()}` : hotChange.toLocaleString();
        console.log(`   ${index + 1}¸¸€‘í¥Ñ•´¹İ½É‘õ€¤ì(€€€€€€€½¹Í½±”¹±½œ¡€€€€€€€‘í¥Ñ•´¹É…¹¬ÅôƒŠH€‘í¥Ñ•´¹É…¹¬Éô€ ‘í¥Ñ•´¹¡…¹•ôƒ’ö)p¤ì(€€€€€€€½¹Í½±”¹±½œ¡€€€€€€ƒ·–ê˜è€‘í¡½Ñ¡…¹•MÑÉõ€¤ì(€€€€€ô¤ì(€€€ô((€€€€¼¼Q½À€ÄÀƒ–¾çš¾P(€€€½¹Í½±”¹±½œ¡q»Â~>Q½À€ÄÀƒ–¾çš¾Pé€¤ì(€€€½¹Í½±”¹±½œ œ€€ƒš:K–B4ğƒšb£š^—·šBpğƒ’î+š^—·šBpğƒ–>c–2Xœ¤ì(€€€½¹Í½±”¹±½œ œ€€€´´´´´´´´´´´´´´´´´´µô´´´´´´´´µğ´´´´´´´µğ´´´œ¤ì((€€€™½È€¡±•Ğ¤€ô€Äì¤€ğô€ÄÀì¤¬¬¤ì(€€€€€½¹ÍĞİ½ÉÄ€ô‘…Ñ„Ä¹±¥ÍÑm¤€´€Åtü¹İ½Éñğ€œ´œì(€€€€€½¹ÍĞİ½ÉÈ€ô‘…Ñ„È¹±¥ÍÑm¤€´€Åtü¹İ½Éñğ€œ´œì(€€€€€±•Ğ¡…¹”€ô€œœì((€€€€€¥˜€¡İ½ÉÄ€ôôôİ½ÉÈ€˜˜İ½ÉÄ€„ôô€œ´œ¤ì(€€€€€€€¡…¹”€ô€œƒŠ~‹—øŒq¸œì(€€€€€ô•±Í”¥˜€¡İ½ÉÄ€„ôô€œ´œ€˜˜İ½ÉÈ€„ôô€œ´œ¤ì(€€€€€€€½¹ÍĞİ½ÉÅI†k = data2.list.findIndex(item => item.word === word1);
        const word2Rank = data1.list.findIndex(item => item.word === word2);
        if (word1Rank > -1) {
          change = `â†“${word1Rank + 1}`;
        } else if (word2.rank > -1) {
         change = `â†‘${i}`;
        }
      }

      console.log(`    ${(i.toString()p¹Á…‘MÑ…ÉĞ Ğ¥öÂG·v÷&C"çDVæBƒ"’ç6Æ–6RƒÂ"—ÒÂG¶6†ævWÕĞ
NÂˆB‚ˆÛÛœÛÛK›ÙÊ	×‰È
È	ÏIËœ™\X]
50));

} catch (error) {
  console.error(gbŒ Error:', error.message);
  process.exit(1);
})

compareHot();
