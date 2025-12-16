// 导入必要的类型定义（UptimeFlare 核心依赖）
import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

// ========== 状态页配置（全中文） ==========
const pageConfig: PageConfig = {
  title: "两颗西柚网站监控", // 状态页标题（中文）
  links: [{ link: 'https://123812.xyz', label: '两颗西柚-网站' }], // 头部链接（中文）
  // 补充中文文案，替换页面默认英文
  locale: {
    uptime: '可用率',
    downtime: '宕机时间',
    status: '状态',
    lastChecked: '最后检测时间',
    responseTime: '响应时间',
    operational: '运行正常',
    degraded: '性能下降',
    down: '服务不可用',
    maintenance: '维护中',
    noData: '暂无监控数据，请检查Worker部署状态'
  }
}

// ========== 监控核心配置（修复+中文+可运行） ==========
const workerConfig: WorkerConfig = {
  monitors: [
    // HTTP监控（启用，修复ID格式+补全必要配置）
    {
      id: 'website_123812_xyz', // 修复ID特殊字符问题（原123812.xyz易导致KV存储异常）
      name: '两颗西柚博客', // 中文名称（替换原My blog）
      method: 'GET',
      target: 'https://123812.xyz',
      expectedCodes: [200], // 补全预期响应码（默认2xx，显式定义更稳定）
      timeout: 10000 // 补全超时配置（默认10秒，显式定义）
    }
    // TCP监控示例（如需启用，取消注释并补全target）
    // {
    //   id: 'tcp_monitor',
    //   name: 'TCP端口监控',
    //   target: 'tcp://123812.xyz:80',
    //   timeout: 5000
    // }
  ],

  // 告警通知配置（中文告警+精简核心参数）
  notification: {
    webhook: {
      url: 'https://api.telegram.org/bot你的真实BotToken/sendMessage', // 替换为真实Bot Token
      payloadType: 'x-www-form-urlencoded',
      payload: { 
        chat_id: 你的真实ChatID, // 替换为数字型ChatID（如123456789）
        text: '【两颗西柚监控】$MSG' // 中文告警前缀，$MSG保留自动替换告警详情
      },
      timeout: 10000
    },
    timeZone: 'Asia/Shanghai', // 北京时间
    gracePeriod: 5, // 5分钟告警延迟（避免误报）
    // 自定义中文告警文案（可选，按需启用）
    alertMessages: {
      up: '✅ {name} 已恢复正常\n检测地址：{target}\n恢复时间：{time}',
      down: '❌ {name} 服务异常\n检测地址：{target}\n异常时间：{time}\n错误信息：{error}',
      degraded: '⚠️ {name} 性能下降\n检测地址：{target}\n检测时间：{time}\n响应时间：{responseTime}ms'
    }
  }
}

// 维护窗口配置（空数组，如需启用可取消注释并补全）
const maintenances: MaintenanceConfig[] = []
// const maintenances: MaintenanceConfig[] = [
//   {
//     title: '服务器升级',
//     body: '2025-01-01 进行网站升级，期间可能短暂不可用',
//     start: '2025-01-01T00:00:00+08:00',
//     end: '2025-01-01T02:00:00+08:00',
//     color: 'blue'
//   }
// ]

// 导出配置（UptimeFlare 必需）
export { maintenances, pageConfig, workerConfig }
