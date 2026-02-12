const axios = require('axios');

const TIMEOUT = 5000;

const getNameIntelligence = async (name) => {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) return { status: 'skipped' };

    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${encodeURIComponent(name)}&apiKey=${apiKey}`, {
            timeout: TIMEOUT
        });

        return {
            status: 'success',
            articles: response.data.articles.slice(0, 10).map(article => ({
                title: article.title,
                source: article.source.name,
                url: article.url,
                publishedAt: article.publishedAt
            }))
        };
    } catch (error) {
        return { status: 'error', error: error.message };
    }
};

module.exports = { getNameIntelligence };
