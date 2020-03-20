import fetch from 'node-fetch';

import { UpcomingEvent } from '@/event';
import { addEventSource } from '@/notify';

type Contest = {
  id: number;
  name: string;
  type: string;
  startTimeSeconds: number;
};
type APIResponse =
  | {
      status: 'OK';
      result: Contest[];
    }
  | { status: 'FAILED' };

// poll checks Cordeforces API for new events
async function poll(): Promise<UpcomingEvent[]> {
  const upcomingContests: Contest[] = await fetch(
    'http://codeforces.com/api/contest.list',
  )
    .then(res => res.json())
    .then((res: APIResponse) => {
      if (res.status !== 'OK') return [];

      const currentTimeSeconds = Date.now() / 1000;
      return res.result.filter(
        contest => contest.startTimeSeconds > currentTimeSeconds,
      );
    })
    .catch(() => []);
  return upcomingContests.map(contest => ({
    id: `codeforces-${contest.id}`,
    name: contest.name,
    type: contest.type,
    startTime: contest.startTimeSeconds,
  }));
}

addEventSource({ poll }, 'Codeforces');
