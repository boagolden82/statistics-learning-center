# Statistics Learning Center - 部署指南

## 🚀 部署到 Cloudflare Pages

### 方法一：通过 GitHub 自动部署（推荐）

1. **上传代码到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Statistics Learning Center"
   git branch -M main
   git remote add origin https://github.com/yourusername/statistics-learning-center.git
   git push -u origin main
   ```

2. **配置 Cloudflare Pages**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 进入 "Pages" 部分
   - 点击 "Create a project"
   - 选择 "Connect to Git"
   - 授权 GitHub 并选择你的仓库
   - 配置构建设置：
     ```
     Framework preset: None
     Build command: (留空)
     Build output directory: .
     Root directory: / (根目录)
     ```

3. **配置环境变量**
   在 Cloudflare Pages 项目设置中添加：
   ```
   Node version: 18
   ```

### 方法二：通过 Wrangler CLI

1. **安装 Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **登录 Cloudflare**
   ```bash
   wrangler login
   ```

3. **部署项目**
   ```bash
   cd statistics-learning-center
   wrangler pages project create statistics-learning-center
   wrangler pages deploy . --project-name statistics-learning-center
   ```

## 🔧 部署配置

### GitHub Actions 配置

项目已配置了 GitHub Actions 自动部署流程：

1. **触发条件**：
   - 推送到 `main` 分支
   - 创建 Pull Request

2. **所需密钥**：
   在 GitHub 仓库设置中添加以下 Secrets：
   ```
   CLOUDFLARE_API_TOKEN: 你的 Cloudflare API Token
   CLOUDFLARE_ACCOUNT_ID: 你的 Cloudflare Account ID
   GITHUB_TOKEN: GitHub 自动提供
   ```

3. **获取 API Token**：
   - 进入 Cloudflare Dashboard
   - "My Profile" → "API Tokens"
   - 创建自定义 Token，权限包括：
     - Zone:Zone:Read
     - Zone:Page Rules:Edit
     - Account:Cloudflare Pages:Edit

## 🌐 自定义域名

### 配置自定义域名

1. **在 Cloudflare Pages 中**：
   - 进入项目设置
   - "Custom domains" → "Set up a custom domain"
   - 输入你的域名（如：stats.yourdomain.com）

2. **DNS 配置**：
   - Cloudflare 会自动添加 CNAME 记录
   - 或者手动添加：
     ```
     Type: CNAME
     Name: stats
     Target: your-project.pages.dev
     TTL: Auto
     ```

3. **SSL 证书**：
   - Cloudflare 会自动配置 SSL
   - 支持 HTTP/2 和现代加密

## 📊 性能优化

### 启用 Cloudflare 优化

1. **缓存策略**：
   ```javascript
   // 在 _headers 文件中添加
   /*
     X-Frame-Options: DENY
     X-Content-Type-Options: nosniff
     Referrer-Policy: strict-origin-when-cross-origin
     Cache-Control: public, max-age=31536000, immutable
   ```

2. **图片优化**：
   - 启用 Cloudflare Image Resizing
   - 使用 WebP 格式

3. **压缩**：
   - 启用 Brotli 压缩
   - 自动 minify HTML/CSS/JS

## 🔍 SEO 配置

### meta 标签优化

每个页面已包含完整的 SEO meta 标签：
- 标题和描述
- Open Graph 标签
- Twitter Card
- 结构化数据

### sitemap 生成

可添加 sitemap 以提升搜索引擎收录：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- 添加其他页面 -->
</urlset>
```

## 📈 监控和分析

### Cloudflare Analytics

1. **启用 Web Analytics**：
   - 进入项目设置
   - "Analytics" → "Web Analytics"
   - 启用免费版或付费版

2. **关键指标**：
   - 页面访问量
   - 加载时间
   - 地理位置
   - 设备类型

### 第三方分析

可集成 Google Analytics：
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🛡️ 安全配置

### 安全头部

已在 HTML 中添加安全头部：
- CSP (Content Security Policy)
- HSTS (HTTP Strict Transport Security)
- X-Frame-Options
- X-Content-Type-Options

### DDoS 保护

Cloudflare 提供免费的基础 DDoS 保护：
- 自动检测和缓解攻击
- IP 信誉系统
- 智能挑战页面

## 🔄 更新部署

### 自动更新

每次推送到 main 分支都会自动触发部署：
```bash
git add .
git commit -m "Update content"
git push origin main
```

### 预览部署

Pull Request 会创建预览环境：
- 自动生成预览 URL
- 测试更改效果
- 团队审查

## 📝 故障排除

### 常见问题

1. **构建失败**：
   - 检查文件路径
   - 验证 HTML/CSS 语法
   - 查看构建日志

2. **样式不正确**：
   - 清除浏览器缓存
   - 检查 CSS 文件路径
   - 验证 Bootstrap CDN

3. **交互功能失效**：
   - 检查 JavaScript 控制台
   - 验证脚本文件路径
   - 确保没有语法错误

### 获取帮助

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [GitHub 支持](https://support.github.com/)
- 项目 Issues 页面

---

🎉 **恭喜！** 你的统计学习中心现在已经在 Cloudflare Pages 上运行了！