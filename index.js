require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Message = require('./models/Message');

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

app.post('/webhook', async (req, res) => {
  try {
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];

    if (changes?.value?.messages) {
      const msg = changes.value.messages[0];

      await Message.create({
        from: msg.from,
        text: msg.text?.body || '',
        timestamp: msg.timestamp,
        messageId: msg.id
      });

      console.log('📩 Message saved:', msg);
    }

    res.sendStatus(200);
  } catch (err) {
    console.error('❌ Webhook Error:', err);
    res.sendStatus(500);
  }
});

app.get('/messages', async (req, res) => {
  const messages = await Message.find().sort({ timestamp: -1 });
  res.json(messages);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
