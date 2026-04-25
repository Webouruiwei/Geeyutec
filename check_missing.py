import sys
sys.path.insert(0, '/usr/lib/python3/dist-packages')
from PIL import Image
import re
import os
from pathlib import Path

# 统计缺失图片
website_dir = Path('.')
missing_by_category = {'2-burner': 0, '4-burner': 0, '5-burner': 0, 'other': 0}
total_missing = 0
missing_list = []

for html_file in website_dir.glob('*.html'):
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    src_matches = re.findall(r'src=["\'](.*?)["\']', content)
    for src in src_matches:
        if src.startswith(('http', 'https', 'data:', '#', '/js/', 'css/', '/images/hero')):
            continue
        img_path = website_dir / src.lstrip('/')
        if not img_path.exists():
            total_missing += 1
            missing_list.append(str(src))
            if html_file.name == '2-burner.html':
                missing_by_category['2-burner'] += 1
            elif html_file.name == '4-burner.html':
                missing_by_category['4-burner'] += 1
            elif html_file.name == '5-burner.html':
                missing_by_category['5-burner'] += 1
            else:
                missing_by_category['other'] += 1

print(f'总缺失图片数量: {total_missing}')
print(f'按页面分类:')
for cat, cnt in missing_by_category.items():
    print(f'  {cat}: {cnt} 张')

# 保存缺失列表到文件
with open('missing_images.txt', 'w') as f:
    for src in missing_list:
        f.write(src + '\n')
