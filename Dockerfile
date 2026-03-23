FROM python:3.12-slim AS base

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

WORKDIR /app

# Install Python dependencies first (cached layer)
COPY mcp/pyproject.toml mcp/uv.lock ./mcp/
RUN cd mcp && uv sync --frozen --no-dev

# Copy monorepo files the MCP server reads at runtime
COPY README.md .
COPY packages/rejoice/README.md ./packages/rejoice/README.md
COPY packages/create-rejoice-app/README.md ./packages/create-rejoice-app/README.md
COPY packages/create-rejoice-app/templates/ts/ ./packages/create-rejoice-app/templates/ts/
COPY mcp/server.py ./mcp/

# Website docs (optional — may not exist in all builds)
COPY websit[e]/docs.html ./website/

EXPOSE 8080

CMD ["uv", "run", "--directory", "mcp", "--no-sync", "server.py"]
