// GitHub Pages는 SPA 라우팅을 모르므로, 각 주소에 index.html 사본을 둔다.
// /stock/ 처럼 직접 들어와도 200으로 열리고, 그 외 주소는 404.html이 받는다.
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const routes = ['excel', 'stock', 'automation', 'career']

for (const route of routes) {
  mkdirSync(join(dist, route), { recursive: true })
  copyFileSync(join(dist, 'index.html'), join(dist, route, 'index.html'))
}
copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))
// Jekyll 처리를 끄지 않으면 _로 시작하는 파일이 빠질 수 있다.
writeFileSync(join(dist, '.nojekyll'), '')
console.log(`postbuild: ${routes.length}개 주소와 404.html 생성`)
