#!/usr/bin/env bash
set -e

PROJECT="my-stuff-ai"
SERVICE="rejoice-docs-mcp"
REGION="us-central1"

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Deploying MCP server to Cloud Run..."
gcloud run deploy "$SERVICE" \
  --source="$REPO_ROOT" \
  --clear-base-image \
  --project="$PROJECT" \
  --region="$REGION" \
  --port=8080 \
  --memory=256Mi \
  --min-instances=0 \
  --max-instances=2 \
  --allow-unauthenticated

echo ""
echo "Done. MCP endpoint: https://$(gcloud run services describe $SERVICE --project=$PROJECT --region=$REGION --format='value(status.url)' | sed 's|https://||')/mcp"
