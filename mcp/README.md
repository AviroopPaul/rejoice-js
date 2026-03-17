# rejoice-docs MCP Server

A Python MCP server that exposes rejoice-js documentation, exports, and code examples to AI agents.

## Setup

```bash
cd mcp
uv run server.py
```

## Resources

| URI                                            | Description                                                 |
| ---------------------------------------------- | ----------------------------------------------------------- |
| `rejoice://readme`                             | Root monorepo README                                        |
| `rejoice://packages/rejoice/readme`            | Core package README                                         |
| `rejoice://packages/create-rejoice-app/readme` | CLI scaffolder README                                       |
| `rejoice://docs/{section_id}`                  | Specific docs section (e.g. `installation`, `theme-system`) |
| `rejoice://templates/{file_path}`              | Scaffolded app template file (e.g. `src/App.tsx`)           |

## Tools

| Tool                   | Description                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| `search_docs`          | Search all docs for a keyword, returns matching excerpts               |
| `list_exports`         | List rejoice-js exports, filterable by `category`, `source`, or `kind` |
| `get_code_examples`    | Get code examples for a topic/component                                |
| `get_full_docs`        | Return all doc sections as one markdown document                       |
| `get_project_overview` | Concise project summary with export counts                             |

## Claude Code integration

Add to `.claude/settings.json`:

```json
{
  "mcpServers": {
    "rejoice-docs": {
      "command": "uv",
      "args": ["run", "--directory", "/path/to/rejoice-js/mcp", "server.py"]
    }
  }
}
```
