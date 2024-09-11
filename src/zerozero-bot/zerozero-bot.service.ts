import { Injectable } from '@nestjs/common';
import { CreateZerozeroBotDto, text } from './dto/create-zerozero-bot.dto';
import { UpdateZerozeroBotDto } from './dto/update-zerozero-bot.dto';
const WEBHOOK_URL =
  'https://open.feishu.cn/open-apis/bot/v2/hook/d6793679-b8e0-445b-9a6d-a63a1e733dea';
// 格式化提交记录
function formatCommits(commits) {
  const message = {
    branch: commits.ref.split('/').pop(),
    name: commits.repository.name,
    url: commits.repository.url,
    commits: commits.commits.map((item) => {
      return {
        id: item.id,
        timestamp: item.timestamp,
        message: item.message,
        author: item.committer.name,
      };
    }),
  };
  return message;
}

// 发送消息到飞书
async function sendToFeishu(message) {
  try {
    if (
      !(
        message.branch === 'main' ||
        message.branch === 'test' ||
        message.branch === 'master'
      )
    ) {
      return;
    }
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
              title: `⭐⭐ ${message.name} -> ${message.branch} 更新 ⭐⭐`,
              content: message.commits.map((item) => {
                return [
                  {
                    tag: 'text',
                    text: `  - 更新内容: ${item.message} \n`,
                  },
                  {
                    tag: 'text',
                    text: `  - 时间: ${item.timestamp} \n`,
                  },
                  {
                    tag: 'text',
                    text: `  - commit id: ${item.id} \n \n`,
                  },
                ];
              }),

              // content: [
              //   [
              //     {
              //       tag: 'text',
              //       text: `  - 更新内容: ${message} \n`,
              //     },
              //     // {
              //     //   tag: 'text',
              //     //   text: '  - Commit 地址: ',
              //     //   href: message.url,
              //     // },
              //     // {
              //     //   tag: 'a',
              //     //   text: '请点击 \n',
              //     //   href: message.url,
              //     // },
              //   ],
              // ],
            },
          },
        },
      }),
      // body: JSON.stringify({
      //   msg_type: 'text',
      //   content: {
      //     text: message,
      //   },
      // }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log('消息发送成功!');
  } catch (error) {
    console.error(`消息发送失败! 错误: ${error}`);
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
