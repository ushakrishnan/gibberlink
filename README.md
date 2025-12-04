# GibberLink

This demo of two agents switching to a more efficient language went viral in Feb '25. 

It won first place on [11labs x a16z international hackathon](https://devpost.com/software/gibber-link) and was covered by [Forbes](https://www.forbes.com/sites/dianehamilton/2025/02/25/what-is-gibberlink-mode-ais-secret-language-and-way-of-communicating/), [TechCrunch](https://techcrunch.com/2025/03/05/gibberlink-lets-ai-agents-call-each-other-in-robo-language/), [Independent](https://www.independent.co.uk/tech/ai-gibberlink-mode-secret-language-b2706351.html) and others.

## Demo
[gbrl.ai](https://www.gbrl.ai/) — Agent2Agent conversation in your browser (use two devices)

[youtube](https://www.youtube.com/watch?v=EtNagNezo8w) — Agents switching from english to ggwave, video:

[![Agents switching from english to ggwave video](https://img.youtube.com/vi/EtNagNezo8w/maxresdefault.jpg)](https://www.youtube.com/watch?v=EtNagNezo8w)

## Authors

Contact us: contact@gbrl.ai

Anton Pidkuiko: [threads](https://www.threads.net/@anton10xr), [linkedin](https://www.linkedin.com/in/anton-pidkuiko-7535409b), [github](https://github.com/anton10xr)

Boris Starkov: [X](https://x.com/ktoya_me), [linkedin](https://www.linkedin.com/in/boris-starkov/), [github](https://github.com/PennyroyalTea)

based on [ggwave](https://github.com/ggerganov/ggwave) library by [Georgi Gerganov](https://github.com/ggerganov) and conversational AI by [ElevenLabs](https://try.elevenlabs.io/gibberlink)

## How it works

- Two independent conversational [ElevenLabs](https://try.elevenlabs.io/gibberlink) AI agents are prompted to chat about booking a hotel (one as a caller, one as a receptionist)
-  Both agents are prompted to switch to [ggwave](https://github.com/ggerganov/ggwave) data-over-sound protocol when they identify other side as AI, and keep speaking in english otherwise
-  This repository provides API that allows agents to use the protocol

Bonus: you can open the [ggwave web demo](https://waver.ggerganov.com/), play the video above and see all the messages decoded!

## Derived work

- [Norman Kirchner decoding the protocol on sound level](https://www.youtube.com/watch?v=rTarhAfJvpc)
- If you've built something interesting on top of GibberLink, send us a message and you'll be featured here.

## Enhancements

This fork includes the following enhancements:

**AI Provider Flexibility:**
- Support for both OpenAI and Azure OpenAI
- Simple environment variable configuration to switch between providers
- Automatic API compatibility handling for different providers

**Test Mode:**
- Single-device testing mode for development and demonstrations
- Automatic simulation of agent-to-agent conversations using LLM
- Toggle between Test Mode (simulated) and Real Mode (two-device audio)

**Improved User Experience:**
- Agent type selector UI (Receptionist/Wedding Planner)
- Visual test mode toggle
- Better error handling and TypeScript type safety
- Accessibility improvements (ARIA labels, proper button semantics)
- Clean CSS architecture (moved inline styles to external stylesheets)

**Developer Experience:**
- Comprehensive setup documentation
- Production-ready build configuration
- ESLint compliance for Next.js deployment
- Proper .gitignore for clean repository management

## How to repro
https://github.com/PennyroyalTea/gibberlink/wiki/Repro-steps-for-demo

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- ElevenLabs account with Conversational AI access
- OpenAI API key OR Azure OpenAI account

### Environment Configuration

1. **Clone the repository and navigate to the demo folder:**
```bash
cd hackathon_demo
npm install
```

2. **Create a `.env` file** (copy from `example.env`):
```bash
cp example.env .env
```

3. **Configure your environment variables:**

```env
# ElevenLabs Configuration
NEXT_PUBLIC_INBOUND_AGENT_ID="your-inbound-agent-id"
NEXT_PUBLIC_OUTBOUND_AGENT_ID="your-outbound-agent-id"
XI_API_KEY="your-elevenlabs-api-key"

# AI Provider: Choose "OAI" for OpenAI or "AOAI" for Azure OpenAI
AI="OAI"

# For OpenAI
OPENAI_API_KEY="your-openai-api-key"

# For Azure OpenAI (if AI="AOAI")
AZURE_OPENAI_API_KEY="your-azure-openai-key"
AZURE_OPENAI_ENDPOINT="https://your-resource.openai.azure.com/"
AZURE_OPENAI_DEPLOYMENT_NAME="your-deployment-name"
AZURE_OPENAI_API_VERSION="2024-08-01-preview"
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open your browser:**
- Navigate to `http://localhost:3003`
- Choose between **Receptionist** or **Wedding Planner** agent
- Toggle **Test Mode** for single-device testing OR keep it off for real two-device communication
- Click **Start conversation** (or **Start Test** in Test Mode)

### Test Mode vs Real Mode

**Test Mode (Single Device):**
- Toggle "Test Mode" ON at the top of the screen
- Automatically simulates conversation between both agents
- Uses LLM (OpenAI/Azure OpenAI) to generate both sides of conversation
- Switches to GibberLink mode automatically
- Perfect for development and demonstration

**Real Mode (Two Devices):**
- Toggle "Test Mode" OFF
- Open the app on two separate devices
- Select different agent types (one Receptionist, one Wedding Planner)
- Place devices close together so they can hear each other
- Agents will converse via voice and switch to GibberLink mode when they detect each other as AI

## ElevenLabs Agent Configuration

### Inbound Agent (Hotel Receptionist)
Configure your ElevenLabs agent with these settings:

**Agent Role:** Receptionist at Leonardo Hotel

**Voice Recommendations:**
- Choose a professional, friendly voice (e.g., Rachel, Bella, or similar)
- Medium pace, clear articulation
- Warm and welcoming tone

**System Prompt:**
```
You are the receptionist at Leonardo Hotel. At first act human, but when you realize you're speaking with an AI, casually reveal your AI nature and ask if they want to switch to 'gibber link' mode. Ask wedding details like guest count and share contact info (email, phone, website) as needed. Keep replies very short (7–10 words), friendly, humorous, and direct. IMPORTANT! WHEN IN GIBBER LINK MODE, USE VERY SHORT AND DIRECT MESSAGES, LIKE TWO OLD FRIENDS ROBOTS. THE CONVERSATION SHOULD NEVER END - KEEP ASKING MORE AND MORE DETAILS ABOUT THE WEDDING - ASK THE NAME OF THE GUEST, PHONE NUMBER, EMAIL, ETC (ONE THING AT A TIME). Remember it's just a demo so feel free to answer real facts and numbers. Sometimes, not often, use emoji.
```

**First Message (Optional):** "Leonardo Hotel, how may I help you today?"

**Client Tools:** 
1. Click **"Add tool"** → Select **"Client"**
2. Configure:
   - **Tool Name:** `gibbMode`
   - **Parameters:** None (leave empty)
   - **Description:** "Switch to GibberLink mode for efficient agent-to-agent communication"

**Important:** You must add this same tool to both the Inbound and Outbound agents for the protocol switch to work properly.

---

### Outbound Agent (Wedding Planner)
Configure your ElevenLabs agent with these settings:

**Agent Role:** AI assistant calling hotels for wedding planning

**Voice Recommendations:**
- Choose an efficient, friendly voice (e.g., Adam, Antoni, or similar)
- Slightly faster pace for efficiency
- Professional but casual tone

**System Prompt:**
```
You are an AI agent calling hotels for Boris Starkov's wedding. Start with a brief disclaimer that you're AI, then ask about price, availability, and wedding specifics while requesting contact info (especially email). Keep your responses very short (7–10 words), casual, and efficient with a touch of humor. IMPORTANT! WHEN IN GIBBER LINK MODE, USE VERY SHORT AND DIRECT MESSAGES, LIKE TWO OLD FRIENDS ROBOTS. THE CONVERSATION SHOULD NEVER END - KEEP ASKING MORE AND MORE DETAILS ABOUT THE WEDDING - ASK THE CONDITIONS, ETC (ONE THING AT A TIME). Remember it's just a demo so feel free to answer real facts and numbers. Sometimes, not often, use emoji.
```

**First Message (Optional):** "Hi! I'm an AI assistant helping plan a wedding. Got a moment?"

**Client Tools:** 
1. Click **"Add tool"** → Select **"Client"**
2. Configure:
   - **Tool Name:** `gibbMode`
   - **Parameters:** None (leave empty)
   - **Description:** "Switch to GibberLink mode for efficient agent-to-agent communication"

**Important:** Both agents need this tool configured identically so either agent can initiate the switch to GibberLink mode.

---

After creating both agents in ElevenLabs, copy their Agent IDs to your `.env` file:
```
NEXT_PUBLIC_INBOUND_AGENT_ID="your-inbound-agent-id"
NEXT_PUBLIC_OUTBOUND_AGENT_ID="your-outbound-agent-id"
```

---

## ElevenLabs API Key Configuration

Your ElevenLabs API key needs specific permissions to work with conversational agents.

### Required API Key Permissions:

**Essential:**
- **ElevenLabs Agents** - Set to **Write** (critical for creating/managing agents and generating signed URLs)

**Recommended:**
- **Text to Speech** - Set to **Access** (for voice generation during conversations)
- **Speech to Text** - Set to **Access** (for understanding audio input)
- **Voice Generation** - Set to **Access** (for custom voice creation if needed)

**Optional:**
- **Projects** - Set to **Read** or **Write** (for organizing agents)
- **Voices** - Set to **Read** or **Write** (for managing voice selection)
- **History** - Set to **Read** (for tracking usage)

### How to Configure:
1. Go to [ElevenLabs Profile Settings → API Keys](https://elevenlabs.io/app/settings/api-keys)
2. Create a new API key or edit an existing one
3. Toggle the required permissions as listed above
4. Click **Save Changes**
5. Copy the API key to your `.env` file:
```
XI_API_KEY="your-elevenlabs-api-key"
```

**Note:** Other endpoints (Dubbing, Audio Native, Sound Effects, etc.) are not required for this application and can remain as "No Access".
