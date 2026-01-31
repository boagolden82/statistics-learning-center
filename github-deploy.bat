@echo off
echo 🚀 GitHub 部署脚本 - 针对 boagolden82 用户
echo =====================================
echo.

echo 📋 第一步：创建GitHub仓库
echo.
echo 请手动在GitHub上创建仓库：
echo 1. 访问: https://github.com/new
echo 2. 仓库名称: statistics-learning-center
echo 3. 描述: 统计学习中心 - 线性回归、逻辑回归、X平方检验的教育平台
echo 4. 选择: Public
echo 5. 勾选: Add a README file (取消，因为我们已有)
echo 6. 点击: Create repository
echo.

pause

echo 🔧 第二步：配置远程仓库
cd C:\code\spss

git remote remove origin 2>nul
git remote add origin https://github.com/boagolden82/statistics-learning-center.git

echo ✅ 远程仓库已配置
echo.

echo 📤 第三步：推送代码到GitHub
echo.

REM 尝试推送
git push -u origin main

if %errorlevel% equ 0 (
    echo ✅ 代码推送成功！
    echo.
    echo 🌐 现在可以访问: https://github.com/boagolden82/statistics-learning-center
    echo.
    echo ➡️  下一步：配置Cloudflare Pages
    echo    1. 访问: https://dash.cloudflare.com/pages
    echo    2. 点击: Create a project
    echo    3. 选择: Connect to Git
    echo    4. 选择: statistics-learning-center 仓库
    echo    5. 配置: Build command 留空, Build output directory: .
    echo    6. 点击: Save and Deploy
) else (
    echo ❌ 推送失败！
    echo.
    echo 🔧 解决方案：
    echo 1. 检查网络连接
    echo 2. 验证GitHub凭据
    echo 3. 尝试使用GitHub Desktop
    echo 4. 使用Personal Access Token
    echo.
    echo 📚 详细步骤请参考: DEPLOY-BOAGOLDEN82.md
)

echo.
pause