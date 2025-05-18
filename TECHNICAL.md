# Technical Documentation - Loom Platform Integrations

## Database Architecture

### Drizzle ORM Integration

Drizzle ORM is used as the primary database ORM for PostgreSQL, providing type-safe database operations and schema management.

#### Schema Configuration

The database schema is defined in the `drizzle` directory, following Drizzle's schema definition syntax:

```typescript
// Example schema definition
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const videos = pgTable("videos", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
```

#### Database Operations

```typescript
// Example of a database query
import { db } from "@/lib/db";
import { videos } from "@/drizzle/schema";

export async function getVideoById(id: string) {
  return await db.query.videos.findFirst({
    where: (videos, { eq }) => eq(videos.id, id),
  });
}
```

### Xata Integration

Xata is utilized for enhanced search capabilities and real-time features in the application.

#### Configuration

```typescript
// Example Xata client configuration
import { getXataClient } from "@/lib/xata";

const xata = getXataClient();

// Example search implementation
export async function searchVideos(query: string) {
  const results = await xata.db.videos.search(query, {
    fuzziness: 1,
    prefix: "phrase",
  });
  return results;
}
```

## Video Upload System

### Bunny Platform Integration

Bunny Platform is used for efficient video upload, storage, and streaming capabilities.

#### Upload Configuration

```typescript
// Example upload configuration
const BUNNY_API_KEY = process.env.BUNNY_API_KEY;
const BUNNY_LIBRARY_ID = process.env.BUNNY_LIBRARY_ID;

interface UploadResponse {
  guid: string;
  libraryId: number;
  status: string;
}

export async function uploadVideo(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("video", file);

  const response = await fetch(
    `https://video.bunnycdn.com/library/${BUNNY_LIBRARY_ID}/videos`,
    {
      method: "POST",
      headers: {
        AccessKey: BUNNY_API_KEY,
      },
      body: formData,
    }
  );

  return response.json();
}
```

#### Video Processing

Bunny Platform automatically handles video processing, including:

- Transcoding for different quality levels
- Thumbnail generation
- Adaptive bitrate streaming

```typescript
// Example of retrieving video status
export async function getVideoStatus(videoId: string) {
  const response = await fetch(
    `https://video.bunnycdn.com/library/${BUNNY_LIBRARY_ID}/videos/${videoId}`,
    {
      headers: {
        AccessKey: BUNNY_API_KEY,
      },
    }
  );

  return response.json();
}
```

## Integration Flow

1. **Video Upload Process**:

   - User initiates upload
   - File is uploaded to Bunny Platform
   - Video metadata is stored in PostgreSQL via Drizzle
   - Search index is updated in Xata

2. **Video Retrieval Process**:
   - Query video metadata from PostgreSQL
   - Fetch streaming URLs from Bunny Platform
   - Utilize Xata for search functionality

## Environment Configuration

```env
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/loom"

# Bunny Platform Configuration
BUNNY_API_KEY="your-api-key"
BUNNY_LIBRARY_ID="your-library-id"
BUNNY_PULL_ZONE="your-pull-zone"

# Xata Configuration
XATA_API_KEY="your-xata-api-key"
XATA_BRANCH="main"
```

## Security Considerations

- API keys are stored securely in environment variables
- Bunny Platform provides secure video delivery through signed URLs
- Database connections are encrypted
- Input validation is implemented for all user inputs

## Error Handling

```typescript
// Example error handling for video upload
export async function handleVideoUpload(file: File) {
  try {
    const uploadResponse = await uploadVideo(file);
    await db.insert(videos).values({
      id: uploadResponse.guid,
      videoUrl: `https://${process.env.BUNNY_PULL_ZONE}/${uploadResponse.guid}/play.m3u8`,
      // ... other fields
    });
  } catch (error) {
    console.error("Video upload failed:", error);
    throw new Error("Failed to upload video");
  }
}
```

## Performance Optimization

- Bunny Platform's CDN ensures fast video delivery
- Database queries are optimized using Drizzle's query builder
- Xata provides efficient search capabilities
- Caching is implemented for frequently accessed data

## Monitoring and Logging

- Video upload and processing status is tracked
- Database operations are logged
- Error tracking is implemented
- Performance metrics are collected

## Screen Recording System

### MediaRecorder Integration

The platform implements screen recording functionality using the browser's MediaRecorder API with custom configurations:

```typescript
// Default recording configuration
export const DEFAULT_RECORDING_CONFIG = {
  mimeType: "video/webm;codecs=vp9,opus",
  audioBitsPerSecond: 128000,
  videoBitsPerSecond: 2500000,
};
```

### Recording Workflow

1. **Recording Setup**:

   - Captures display stream and optional microphone audio
   - Combines video and audio tracks into a single MediaStream
   - Initializes MediaRecorder with optimized configuration

2. **Stream Management**:

   - Handles both screen content and audio mixing
   - Supports system audio and microphone input combination
   - Manages stream cleanup and resource disposal

3. **Recording Controls**:
   - Start/Stop/Reset recording capabilities
   - Automatic duration tracking
   - Blob creation for video storage

### State Management

Recording state is managed through a custom hook (useScreenRecording) that handles:

- Recording status tracking
- Media stream lifecycle
- Blob and URL management
- Duration calculations

### Error Handling

- Graceful fallback for unsupported codecs
- Proper resource cleanup on errors
- Comprehensive error logging

This documentation provides a comprehensive overview of how Bunny Platform, Xata, and Drizzle are integrated into the Loom platform. For specific implementation details, refer to the corresponding files in the codebase.
