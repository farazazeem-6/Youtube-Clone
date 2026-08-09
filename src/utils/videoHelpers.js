export const buildVideoActionPayload = (video) => ({
  title: video?.snippet?.title,
  thumbnail:
    video?.snippet?.thumbnails?.medium?.url ||
    video?.snippet?.thumbnails?.default?.url,
  channelTitle: video?.snippet?.channelTitle,
  channelId: video?.snippet?.channelId,
  publishedAt: video?.snippet?.publishedAt,
  description: video?.snippet?.description,
});
