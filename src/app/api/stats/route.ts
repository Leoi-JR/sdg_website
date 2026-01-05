import { NextResponse } from 'next/server';

// Umami API 配置
const UMAMI_URL = 'https://cloud.umami.is/api';
const WEBSITE_ID = 'b6285af6-37f6-403d-a1de-3e8facfcc8c3';

interface UmamiStats {
  views: number;
  downloads: number;
}

// 登录并获取 JWT token
async function getAuthToken(): Promise<string | null> {
  const email = process.env.UMAMI_USERNAME;
  const password = process.env.UMAMI_PASSWORD;

  if (!email || !password) {
    console.error('UMAMI_USERNAME and UMAMI_PASSWORD must be configured');
    return null;
  }

  try {
    const response = await fetch(`${UMAMI_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Login failed:', response.status, errorText);
      return null;
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

export async function GET() {
  try {
    // 获取认证token
    const token = await getAuthToken();

    if (!token) {
      console.warn('Failed to get authentication token');
      return NextResponse.json({
        'shenzhen-sdg': { views: 0, downloads: 0 },
        'city-sdg': { views: 0, downloads: 0 }
      });
    }

    // 获取当前时间戳和30天前的时间戳
    const endAt = Date.now();
    const startAt = endAt - 30 * 24 * 60 * 60 * 1000; // 30天前

    // 获取所有报告的统计数据
    const [shenzhenViews, shenzhenDownloads, cityViews, cityDownloads] = await Promise.all([
      getEventStats('shenzhen-sdg-view', token, startAt, endAt),
      getEventStats('shenzhen-sdg-download', token, startAt, endAt),
      getEventStats('city-sdg-view', token, startAt, endAt),
      getEventStats('city-sdg-download', token, startAt, endAt)
    ]);

    const stats: Record<string, UmamiStats> = {
      'shenzhen-sdg': {
        views: shenzhenViews,
        downloads: shenzhenDownloads
      },
      'city-sdg': {
        views: cityViews,
        downloads: cityDownloads
      }
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching Umami stats:', error);
    return NextResponse.json({
      'shenzhen-sdg': { views: 0, downloads: 0 },
      'city-sdg': { views: 0, downloads: 0 }
    });
  }
}

// 获取单个事件的统计
async function getEventStats(eventName: string, token: string, startAt: number, endAt: number): Promise<number> {
  try {
    const url = new URL(`${UMAMI_URL}/websites/${WEBSITE_ID}/events`);
    url.searchParams.set('startAt', startAt.toString());
    url.searchParams.set('endAt', endAt.toString());
    url.searchParams.set('search', eventName);
    url.searchParams.set('pageSize', '1');

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Umami API error for ${eventName}:`, response.status, errorText);
      return 0;
    }

    const data = await response.json();
    return data?.count || 0;
  } catch (error) {
    console.error(`Error fetching stats for ${eventName}:`, error);
    return 0;
  }
}
