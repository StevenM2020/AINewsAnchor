import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import newsAPI from 'newsapi';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const port = process.env.PORT || 5000;
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const newsapi = new newsAPI(process.env.NEWS_API_KEY);

app.get('/api/hello/:id', async (req, res) => {
    const id = req.params.id;
    res.json({data: 'Hello from the server!'});
});

app.post('/api/chat', async (req, res) => {
    res.json({data: 'Hello from the server!'});
} );

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



app.post('/api/news2', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await openai.createCompletion({
            model: 'gpt-3.5-turbo',
            prompt: message,
            max_tokens: 150,
        });

        if (response && response.data.choices.length > 0) {
            res.json({ content: response.data.choices[0].text });
        } else {
            res.status(404).json({ content: 'No response from AI' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ content: 'Internal Server Error' });
    }
});



app.post('/api/news', async (req, res) => {



    var promptMessage;
    const { topic, anchor } = req.body;
    try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const dateStr = yesterday.toISOString().split('T')[0]; 
        
        const articlesResponse = await newsapi.v2.everything({
          q: topic,
          from: dateStr, 
          to: dateStr, 
          language: 'en',
          sortBy: 'relevancy',
          pageSize: 5, 
          page: 1 
        });

        const articles = articlesResponse.articles;
        //console.log(articles);

        // Prepare a message using the articles
        promptMessage = articles.map(article => `${article.title}: ${article.description}`).join('\n');

    }catch(err){
            console.error(err);
            res.status(500).send('Internal Server Error');
        }


    try{

        let response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: `you are a news anchor. You are given a list of news articles and you have to present them as a ${anchor} anchor with some humor. Format the news into sections and create line breaks.`
                },
                { role: 'user', content: promptMessage }
            ]
        });
    
        res.json(response.choices[0].message.content);
    }
    catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
    }
    });

    
    app.post('/api/generate-image', async (req, res) => {
        const { anchor } = req.body; 
      
        try {
            const imageResponse = await openai.images.generate({
                prompt: "A news anchor presenting the news as a " + anchor + " anchor",
                n: 1, 
                size: "256x256" // "1024x1024",
            });
      

            const image = imageResponse.data[0].url; 
            console.log("Image URL: ", image);
            res.json({ image: image }); 
        } catch (error) {
            console.error("Error generating image: ", error);
            res.status(500).json({ error: 'Error generating image' });
        }
    });
