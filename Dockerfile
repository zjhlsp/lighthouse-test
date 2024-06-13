# 使用 Node.js 官方镜像作为基础镜像
FROM node:latest

# 设置工作目录
WORKDIR /usr/src/app

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 安装 lighthouse
RUN npm install -g lighthouse

# # 安装 Chromium 的依赖和 Chrome
# RUN apt-get update \
# RUN apt-get install -y wget gnupg apt-transport-https curl \
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
# RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
# RUN apt-get update \
# RUN apt-get install -y google-chrome-stable

# # 设置 CHROME_PATH 环境变量
# ENV CHROME_PATH=/usr/bin/google-chrome

# 将项目文件复制到工作目录
COPY . ./

# 暴露应用端口
EXPOSE 3500

# 运行 NestJS 应用
CMD ["npm", "run", "start:prod"]
