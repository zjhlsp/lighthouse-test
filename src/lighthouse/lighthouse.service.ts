import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

@Injectable()
export class LighthouseService {
  private lighthouseData = [];
  private times = 1;

  async testOnce(url: string) {
    try {
      const command = `lighthouse ${url} --output json --chrome-flags="--no-sandbox"`;

      const { stdout, stderr } = await execPromise(command, {
        maxBuffer: 10 * 1024 * 1024,
      });

      const report = JSON.parse(stdout);
      const fcp = (
        report.audits['first-contentful-paint'].numericValue / 1000
      ).toFixed(2);
      const lcp = (
        report.audits['largest-contentful-paint'].numericValue / 1000
      ).toFixed(2);
      return { fcp, lcp };
    } catch (error) {
      console.error(`Error running lighthouse: ${error.message}`);
      return null;
    }
  }

  async handleTest({ url, times }) {
    this.lighthouseData.length = 0;
    this.times = times;
    const promises = [];

    for (let i = 1; i <= times; i++) {
      promises.push(
        this.testOnce(url).then((result) => {
          if (result) {
            this.lighthouseData.push({
              ...result,
              run: i,
            });
          }
        }),
      );
    }

    await Promise.all(promises).catch((err) => {
      throw new Error('Internal server error: ' + err);
    });
    const total = this.getAverage();

    return {
      data: this.lighthouseData,
      total,
    };
  }

  getAverage() {
    const totalFcp = this.lighthouseData.reduce(
      (acc, cur) => acc + Number(cur.fcp),
      0,
    );
    const totalLcp = this.lighthouseData.reduce(
      (acc, cur) => acc + Number(cur.lcp),
      0,
    );

    const averageFcp = totalFcp / this.times;
    const averageLcp = totalLcp / this.times;

    return {
      averageFcp: averageFcp.toFixed(2),
      averageLcp: averageLcp.toFixed(2),
      times: this.times,
    };
  }

  async testTenTimes(url: string) {
    this.lighthouseData.length = 0;
    this.times = 10;
    const promises = [];

    for (let i = 0; i < 10; i++) {
      promises.push(
        this.testOnce(url).then((result) => {
          if (result) {
            this.lighthouseData.push({
              ...result,
              run: i + 1,
            });
          }
        }),
      );
    }

    await Promise.all(promises).catch((err) => {
      throw new Error('Internal server error: ' + err);
    });

    return this.lighthouseData;
  }
}
