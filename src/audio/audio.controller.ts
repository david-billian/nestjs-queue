import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';

@Controller('v1/file')
export class AudioController {
  constructor(
    @InjectQueue('audio') private readonly audioQueue: Queue,
    @InjectQueue('video') private readonly videoQueue: Queue,
  ) {}

  @Post()
  async transcode() {
    await this.audioQueue.add('audio-job', {
      file: 'audio.mp3',
    });
    await this.videoQueue.add('video-job', {
      file: 'video.mp4',
    });
  }
}
