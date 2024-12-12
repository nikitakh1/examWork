FROM mcr.microsoft.com/playwright:v1.46.0-noble
COPY . .
RUN npm i 
RUN npx playwright install --with-deps
CMD ["npm", "run", "test"]