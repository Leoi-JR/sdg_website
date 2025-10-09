import { NextRequest, NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';

// 表单数据接口
interface ContactFormData {
  name: string;
  email: string;
  organization: string;
  position: string;
  message: string;
}

// 验证表单数据
function validateFormData(data: unknown): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  const formData = data as Record<string, unknown>;

  if (!formData.name || typeof formData.name !== 'string' || formData.name.trim().length === 0) {
    errors.push('姓名不能为空');
  }

  if (!formData.email || typeof formData.email !== 'string' || formData.email.trim().length === 0) {
    errors.push('邮箱不能为空');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('邮箱格式不正确');
    }
  }

  if (!formData.organization || typeof formData.organization !== 'string' || formData.organization.trim().length === 0) {
    errors.push('机构/学校不能为空');
  }

  if (!formData.position || typeof formData.position !== 'string' || formData.position.trim().length === 0) {
    errors.push('职位不能为空');
  }

  if (!formData.message || typeof formData.message !== 'string' || formData.message.trim().length < 10) {
    errors.push('消息内容至少需要10个字符');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// 发送邮件通知
async function sendEmailNotification(formData: ContactFormData) {
  // 邮件配置 - 使用环境变量
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // 发送邮件的邮箱
      pass: process.env.SMTP_PASS, // 邮箱密码或应用专用密码
    },
  });

  // 邮件内容
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL || 'contact@mofimo.cn', // 接收邮件的邮箱
    subject: '🌍 SDG网站 - 新的联系表单提交',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00d4ff; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">
          新的联系表单提交
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">联系信息</h3>
          <p><strong>姓名:</strong> ${formData.name}</p>
          <p><strong>邮箱:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
          <p><strong>机构/学校:</strong> ${formData.organization}</p>
          <p><strong>职位:</strong> ${formData.position}</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">消息内容</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${formData.message}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>此邮件由 SDG 宣传展示网站自动发送</p>
          <p>提交时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</p>
        </div>
      </div>
    `,
  };

  // 发送邮件
  await transporter.sendMail(mailOptions);
}

// 保存到本地日志文件（可选的备份方案）
async function saveToLog(formData: ContactFormData) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    data: formData,
  };
  
  // 在生产环境中，这里可以保存到数据库
  // 目前仅在服务器控制台输出
  console.log('Contact form submission:', logEntry);
}

// POST 请求处理
export async function POST(request: NextRequest) {
  try {
    // 解析请求数据
    const body = await request.json();
    
    // 验证数据
    const validation = validateFormData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: '数据验证失败', 
          errors: validation.errors 
        },
        { status: 400 }
      );
    }

    const formData: ContactFormData = {
      name: body.name.trim(),
      email: body.email.trim(),
      organization: body.organization.trim(),
      position: body.position.trim(),
      message: body.message.trim(),
    };

    // 保存数据到日志
    await saveToLog(formData);

    // 发送邮件通知
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await sendEmailNotification(formData);
      } catch (emailError) {
        console.error('邮件发送失败:', emailError);
        // 邮件发送失败不影响整体流程，继续返回成功
      }
    }

    // 返回成功响应
    return NextResponse.json({
      success: true,
      message: '消息发送成功！我们会尽快回复您。'
    });

  } catch (error) {
    console.error('API错误:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: '服务器内部错误，请稍后重试。' 
      },
      { status: 500 }
    );
  }
}

// GET 请求处理（可选，用于健康检查）
export async function GET() {
  return NextResponse.json({
    message: 'Contact API is working',
    timestamp: new Date().toISOString()
  });
}
