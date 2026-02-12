# OSINT Intelligence Module Documentation

## Overview
This module provides a production-ready intelligence gathering engine that queries multiple public and private OSINT APIs.

## Installation

1. **Install Dependencies** (from the server root):
```bash
npm install axios node-cache rate-limiter-flexible helmet cors dotenv express-rate-limit express
```

2. **Setup Sherlock CLI** (Optional for Username Intelligence):
Ensure Python is installed, then run:
```bash
pip install sherlock
```

3. **Configure Environment Variables**:
Add your API keys to the `.env` file in the server directory.

## Running the Server
```bash
npm run dev
```

## API Usage

### Multi-Module Intelligence Scan
**Endpoint:** `POST /api/osint/search`

**Request Body:**
```json
{
  "email": "shiva@example.com",
  "phone": "+14155552671",
  "username": "shiva123",
  "name": "Shiva Kumar"
}
```

### Sample Response JSON
```json
{
  "status": "success",
  "email_intelligence": {
    "hibp": {
      "breach_count": 2,
      "breaches": [
        { "name": "LinkedIn", "domain": "linkedin.com", "date": "2016-05-17" }
      ]
    },
    "abstract": {
      "is_valid_format": true,
      "is_disposable": false,
      "domain": "example.com",
      "mx_records": true
    },
    "gravatar": {
      "exists": true,
      "url": "https://www.gravatar.com/avatar/..."
    }
  },
  "phone_intelligence": {
    "abstract": {
      "country": "United States",
      "carrier": "Verizon",
      "line_type": "mobile",
      "valid": true
    }
  },
  "username_intelligence": {
    "found_accounts": [
      { "platform": "github.com", "url": "https://github.com/shiva123", "exists": true }
    ]
  },
  "name_intelligence": [
    {
      "title": "OSINT Researcher Shiva Kumar develops new portal",
      "source": "TechCrunch",
      "url": "https://techcrunch.com/...",
      "published_at": "2024-01-20T12:00:00Z"
    }
  ],
  "disclaimer": "Data shown is collected from publicly available sources only."
}
```

## Security Features
- **Rate Limiting**: Integrated via `express-rate-limit` (10 requests/min).
- **Caching**: Results are cached using `node-cache` for 10 minutes to reduce API latency and costs.
- **Parallel Execution**: All OSINT modules run concurrently using `Promise.allSettled` for maximum performance.
- **Timeout Management**: Slow APIs are automatically timed out after 5 seconds to prevent request hanging.
