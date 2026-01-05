import { NextResponse } from 'next/server';

// 测试 Umami API 连接
const UMAMI_URL = 'https://cloud.umami.is/api';
const WEBSITE_ID = 'b6285af6-37f6-403d-a1de-3e8facfcc8c3';

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
      console.error('Login failed:', response.status);
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
    // 登录获取 token
    const token = await getAuthToken();

    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'UMAMI_USERNAME and UMAMI_PASSWORD must be configured',
        hint: '请检查 .env.local 文件中是否配置了 UMAMI_USERNAME 和 UMAMI_PASSWORD'
      }, { status: 400 });
    }

    // 隐藏 token 的部分内容用于显示
    const maskedToken = token.substring(0, 20) + '...' + token.substring(token.length - 20);

    // 首先测试 token 是否有效 - 使用 /me 端点
    const meResponse = await fetch(`${UMAMI_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!meResponse.ok) {
      const errorText = await meResponse.text();
      return NextResponse.json({
        success: false,
        step: 'token-validation',
        error: 'Token is invalid or expired',
        status: meResponse.status,
        details: errorText,
        token: maskedToken
      }, { status: 500 });
    }

    const userData = await meResponse.json();

    // 获取用户的所有网站
    const websitesResponse = await fetch(`${UMAMI_URL}/websites`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!websitesResponse.ok) {
      const errorText = await websitesResponse.text();
      return NextResponse.json({
        success: false,
        step: 'fetch-websites',
        error: 'Failed to fetch websites',
        status: websitesResponse.status,
        details: errorText
      }, { status: 500 });
    }

    const websites = await websitesResponse.json();

    // 检查配置的 WEBSITE_ID 是否存在
    const targetWebsite = websites.data.find((w: any) => w.id === WEBSITE_ID);

    if (!targetWebsite) {
      return NextResponse.json({
        success: false,
        step: 'website-validation',
        error: 'Configured Website ID not found',
        configuredWebsiteId: WEBSITE_ID,
        availableWebsites: websites.data.map((w: any) => ({
          id: w.id,
          name: w.name,
          domain: w.domain
        })),
        hint: '请确认你的 WEBSITE_ID 是否正确'
      }, { status: 500 });
    }

    // 获取当前时间戳和30天前的时间戳
    const endAt = Date.now();
    const startAt = endAt - 30 * 24 * 60 * 60 * 1000;

    // 测试获取事件
    const url = new URL(`${UMAMI_URL}/websites/${WEBSITE_ID}/events`);
    url.searchParams.set('startAt', startAt.toString());
    url.searchParams.set('endAt', endAt.toString());
    url.searchParams.set('pageSize', '10');

    const eventsResponse = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!eventsResponse.ok) {
      const errorText = await eventsResponse.text();
      return NextResponse.json({
        success: false,
        step: 'fetch-events',
        error: 'Failed to fetch events',
        status: eventsResponse.status,
        details: errorText
      }, { status: 500 });
    }

    const eventsData = await eventsResponse.json();

    // 返回成功的测试结果
    return NextResponse.json({
      success: true,
      message: 'All tests passed!',
      token: maskedToken,
      user: {
        username: userData.username,
        id: userData.id
      },
      website: {
        id: targetWebsite.id,
        name: targetWebsite.name,
        domain: targetWebsite.domain
      },
      timeRange: {
        startAt: new Date(startAt).toISOString(),
        endAt: new Date(endAt).toISOString()
      },
      events: {
        total: eventsData.count || 0,
        sample: eventsData.data?.slice(0, 3) || []
      }
    });

  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error
    }, { status: 500 });
  }
}
