import { Injectable } from '@nestjs/common';
import { CreateZerozeroBotDto, text } from './dto/create-zerozero-bot.dto';
import { UpdateZerozeroBotDto } from './dto/update-zerozero-bot.dto';
const WEBHOOK_URL =
  'https://open.feishu.cn/open-apis/bot/v2/hook/080417c6-ef64-4c42-9b32-c9614ca7ebcf';
// 格式化提交记录
function formatCommits(commits) {
  console.log(commits, 'commit');
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
    const msg = message.commits.map((item) => {
      if (item.message.includes('Merge pull request')) {
        item.message = 'Merge操作';
      } else if (item.message.includes('Update from Shopify')) {
        item.message = 'Shopify 线上修改';
      }
      return item;
    });
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
              content: msg.map((item) => {
                return [
                  {
                    tag: 'text',
                    text: `🥇更新: ${item.message} \n`,
                  },
                  {
                    tag: 'text',
                    text: `🥈时间: ${item.timestamp} \n`,
                  },
                  {
                    tag: 'text',
                    text: `------------------------- \n`,
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

  handleShopifyAlarm(event: any) {
    const content = event || '';
    if (content) {
      console.log('content', content);
    }
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
