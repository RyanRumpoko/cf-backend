const OpenAI = require("openai");
const { OPENAI_API_KEY, ASSISTANT_ID } = process.env;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
const assistantId = ASSISTANT_ID;

let pollingInterval;

async function checkingStatus(res, threadId, runId) {
  const runObject = await openai.beta.threads.runs.retrieve(threadId, runId);

  const status = runObject.status;

  if (status == "completed") {
    clearInterval(pollingInterval);

    const messagesList = await openai.beta.threads.messages.list(threadId);
    let messages = [];

    messagesList.body.data.forEach((message, index) => {
      if (index % 2 === 0) {
        messages.push(`AI : ${message.content[0].text.value}`);
      } else {
        messages.push(`You : ${message.content[0].text.value}`);
      }
    });

    res.status(200).json(messages);
  }
}

const createThread = async (req, res) => {
  try {
    const thread = await openai.beta.threads.create();
    return res.status(200).json({ threadId: thread.id });
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
};

const createMessages = async (req, res) => {
  try {
    const { message, threadId } = req.body;

    const messageRes = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });

    const runRes = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });
    const runId = runRes.id;

    pollingInterval = setInterval(() => {
      checkingStatus(res, threadId, runId);
    }, 5000);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
};

module.exports = {
  createThread,
  createMessages,
};
