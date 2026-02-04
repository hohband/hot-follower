#!/usr/bin/env node

/**
 * 抖音热榜定时任务调度器
 * 每小时监控，每天中午12点分析并发送邮件
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const scriptsDir = '/root/clawd/skills/douyin/scripts';
const dataDir = '/root/clawd/skills/douyin/data/hot';

function runScript(script, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n[${new Date().toISOString()}] 🚀 ${description}...`);

    exec(`node ${path.join(scriptsDir, script)}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`[${new Date().toISOString()}] ❌ ${description} 失败:`, error.message);
        reject(error);
      } else {
        console.log(`[${new Date().toISOString()}] ✅ ${description} 完成`);
        resolve(stdout);
      }
    });
  });
}

async function scheduleTasks() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  console.log(`\n${'='.repeat(50)}`);
  console.log(`📅 抖音热榜监控系统`);
  console.log(`🕐 当前时间: ${now.toLocaleString('zh-CN')}`);
  console.log(`${'='.repeat(50)}\n`);

  try {
    // 每小时执行监控
    console.log(`[${new Date().toISOString()}] 📡 执行每小时监控任务...`);
    await runScript('monitor_hot_hourly.js', '获取抖音热榜');

    // 每天中午12点执行分析和发送邮件
    if (hour === 12) {
      console.log(`\n[${new Date().toISOString()}] 📊 执行每日分析任务...`);
      await runScript('analyze_daily_hot.js', '分析热榜数据');

      // 读取分析报告
      const date = now.toISOString().slice(0, 10);
      const reportFile = path.join(dataDir, `report_${date}.json`);

      if (fs.existsSync(reportFile)) {
        const reportData = JSON.parse(fs.readFileSync(reportFile, 'utf-8'));

        console.log(`\n[${new Date().toISOString()}] 📧 发送邮件报告...`);
        await runScript('email_report.js', '发送邮件');
      } else {
        console.log(`\n[${new Date().toISOString()}] ⚠️  未找到分析报告文件: ${reportFile}`);
      }
    }

    console.log(`\n${'='.repeat(50)}`);
    console.log(`[${new Date().toISOString()}] ✅ 所有任务完成\n`);

  } catch (error) {
    console.error(`\n[${new Date().toISOString()}] ❌ 任务执行失败:`, error.message);
    process.exit(1);
  }
}

// 执行任务
scheduleTasks();
