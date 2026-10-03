import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const updatedData = await request.json();

    const configPath = path.join(process.cwd(), 'src', 'config', 'portfolio.config.ts');

    const fileContent = `import { PortfolioData } from '@/types/portfolio';\n\nexport const initialPortfolioData: PortfolioData = ${JSON.stringify(
      updatedData,
      null,
      2
    )};\n`;

    fs.writeFileSync(configPath, fileContent, 'utf8');

    return NextResponse.json({
      success: true,
      message: 'portfolio.config.ts updated directly on disk!',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update local configuration file on disk.' },
      { status: 500 }
    );
  }
}
