from pathlib import Path
import re
import unittest
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]


class PublicDocumentationReview(unittest.TestCase):
    def test_demo_catalog_matches_ordered_images(self):
        source = (ROOT / 'assets/demo.js').read_text(encoding='utf-8')
        entries = re.findall(r"\['(\d{2}-[^']+\.(?:png|jpg))', '([^']+)', '([^']+)'\]", source)
        images = sorted(p.name for p in (ROOT / 'assets/images').iterdir() if p.is_file())
        self.assertTrue(entries, 'demo catalog must not be empty')
        self.assertEqual([file for file, _, _ in entries], images)
        self.assertEqual([int(file[:2]) for file, _, _ in entries], list(range(1, len(images) + 1)))
        self.assertTrue(all(title.strip() and description.strip() for _, title, description in entries))

    def test_public_files_and_navigation(self):
        files = [p for p in ROOT.rglob('*') if p.is_file() and '.git' not in p.parts]
        self.assertEqual([p.relative_to(ROOT).as_posix() for p in files if p.suffix == '.html'], ['index.html'])
        self.assertFalse([p for p in files if p.suffix in {'.gs', '.json', '.env', '.zip'}])
        navigation = (ROOT / 'assets/site.js').read_text(encoding='utf-8')
        docs = {p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*.md') if '.git' not in p.parts}
        allowed = set(re.findall(r"\['([^']+\.md)','[^']+'\]", navigation))
        self.assertEqual(docs, allowed)

    def test_markdown_links_and_sensitive_patterns(self):
        patterns = [r'AIza[0-9A-Za-z_-]{35}', r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',
                    r'\b(?:ghp|gho|ghs|github_pat)_[A-Za-z0-9_]{20,}',
                    r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b',
                    r'https?://[^\s)]+', r'(?<!\d)(?:\+62|08)\d[\d -]{8,}\d(?!\d)']
        for doc in ROOT.rglob('*.md'):
            if '.git' in doc.parts:
                continue
            text = doc.read_text(encoding='utf-8')
            for pattern in patterns:
                self.assertIsNone(re.search(pattern, text, re.I), f'{doc.name}: sensitive pattern')
            for link in re.findall(r'\]\(([^)]+)\)', text):
                path = urlsplit(link.split()[0].strip('<>')).path
                if not path:
                    continue
                target = (doc.parent / unquote(path)).resolve()
                self.assertTrue(target.is_relative_to(ROOT) and target.exists(), f'{doc.name}: invalid link')


if __name__ == '__main__':
    unittest.main()
