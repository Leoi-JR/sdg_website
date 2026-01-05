# Umami 统计配置说明

## 功能说明

项目已集成 Umami 统计，可以在首页报告卡片中显示每个报告的阅读量和下载量。

## ⚠️ 重要说明

**Umami API 使用 JWT Token 认证，而不是 API Keys！**

- ❌ **API Keys**（`api_xxxxx`）- 用于前端脚本，不能访问 API
- ✅ **JWT Token** - 通过邮箱密码登录获取，用于 API 访问

**⚠️ 登录参数陷阱**：
- 官方文档写的是 `username` 和 `password`
- **实际 API 需要的是 `email` 和 `password`**（这是 Umami Cloud 的实现细节）

## 配置步骤

1. 登录你的 Umami 后台：https://cloud.umami.is
2. 记住你的**邮箱**和**密码**
3. 在 `.env.local` 文件中添加：

```bash
UMAMI_USERNAME=your_email@example.com
UMAMI_PASSWORD=your_password
```

4. 重启开发服务器：
```bash
npm run dev
```

系统会自动使用邮箱和密码登录获取 JWT Token，无需手动配置。

## 测试 API 连接

### 方法 1：使用测试端点

访问：`http://localhost:3000/api/stats/test`

这个端点会返回：
- ✅ Token 是否配置正确
- ✅ API 连接是否成功
- ✅ 查询到的所有事件数据
- ✅ 时间范围信息

**成功响应示例**：
```json
{
  "success": true,
  "token": "api_LOtTWoI...Xn3",
  "websiteId": "b6285af6-37f6-403d-a1de-3e8facfcc8c3",
  "events": {
    "total": 45,
    "data": [
      {
        "eventName": "shenzhen-sdg-view",
        "urlPath": "/zh/pdf/shenzhen-sdg"
      }
    ]
  }
}
```

**失败响应示例**：
```json
{
  "success": false,
  "error": "API request failed with status 401",
  "details": "Unauthorized"
}
```

### 方法 2：查看统计数据

访问：`http://localhost:3000/api/stats`

应该返回类似：
```json
{
  "shenzhen-sdg": {
    "views": 123,
    "downloads": 45
  },
  "city-sdg": {
    "views": 234,
    "downloads": 67
  }
}
```

## 工作原理

### 事件追踪

系统使用以下 Umami 事件来追踪统计：

| 事件名称 | 说明 |
|---------|------|
| `shenzhen-sdg-view` | 深圳SDG报告阅读 |
| `shenzhen-sdg-download` | 深圳SDG报告下载 |
| `city-sdg-view` | 城市SDG报告阅读 |
| `city-sdg-download` | 城市SDG报告下载 |

### API 端点

- **路由**: `/api/stats`
- **方法**: GET
- **返回**: JSON 格式的统计数据

```json
{
  "shenzhen-sdg": {
    "views": 1234,
    "downloads": 567
  },
  "city-sdg": {
    "views": 2345,
    "downloads": 890
  }
}
```

### 数据流程

1. 用户访问 PDF 页面 → 触发 `pdf-view` 事件
2. 用户点击下载按钮 → 触发 `pdf-download` 事件
3. 前端通过 `/api/stats` 获取统计数据
4. 统计数据每 5 分钟缓存一次

## 显示效果

在首页的报告卡片右下方会显示：

```
👁️ 1,234 阅读    ⬇️ 567 下载
```

加载时显示：

```
👁️ ... 阅读    ⬇️ ... 下载
```

## 中英文支持

统计标签已集成中英文翻译：

- 中文：`阅读` / `下载`
- 英文：`Views` / `Downloads`

## 注意事项

1. **API Token 安全**：不要将 `.env.local` 文件提交到 Git
2. **缓存机制**：统计数据会缓存 5 分钟，不会实时更新
3. **错误处理**：如果 API 请求失败，会显示 `0` 作为占位值
4. **开发环境**：未配置 token 时，使用占位数据用于测试

## 测试

配置完成后：

1. 访问报告页面：`/zh/pdf/shenzhen-sdg`
2. 查看浏览器控制台，确认事件已发送
3. 在 Umami 后台 **Events** 页面查看事件数据
4. 返回首页，查看卡片右下方的统计数据

## 故障排查

### 统计数据不更新或显示 0

#### 步骤 1: 测试 API 连接

访问：`http://localhost:3000/api/stats/test`

**如果返回 401 Unauthorized**：
- ❌ Token 无效或过期
- ✅ 解决：重新生成 API Token

**如果返回事件列表为空**：
- ❌ 可能没有事件数据，或者事件名称不匹配
- ✅ 访问 Umami 后台确认事件名称：
  - 登录 https://cloud.umami.is
  - 进入 **Events** 页面
  - 确认事件名称为：`shenzhen-sdg-view`, `shenzhen-sdg-download`, `city-sdg-view`, `city-sdg-download`

#### 步骤 2: 检查环境变量

1. 确认 `.env.local` 文件存在
2. 确认 `UMAMI_TOKEN` 已配置
3. 确认 token 格式正确（以 `api_` 开头）

#### 步骤 3: 检查事件数据

在 Umami 后台：
1. 进入 **Events** 页面
2. 查找以下事件：
   - `shenzhen-sdg-view`
   - `shenzhen-sdg-download`
   - `city-sdg-view`
   - `city-sdg-download`
3. 如果没有这些事件，需要先触发它们：
   - 访问报告页面：`/zh/pdf/shenzhen-sdg`
   - 点击下载按钮

#### 步骤 4: 检查服务器日志

查看开发服务器控制台：
```bash
npm run dev
```

查找错误信息：
- `Umami API error` - API 请求失败
- `UMAMI_TOKEN not configured` - 环境变量未配置

### 事件未发送

#### 步骤 1: 检查 Umami Script

1. 打开浏览器开发者工具 → Network 标签
2. 刷新页面
3. 查找 `script.js` 请求（来自 `cloud.umami.is`）
4. 如果没有找到，检查 `layout.tsx` 中的 umami script 标签

#### 步骤 2: 检查事件发送

1. 打开浏览器开发者工具 → Console 标签
2. 访问 PDF 页面
3. 查找是否有错误信息

#### 步骤 3: 手动测试事件

在浏览器控制台运行：
```javascript
// 测试事件发送
window.umami.track('test-event', { foo: 'bar' });
```

然后在 Umami 后台查看是否有 `test-event` 事件。

### 常见问题

**Q: 为什么统计数据是 0？**

A: 可能的原因：
1. 还没有触发过事件（访问报告页面或点击下载）
2. API Token 配置错误
3. 时间范围内没有事件数据（默认查询最近30天）

**Q: 统计数据多久更新一次？**

A: 前端数据会缓存5分钟，但实际统计数据是实时的。要立即刷新，可以：
1. 清除浏览器缓存
2. 或者等待5分钟自动刷新

**Q: 如何确认事件已发送？**

A:
1. 打开浏览器开发者工具 → Network 标签
2. 访问 PDF 页面或点击下载
3. 查找发送到 `cloud.umami.is` 的 `/api/send` 或 `/api/collect` 请求
4. 或者在 Umami 后台查看 Events 页面

## 相关文件

- **API 路由**: `src/app/api/stats/route.ts`
- **Umami 工具**: `src/lib/umami.ts`
- **统计显示**: `src/components/sections/ReportsSection.tsx`
- **翻译文件**: `messages/zh.json`, `messages/en.json`
