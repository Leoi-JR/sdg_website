import { NextResponse } from 'next/server';

// Umami API 配置
const UMAMI_URL = 'https://cloud.umami.is/api';

// 登录并获取 JWT token
async function getAuthToken(): Promise<string | null> {
  const email = process.env.UMAMI_USERNAME;
  const password = process.env.UMAMI_PASSWORD;

  if (!email || !password) {
    return null;
  }

  try {
    const response = await fetch(`${UMAMI_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
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
        error: 'UMAMI_USERNAME and UMAMI_PASSWORD must be configured'
      }, { status: 400 });
    }

    // 隐藏 token 的部分内容
    const maskedToken = token.substring(0, 20) + '...' + token.substring(token.length - 20);

    const result: any = {
      token: maskedToken,
      tests: []
    };

    // 测试1: 使用 /me 端点验证 token
    const meResponse = await fetch(`${UMAMI_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (meResponse.ok) {
      const userData = await meResponse.json();
      result.tests.push({
        name: 'Token Validation (/me)',
        status: 'passed',
        data: {
          username: userData.username,
          id: userData.id
        }
      });
    } else {
      const errorText = await meResponse.text();
      result.tests.push({
        name: 'Token Validation (/me)',
        status: 'failed',
        error: errorText,
        statusCode: meResponse.status
      });
    }

    // 测试2: 获取网站列表
    const websitesResponse = await fetch(`${UMAMI_URL}/websites`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (websitesResponse.ok) {
      const websites = await websitesResponse.json();
      result.tests.push({
        name: 'Fetch Websites',
        status: 'passed',
        count: websites.data.length,
        websites: websites.data.map((w: any) => ({
          id: w.id,
          name: w.name,
          domain: w.domain
        }))
      });
    } else {
      const errorText = await websitesResponse.text();
      result.tests.push({
        name: 'Fetch Websites',
        status: 'failed',
        error: errorText,
        statusCode: websitesResponse.status
      });
    }

    // 测试3: 尝试不使用 Bearer 前缀
    const testResponse = await fetch(`${UMAMI_URL}/me`, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    });

    if (testResponse.ok) {
      result.tests.push({
        name: 'Without Bearer Prefix',
        status: 'passed',
        note: 'Try using Authorization without "Bearer " prefix'
      });
    } else {
      result.tests.push({
        name: 'Without Bearer Prefix',
        status: 'failed',
        note: 'Bearer prefix is correct'
      });
    }

    return NextResponse.json({
      success: true,
      ...result,
      hints: {
        correctFormat: 'Using JWT token from email/password login',
        authentication: 'Authenticated with email and password'
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
