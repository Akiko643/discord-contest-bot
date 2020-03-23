import fetch from 'node-fetch';

import { UpcomingEvent } from '@/event';
import { addEventSource } from '@/notify';

type Contest = { title: string; startTime: number; titleSlug: string };
type APIResponse = { data: { allContests: Contest[] } };

// poll checks Leetocode GraphQL API for new contests
async function poll(): Promise<UpcomingEvent[]> {
  const upcomingContests: Contest[] = await fetch(
    'https://leetcode.com/graphql',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body:
        '{"operationName":null,"variables":{},"query":"{\n  allContests {\n    title\n    titleSlug\n    startTime\n  }\n}\n"}',
    },
  )
    .then(res => res.json())
    .then((res: APIResponse) => {
      const currentTimeSeconds = Date.now() / 1000;
      return res.data.allContests.filter(
        contest => contest.startTime > currentTimeSeconds,
      );
    })
    .catch(() => []);
  return upcomingContests.map(contest => ({
    id: `leetcode-${contest.titleSlug}`,
    url: 'https://leetcode.com/contest',
    name: contest.title,
    platform: 'Leetcode',
    startTime: contest.startTime,
  }));
}

addEventSource({ poll }, 'Leetcode');
