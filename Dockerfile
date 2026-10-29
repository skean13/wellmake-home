# 정적 사이트를 nginx로 서빙하는 이미지
# 빌드 순서: npm run build 로 dist/ 를 먼저 만든 뒤 docker build 합니다.
FROM nginx:1.27-alpine

RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html/

EXPOSE 80
