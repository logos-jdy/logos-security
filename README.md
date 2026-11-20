# GitHub Security Lab

GitHub Security and quality 실습용입니다. 의도적인 취약점이 포함되어 있습니다.
실제 서비스에서 실행하거나 배포하지 마세요. npm install, DB 연결, 서버 실행은 필요하지 않습니다.

## 실습 순서

1. 개인 계정에 별도의 Public 저장소(예: github-security-test)를 생성한다. 회사 소스나 실제 토큰은 넣지 않는다.
2. Settings → Advanced Security에서 Dependency graph, Dependabot alerts, Dependabot security updates, Secret scanning을 확인하고 필요한 기능을 활성화한다. 메뉴 위치와 사용 가능 여부는 계정 설정에 따라 달라질 수 있다.
3. 압축을 푼 파일과 폴더를 기본 브랜치(main)에 업로드하고 Commit한다.
4. 테스트용 더미 토큰에 대해 Push protection이 표시되면 실제 비밀 정보가 아님을 확인한 뒤, 허용되는 경우 It's used in tests를 선택한다. 이 경우 Closed 경고를 확인한다. 차단을 해제할 권한이 없다면 토큰 파일은 제외한다. 실제 토큰은 절대 예외 처리하지 않는다.
5. Settings → Advanced Security → CodeQL analysis → Set up → Default → Enable CodeQL. Actions에서 분석 완료를 확인한다.
6. Security and quality에서 Secret scanning, Dependabot, Code scanning 내용을 확인하고 캡처한다. Dependabot 보안 업데이트 PR은 Pull requests 탭에서 확인한다.

## 기대 결과 (실제 원격 검사 미실행)

| 기능 | 대상 | 기대 결과 |
| --- | --- | --- |
| Secret scanning | config/application.conf | GitHub 공식 더미 토큰 감지 또는 Push protection 차단 |
| Dependabot | package.json | lodash 4.17.10의 알려진 취약점 (예: CVE-2018-16487) 경고, 보안 업데이트 PR은 설정 및 지원 여부에 따라 생성 |
| Code scanning | src/app.js | Reflected XSS, SQL injection |
| Code scanning | public/script.js | Client-side XSS |

CodeQL 및 Dependabot의 실제 표시 경고, 수량, PR 생성 여부는 분석 환경에 따라 달라질 수 있다. Copilot Autofix는 지원되는 경고에서 Generate fix를 확인한다. 실습 이후 저장소는 삭제하거나 취약점을 수정한다.

참고:
- https://docs.github.com/en/get-started/learning-to-code/storing-your-secrets-safely
- https://github.com/advisories/GHSA-4xc9-xhrj-v574
- https://codeql.github.com/codeql-query-help/javascript/js-reflected-xss/
- https://codeql.github.com/codeql-query-help/javascript/js-sql-injection/
