"""MCP server exposing rejoice-js documentation, exports, and code examples."""

from __future__ import annotations

import os
import re
from pathlib import Path
from typing import Any

from bs4 import BeautifulSoup, Tag
from fastmcp import FastMCP

# ── Paths ─────────────────────────────────────────────────────────────────────

ROOT = Path(__file__).resolve().parent.parent
DOCS_HTML = ROOT / "website" / "docs.html"
TEMPLATES_DIR = ROOT / "packages" / "create-rejoice-app" / "templates" / "ts"
INDEX_TS = ROOT / "packages" / "rejoice" / "src" / "index.ts"

MARKDOWN_FILES: dict[str, Path] = {
    "readme": ROOT / "README.md",
    "packages/rejoice/readme": ROOT / "packages" / "rejoice" / "README.md",
    "packages/create-rejoice-app/readme": ROOT / "packages" / "create-rejoice-app" / "README.md",
}

# ── Data types ────────────────────────────────────────────────────────────────

type DocSection = dict[str, str]
type ExportEntry = dict[str, str]

# ── HTML parser ───────────────────────────────────────────────────────────────


def _strip_highlight_spans(el: Tag) -> str:
    """Get text from an element, stripping syntax-highlighting spans."""
    for span in el.find_all("span", class_=re.compile(r"^code-")):
        span.unwrap()
    return el.get_text()


def _element_to_markdown(el: Tag) -> str:
    """Convert an HTML element's content to readable markdown-ish text."""
    parts: list[str] = []
    for child in el.children:
        if isinstance(child, str):
            text = child.strip()
            if text:
                parts.append(text)
            continue
        if not isinstance(child, Tag):
            continue
        tag = child.name
        if tag in ("h1", "h2", "h3", "h4"):
            level = int(tag[1])
            parts.append(f"{'#' * level} {child.get_text(strip=True)}")
        elif tag == "p":
            parts.append(child.get_text(strip=True))
        elif tag == "div" and "code-block" in (child.get("class") or []):
            header = child.find(class_="code-block-header")
            lang_label = ""
            if header:
                lang_span = header.find(class_="code-block-lang")
                if lang_span:
                    lang_label = lang_span.get_text(strip=True)
            pre = child.find("pre")
            if pre:
                code = _strip_highlight_spans(pre)
                parts.append(f"```{lang_label}\n{code}\n```")
        elif tag == "div" and "callout" in " ".join(child.get("class") or []):
            p = child.find("p")
            if p:
                parts.append(f"> {p.get_text(strip=True)}")
        elif tag == "div" and "props-table-wrap" in (child.get("class") or []):
            table = child.find("table")
            if table:
                parts.append(_table_to_markdown(table))
        elif tag == "table":
            parts.append(_table_to_markdown(child))
        elif tag == "ul":
            for li in child.find_all("li", recursive=False):
                parts.append(f"- {li.get_text(strip=True)}")
        elif tag == "ol":
            for i, li in enumerate(child.find_all("li", recursive=False), 1):
                parts.append(f"{i}. {li.get_text(strip=True)}")
        elif tag == "div" and "section-label" in (child.get("class") or []):
            continue  # skip group labels, we track them separately
        elif tag == "div" and "divider" in (child.get("class") or []):
            continue
        else:
            text = child.get_text(strip=True)
            if text:
                parts.append(text)
    return "\n\n".join(parts)


def _table_to_markdown(table: Tag) -> str:
    """Convert an HTML table to markdown."""
    rows: list[list[str]] = []
    for tr in table.find_all("tr"):
        cells = [td.get_text(strip=True) for td in tr.find_all(["th", "td"])]
        rows.append(cells)
    if not rows:
        return ""
    lines: list[str] = []
    lines.append("| " + " | ".join(rows[0]) + " |")
    lines.append("| " + " | ".join("---" for _ in rows[0]) + " |")
    for row in rows[1:]:
        lines.append("| " + " | ".join(row) + " |")
    return "\n".join(lines)


def parse_docs_html(html_path: Path) -> list[DocSection]:
    """Parse docs.html into a list of section dicts."""
    if not html_path.exists():
        return []
    soup = BeautifulSoup(html_path.read_text(encoding="utf-8"), "lxml")
    sections: list[DocSection] = []
    current_group = "General"

    for section in soup.find_all("section", id=True):
        section_id = section["id"]
        label_el = section.find(class_="section-label")
        if label_el:
            current_group = label_el.get_text(strip=True)

        heading = section.find(["h1", "h2", "h3"])
        title = heading.get_text(strip=True) if heading else section_id

        content = _element_to_markdown(section)

        sections.append({
            "id": section_id,
            "group": current_group,
            "title": title,
            "content": content,
        })

    return sections


