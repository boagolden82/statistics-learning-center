@echo off
REM 统计学习中心自动部署脚本 (Windows版本)
REM 将网站部署到 Cloudflare Pages

echo 🚀 开始部署统计学习中心到 Cloudflare Pages...
echo.

REM 检查是否安装了必要工具
echo 📋 检查依赖工具...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git 未安装，请先安装 Git
    pause
    exit /b 1
)

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js 未安装，请先安装 Node.js
    pause
    exit /b 1
)

echo ✅ 依赖检查通过
echo.

REM 配置Git仓库
echo 🔧 配置Git仓库...

if not exist ".git" (
    git init
    echo 📁 Git仓库初始化完成
)

git add .

REM 检查是否有更改
git diff --cached --quiet >nul 2>&1
if %errorlevel% equ 0 (
    echo ℹ️ 没有需要提交的更改
    goto check_remote
)

REM 提交更改
git commit -m "Update: %date% %time%"
echo ✅ 代码提交完成

:check_remote
REM 检查是否已配置远程仓库
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️ 请先配置GitHub远程仓库：
    echo    git remote add origin https://github.com/yourusername/statistics-learning-center.git
    echo    然后重新运行此脚本
    pause
    exit /b 1
)

REM 推送到GitHub
echo 📤 推送到GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ❌ 推送失败，请检查网络连接和仓库权限
    pause
    exit /b 1
)

echo ✅ 代码已推送到GitHub
echo.

REM 检查部署状态
echo 🔍 检查部署状态...
echo ℹ️ 请访问 Cloudflare Dashboard 查看部署状态
echo    https://dash.cloudflare.com/pages
echo.

REM 显示成功信息
echo 🎉 部署流程完成！
echo.
echo 📋 下一步操作：
echo 1. 访问 Cloudflare Dashboard: https://dash.cloudflare.com/pages
echo 2. 等待部署完成（通常需要1-3分钟）
echo 3. 测试网站功能
echo 4. 配置自定义域名（可选）
echo.
echo 🌟 你的统计学习中心即将上线！
echo.
pause