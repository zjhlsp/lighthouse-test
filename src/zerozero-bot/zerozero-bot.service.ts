import { Injectable } from '@nestjs/common';
import { CreateZerozeroBotDto, text } from './dto/create-zerozero-bot.dto';
import { UpdateZerozeroBotDto } from './dto/update-zerozero-bot.dto';
const WEBHOOK_URL =
  // 'https://open.feishu.cn/open-apis/bot/v2/hook/080417c6-ef64-4c42-9b32-c9614ca7ebcf';
  'https://open.feishu.cn/open-apis/bot/v2/hook/b9fd24c5-9e16-48d6-be93-c0b801737b26;';
// 格式化提交记录
function formatCommits(commits) {
  // console.log(commits);
  const message = {
    branch: (commits?.ref || ' /test')?.split('/')?.pop(),
    name: commits.repository.name,
    url: commits.repository.url,
    commits: commits.commits
      .map((item) => {
        return {
          id: item.id,
          timestamp: item.timestamp,
          message: item.message,
          author: item.committer.name,
        };
      })
      .filter(
        (item) =>
          !item.message.includes('Merge pull request') &&
          !item.message.includes('Update from Shopify'),
      ),
  };
  return message;
}
// 过滤条件
function filterCommits(message) {
  const branch = ['main', 'test', 'master'];
  return branch.includes(message.branch);
}

// 发送消息到飞书
async function sendToFeishu(message) {
  if (filterCommits(message)) {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          msg_type: 'post',
          content: {
            post: {
              zh_cn: {
                title:
                  message.branch === 'test'
                    ? `✨ ${message.name} 测试服更新 ✨`
                    : `🚀 ${message.name} 正式服更新 🚀`,
                content: message.commits.map((item) => {
                  return [
                    {
                      tag: 'text',
                      text: `🥇更新🥇: ${item.message} \n`,
                    },
                    {
                      tag: 'text',
                      text: `🥈时间🥈: ${item.timestamp} \n`,
                    },
                    {
                      tag: 'text',
                      text: `------------------------- \n`,
                    },
                  ];
                }),
              },
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('消息发送成功!qqq1111', response);
    } catch (error) {
      console.error(`消息发送失败! 错误: ${error}`);
    }
  }
}

@Injectable()
export class ZerozeroBotService {
  async create(createZerozeroBotDto: CreateZerozeroBotDto) {
    const content = createZerozeroBotDto || text;
    const msg = formatCommits(content);
    await sendToFeishu(msg);
  }

  findAll() {
    return `This action returns all zerozeroBot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zerozeroBot`;
  }

  update(id: number, updateZerozeroBotDto: UpdateZerozeroBotDto) {
    return `This action updates a #${id} zerozeroBot`;
  }

  remove(id: number) {
    return `This action removes a #${id} zerozeroBot`;
  }
}