# ── Export parser ─────────────────────────────────────────────────────────────


def parse_exports(index_path: Path) -> list[ExportEntry]:
    """Parse index.ts to extract all exports with categories and kinds."""
    if not index_path.exists():
        return []
    text = index_path.read_text(encoding="utf-8")
    entries: list[ExportEntry] = []

    # Match block exports: export { ... } from "...";
    block_pattern = re.compile(
        r'export\s*\{([^}]+)\}\s*from\s*"([^"]+)"\s*;', re.DOTALL
    )
    # Match single exports: export { Name } from "...";
    # Already covered by block pattern

    for m in block_pattern.finditer(text):
        block_content = m.group(1)
        source = m.group(2)
        category = _source_to_category(source)
        current_subcategory = category

        for line in block_content.split("\n"):
            line = line.strip()
            # Check for inline category comments like "// Data Entry"
            comment_match = re.match(r"//\s*(.+)", line)
            if comment_match:
                current_subcategory = comment_match.group(1).strip()
                continue

            # Extract export names (handle "name as alias" syntax)
            for item in line.split(","):
                item = item.strip()
                if not item:
                    continue
                # Remove trailing comments
                item = re.sub(r"//.*$", "", item).strip()
                if not item:
                    continue

                alias_match = re.match(r"(\w+)\s+as\s+(\w+)", item)
                if alias_match:
                    original = alias_match.group(1)
                    alias = alias_match.group(2)
                    name = alias
                else:
                    name = item
                    original = item

                if not re.match(r"^\w+$", name):
                    continue

                kind = _classify_export(name, original, source)
                entries.append({
                    "name": name,
                    "original": original,
                    "source": source,
                    "category": current_subcategory,
                    "kind": kind,
                })

    # Match type exports: export type { ... } from "...";
    type_pattern = re.compile(
        r'export\s+type\s*\{([^}]+)\}\s*from\s*"([^"]+)"\s*;', re.DOTALL
    )
    for m in type_pattern.finditer(text):
        block_content = m.group(1)
        source = m.group(2)
        for item in block_content.split(","):
            item = item.strip()
            if not item or item.startswith("//"):
                continue
            name = re.sub(r"\s+as\s+\w+", "", item).strip()
            if not re.match(r"^\w+$", name):
                continue
            entries.append({
                "name": name,
                "original": name,
                "source": source,
                "category": "Types",
                "kind": "type",
            })

    return entries


def _source_to_category(source: str) -> str:
    """Map import source to a high-level category."""
    if source == "react":
        return "React"
    if source.startswith("react-dom"):
        return "React DOM"
    if source == "antd":
        return "Ant Design"
    if source.startswith("styled-components"):
        return "styled-components"
    if source.startswith("zustand"):
        return "Zustand"
    if source.startswith("./") or source.startswith("../"):
        return "Rejoice Core"
    return source


def _classify_export(name: str, original: str, source: str) -> str:
    """Classify an export as hook, component, utility, type, or middleware."""
    if name.startswith("use") and name[3:4].isupper():
        return "hook"
    if source.startswith("zustand/middleware"):
        return "middleware"
    if name[0:1].isupper() and source in ("react", "antd"):
        return "component"
    if name[0:1].isupper() and "Provider" in name:
        return "component"
    if name[0:1].isupper():
        return "component"
    return "utility"


# ── Load all content at module level ──────────────────────────────────────────

docs_sections: list[DocSection] = parse_docs_html(DOCS_HTML)
export_entries: list[ExportEntry] = parse_exports(INDEX_TS)

markdown_content: dict[str, str] = {}
for key, path in MARKDOWN_FILES.items():
    if path.exists():
        markdown_content[key] = path.read_text(encoding="utf-8")

template_files: dict[str, str] = {}
if TEMPLATES_DIR.exists():
    for file_path in TEMPLATES_DIR.rglob("*"):
        if file_path.is_file() and file_path.suffix not in (".png", ".svg", ".ico", ".jpg", ".jpeg", ".gif"):
            rel = file_path.relative_to(TEMPLATES_DIR)
            try:
                template_files[str(rel)] = file_path.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                pass

# ── MCP Server ────────────────────────────────────────────────────────────────

mcp = FastMCP("rejoice-docs")

# ── Static Resources ──────────────────────────────────────────────────────────


@mcp.resource("rejoice://readme")
def get_readme() -> str:
    """Root README for the rejoice-js monorepo."""
    return markdown_content.get("readme", "README.md not found.")


