import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

const AI_PROVIDER = process.env.AI || 'OAI'

// Initialize OpenAI client based on provider
const openai = AI_PROVIDER === 'AOAI'
  ? new OpenAI({
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}`,
      defaultQuery: { 'api-version': process.env.AZURE_OPENAI_API_VERSION },
      defaultHeaders: { 'api-key': process.env.AZURE_OPENAI_API_KEY },
    })
  : new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

// Get model name based on provider
const getModelName = () => {
  if (AI_PROVIDER === 'AOAI') {
    // For Azure OpenAI, use empty string as model name (deployment handles it)
    return ''
  }
  return 'gpt-4o-mini'
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    
    const requestParams: any = {
      model: getModelName(),
      messages,
      temperature: 1,
      top_p: 1,
      stream: false,
      stop: null
    }

    // Azure OpenAI uses max_completion_tokens, OpenAI uses max_tokens
    if (AI_PROVIDER === 'AOAI') {
      requestParams.max_completion_tokens = 1024
    } else {
      requestParams.max_tokens = 1024
    }

    const completion = await openai.chat.completions.create(requestParams)

    console.log('messages', messages);
    console.log('assistant response:', completion.choices[0].message);

    return NextResponse.json(completion.choices[0].message)
  } catch (error) {
    console.error('AI API Error:', error)
    return NextResponse.json(
      { error: 'AI Service Unavailable' },
      { status: 503 }
    )
  }
}
