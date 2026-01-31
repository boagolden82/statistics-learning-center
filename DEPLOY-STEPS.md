# 统计学习中心

## 部署统计学习中心到 Cloudflare Pages

### 快速部署步骤

#### 1. 上传代码到 GitHub

```bash
git init
git add .
git commit -m "Initial commit: Statistics Learning Center"
git branch -M main
git remote add origin https://github.com/yourusername/statistics-learning-center.git
git push -u origin main
```

#### 2. 部署到 Cloudflare Pages

1. **登录 Cloudflare Dashboard**
   - 访问 https://dash.cloudflare.com/
   - 使用你的Cloudflare账户登录

2. **创建Pages项目**
   - 点击左侧菜单的 "Pages"
   - 点击 "Create a project"
   - 选择 "Connect to Git"

3. **连接GitHub仓库**
   - 点击 "Connect to Git"
   - 授权GitHub访问权限
   - 找到并选择你的仓库

4. **配置构建设置**
   ```
   Framework preset: None
   Build command: (留空)
   Build output directory: .
   Root directory: /
   ```

5. **环境变量**（可选）
   ```
   Node version: 18
   ```

6. **部署**
   - 点击 "Save and Deploy"
   - 等待部署完成

#### 3. 访问网站

部署完成后，你会获得：
- **临时URL**: `your-project-name.pages.dev`
- **自定义域名**: 可以配置自己的域名

### 命令行部署（使用 Wrangler）

如果你更喜欢命令行：

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录
wrangler login

# 部署
wrangler pages deploy . --project-name statistics-learning-center
```

### 部署检查清单

- [ ] 所有文件已上传到GitHub
- [ ] Cloudflare Pages项目已创建
- [ ] 构建设置正确配置
- [ ] 网站可以正常访问
- [ ] 所有交互功能正常工作
- [ ] 响应式设计在手机上正常显示

### 常见问题解决

1. **构建失败**
   - 检查文件路径是否正确
   - 确保没有语法错误

2. **样式不显示**
   - 检查CSS文件路径
   - 清除浏览器缓存

3. **JavaScript不工作**
   - 检查控制台错误
   - 验证脚本文件路径

### 域名配置（可选）

1. **在Cloudflare Pages中**
   - 进入项目设置
   - "Custom domains" → "Add custom domain"
   - 输入你的域名

2. **DNS设置**
   - Cloudflare会自动配置
   - 或者手动添加CNAME记录

### 成功标志

当看到以下内容时，说明部署成功：
- 网站首页正常显示
- 所有页面可以正常访问
- 交互演示功能正常
- 练习题系统正常工作
- 在手机上显示正常

---

🎉 **恭喜！** 你的统计学习网站现在已经部署到Cloudflare Pages了！