@mcp.resource("rejoice://packages/rejoice/readme")
def get_rejoice_readme() -> str:
    """README for the rejoice-js core package."""
    return markdown_content.get("packages/rejoice/readme", "Package README not found.")


@mcp.resource("rejoice://packages/create-rejoice-app/readme")
def get_cra_readme() -> str:
    """README for the create-rejoice-app CLI scaffolder."""
    return markdown_content.get("packages/create-rejoice-app/readme", "Package README not found.")


# ── Resource Templates ────────────────────────────────────────────────────────


@mcp.resource("rejoice://docs/{section_id}")
def get_doc_section(section_id: str) -> str:
    """Get a specific documentation section by ID (e.g. 'installation', 'theme-system')."""
    for section in docs_sections:
        if section["id"] == section_id:
            return f"# {section['title']}\n\n_Group: {section['group']}_\n\n{section['content']}"
    available = ", ".join(s["id"] for s in docs_sections)
    return f"Section '{section_id}' not found. Available sections: {available}"


@mcp.resource("rejoice://templates/{file_path}")
def get_template_file(file_path: str) -> str:
    """Get a file from the scaffolded app template (e.g. 'src/App.tsx')."""
    if file_path in template_files:
        return template_files[file_path]
    available = ", ".join(sorted(template_files.keys()))
    return f"Template file '{file_path}' not found. Available files: {available}"


# ── Tools ─────────────────────────────────────────────────────────────────────


@mcp.tool()
def search_docs(query: str, limit: int = 5) -> str:
    """Search all documentation for a keyword or topic. Returns matching excerpts."""
    query_lower = query.lower()
    scored: list[tuple[int, str, str]] = []

    # Search docs sections
    for section in docs_sections:
        content = section["content"].lower()
        title = section["title"].lower()
        score = 0
        if query_lower in title:
            score += 10
        score += content.count(query_lower)
        if score > 0:
            excerpt = _extract_excerpt(section["content"], query, max_chars=500)
            scored.append((score, f"[docs/{section['id']}] {section['title']}", excerpt))

    # Search markdown files
    for key, content in markdown_content.items():
        content_lower = content.lower()
        score = content_lower.count(query_lower)
        if score > 0:
            excerpt = _extract_excerpt(content, query, max_chars=500)
            scored.append((score, f"[{key}]", excerpt))

    # Search template files
    for path, content in template_files.items():
        content_lower = content.lower()
        score = content_lower.count(query_lower)
        if score > 0:
            excerpt = _extract_excerpt(content, query, max_chars=300)
            scored.append((score, f"[template/{path}]", excerpt))

    scored.sort(key=lambda x: x[0], reverse=True)
    results = scored[:limit]

    if not results:
        return f"No results found for '{query}'."

    parts: list[str] = [f"Found {len(scored)} matches for '{query}' (showing top {len(results)}):\n"]
    for score, source, excerpt in results:
        parts.append(f"### {source}\n{excerpt}\n")
    return "\n".join(parts)


def _extract_excerpt(text: str, query: str, max_chars: int = 500) -> str:
    """Extract a relevant excerpt around the first occurrence of query."""
    idx = text.lower().find(query.lower())
    if idx == -1:
        return text[:max_chars] + ("..." if len(text) > max_chars else "")
    start = max(0, idx - max_chars // 4)
    end = min(len(text), idx + max_chars * 3 // 4)
    excerpt = text[start:end]
    if start > 0:
        excerpt = "..." + excerpt
    if end < len(text):
        excerpt = excerpt + "..."
    return excerpt


@mcp.tool()
def list_exports(category: str | None = None, source: str | None = None, kind: str | None = None) -> str:
    """List all rejoice-js exports, optionally filtered by category, source module, or kind (hook/component/utility/type/middleware)."""
    filtered = export_entries
    if category:
        cat_lower = category.lower()
        filtered = [e for e in filtered if cat_lower in e["category"].lower()]
    if source:
        src_lower = source.lower()
        filtered = [e for e in filtered if src_lower in e["source"].lower()]
    if kind:
        kind_lower = kind.lower()
        filtered = [e for e in filtered if e["kind"] == kind_lower]

    if not filtered:
        return f"No exports found matching filters (category={category}, source={source}, kind={kind})."

    # Group by category
    grouped: dict[str, list[ExportEntry]] = {}
    for entry in filtered:
        grouped.setdefault(entry["category"], []).append(entry)

    parts: list[str] = [f"**{len(filtered)} exports found:**\n"]
    for cat, entries in grouped.items():
        parts.append(f"### {cat}")
        for e in entries:
            alias_note = f" (aliased from `{e['original']}`)" if e["name"] != e["original"] else ""
            parts.append(f"- `{e['name']}` — {e['kind']} from `{e['source']}`{alias_note}")
        parts.append("")
    return "\n".join(parts)


@mcp.tool()
def get_code_examples(topic: str) -> str:
    """Get code examples for a specific topic or component from docs and templates."""
    topic_lower = topic.lower()
    examples: list[str] = []

    # Search docs sections for code blocks mentioning the topic
    for section in docs_sections:
        content = section["content"]
        if topic_lower not in content.lower():
            continue
        # Extract fenced code blocks
        code_blocks = re.findall(r"```[\w]*\n(.*?)```", content, re.DOTALL)
        for block in code_blocks:
            if topic_lower in block.lower():
                examples.append(f"**From docs: {section['title']}**\n```tsx\n{block.strip()}\n```")

    # Search template files
    for path, content in template_files.items():
        if topic_lower in content.lower():
            examples.append(f"**From template: {path}**\n```tsx\n{content.strip()}\n```")

    # Search markdown READMEs for code blocks
    for key, md_content in markdown_content.items():
        if topic_lower not in md_content.lower():
            continue
        code_blocks = re.findall(r"```[\w]*\n(.*?)```", md_content, re.DOTALL)
        for block in code_blocks:
            if topic_lower in block.lower():
                examples.append(f"**From {key}**\n```tsx\n{block.strip()}\n```")

    if not examples:
        return f"No code examples found for '{topic}'. Try searching with a related keyword like a component name (Button, Card) or concept (theme, store)."

    header = f"Found {len(examples)} code example(s) for '{topic}':\n\n"
    return header + "\n\n---\n\n".join(examples)


@mcp.tool()
def get_full_docs() -> str:
    """Return all parsed documentation sections as one markdown document."""
    if not docs_sections:
        return "No documentation sections found. Ensure website/docs.html exists."

    parts: list[str] = ["# rejoice-js Documentation\n"]
    current_group = ""
    for section in docs_sections:
        if section["group"] != current_group:
            current_group = section["group"]
            parts.append(f"\n---\n\n## {current_group}\n")
        parts.append(f"\n### {section['title']}\n\n{section['content']}\n")
    return "\n".join(parts)


@mcp.tool()
def get_project_overview() -> str:
    """Get a concise project summary: what rejoice-js is, export counts, and how to get started."""
    total = len(export_entries)
    by_kind: dict[str, int] = {}
    for e in export_entries:
        by_kind[e["kind"]] = by_kind.get(e["kind"], 0) + 1

    by_source: dict[str, int] = {}
    for e in export_entries:
        cat = _source_to_category(e["source"])
        by_source[cat] = by_source.get(cat, 0) + 1

    kind_summary = ", ".join(f"{count} {kind}s" for kind, count in sorted(by_kind.items()))
    source_summary = ", ".join(f"{cat}: {count}" for cat, count in sorted(by_source.items()))

    doc_count = len(docs_sections)
    template_count = len(template_files)

    return f"""# rejoice-js — Project Overview

**What it is:** A batteries-included React meta-framework that re-exports React, Ant Design 5, styled-components, Zustand, and a built-in light/dark theme provider from a single `rejoice-js` import.

**Packages:**
- `rejoice-js` — Core library with {total} exports ({kind_summary})
- `create-rejoice-app` — CLI scaffolder for new projects

**Exports by source:** {source_summary}

**Documentation:** {doc_count} sections covering installation, theming, React hooks, Ant Design components, styled-components, Zustand, and type exports.

**Templates:** {template_count} files in the scaffolded app template.

**Quick start:**
```bash
bunx create-rejoice-app my-app
cd my-app
bun install && bun dev
```

**Single import surface:**
```tsx
import {{ Button, useTheme, styled, create, useState }} from "rejoice-js";
```

**MCP resources available:**
- `rejoice://readme` — Root README
- `rejoice://packages/rejoice/readme` — Core package README
- `rejoice://packages/create-rejoice-app/readme` — CLI README
- `rejoice://docs/{{section_id}}` — Specific doc section
- `rejoice://templates/{{file_path}}` — Template file content
"""


# ── Entry point ───────────────────────────────────────────────────────────────


def main():
    port = int(os.environ.get("PORT", "8080"))
    mcp.run(transport="http", host="0.0.0.0", port=port)


if __name__ == "__main__":
    main()
